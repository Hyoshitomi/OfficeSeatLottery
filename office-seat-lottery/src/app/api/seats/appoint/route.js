import { NextResponse } from 'next/server'

import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// APIファイルの先頭に追加
function toStartOfUTCDay(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

// より効率的な一括チェック関数
async function checkDuplicateReservationsBatch(createData) {
  // 全ての座席IDと日付範囲を取得
  const seatIds = [...new Set(createData.map(data => data.seatId))];
  const minDate = new Date(Math.min(...createData.map(data => data.startDate)));
  const maxDate = new Date(Math.max(...createData.map(data => data.endDate)));

  // 該当期間の既存予約を一括取得
  const existingReservations = await prisma.m_SEAT_APPOINT.findMany({
    where: {
      seatId: { in: seatIds },
      OR: [
        {
          startDate: { lte: maxDate },
          endDate: { gte: minDate }
        }
      ]
    },
    select: {
      seatId: true,
      startDate: true,
      endDate: true
    }
  });

  // 新規予約データと既存予約の重複チェック
  for (const newData of createData) {
    const conflict = existingReservations.find(existing => 
      existing.seatId === newData.seatId &&
      (
        // 新規予約の開始日が既存予約の期間内
        (newData.startDate >= existing.startDate && newData.startDate <= existing.endDate) ||
        // 新規予約の終了日が既存予約の期間内
        (newData.endDate >= existing.startDate && newData.endDate <= existing.endDate) ||
        // 新規予約が既存予約を包含
        (newData.startDate <= existing.startDate && newData.endDate >= existing.endDate)
      )
    );

    if (conflict) {
      return {
        isDuplicate: true,
        seatId: newData.seatId,
        date: newData.startDate
      };
    }
  }

  return { isDuplicate: false };
}

// バリデーション関数群
function validateEmployees(selectedEmployees) {
  if (!selectedEmployees || selectedEmployees.length === 0) {
    return { isValid: false, error: '社員が選択されていません' };
  }
  return { isValid: true };
}

function validateSeats(selectedSeatIds) {
  if (!selectedSeatIds || selectedSeatIds.length === 0) {
    return { isValid: false, error: '座席が選択されていません' };
  }
  return { isValid: true };
}

function validateEmployeeCount(selectedEmployees, selectedSeatIds) {
  const isValidEmployeeCount = selectedEmployees.length === 1 || 
                               selectedEmployees.length === selectedSeatIds.length;
  
  if (!isValidEmployeeCount) {
    return { 
      isValid: false, 
      error: '社員数は1人または座席数と一致している必要があります' 
    };
  }
  return { isValid: true };
}

// ユーザー取得とマッピング関数
async function getUserMapping(selectedEmployees) {
  const users = await prisma.m_USER.findMany({
    where: {
      employeeNumber: { in: selectedEmployees },
      deleteFlag: false
    },
    select: {
      userId: true,
      employeeNumber: true
    }
  });

  const foundEmployeeNumbers = users.map(user => user.employeeNumber);
  const notFoundEmployees = selectedEmployees.filter(emp => !foundEmployeeNumbers.includes(emp));
  
  if (notFoundEmployees.length > 0) {
    return { 
      isValid: false, 
      error: `以下の社員番号が見つかりません: ${notFoundEmployees.join(', ')}` 
    };
  }

  const employeeToUserIdMap = {};
  users.forEach(user => {
    employeeToUserIdMap[user.employeeNumber] = user.userId;
  });

  return { isValid: true, mapping: employeeToUserIdMap };
}

// ID生成関数
async function getNextId() {
  const maxId = await prisma.m_SEAT_APPOINT.findFirst({
    orderBy: { id: 'desc' },
    select: { id: true }
  });
  return (maxId?.id || 0) + 1;
}

// 予約データ作成関数（単一社員用）
function createSingleEmployeeReservations(employeeNumber, userMapping, selectedSeatIds, reservationConfig) {
  const { startId } = reservationConfig;
  const createData = [];
  const userId = userMapping[employeeNumber];
  let currentId = startId;

  for (const seatId of selectedSeatIds) {
    const reservations = createReservationsForSeat(seatId, userId, reservationConfig, currentId);
    createData.push(...reservations.data);
    currentId = reservations.nextId;
  }

  return createData;
}

// 予約データ作成関数（複数社員用）
function createMultipleEmployeeReservations(selectedEmployees, userMapping, selectedSeatIds, reservationConfig) {
  const createData = [];
  let currentId = reservationConfig.startId;

  for (let i = 0; i < selectedEmployees.length; i++) {
    const employeeNumber = selectedEmployees[i];
    const userId = userMapping[employeeNumber];
    const seatId = selectedSeatIds[i];
    
    const reservations = createReservationsForSeat(seatId, userId, reservationConfig, currentId);
    createData.push(...reservations.data);
    currentId = reservations.nextId;
  }

  return createData;
}

// 座席ごとの予約データ作成
function createReservationsForSeat(seatId, userId, reservationConfig, currentId) {
  const { selectedDays, dateRange, targetDates, startId: appointId, now } = reservationConfig;
  const data = [];

  if (selectedDays && selectedDays.length > 0) {
    // 曜日予約の場合
    for (const targetDate of targetDates) {
      const formattedDate = toStartOfUTCDay(targetDate);
      data.push({
        id: currentId++,
        appointId,
        seatId,
        userId,
        startDate: formattedDate,
        endDate: formattedDate,
        created: now,
        updated: null
      });
    }
  } else if (dateRange) {
    // 日付予約の場合
    const formattedStartDate = toStartOfUTCDay(new Date(dateRange.from));
    const formattedEndDate = toStartOfUTCDay(new Date(dateRange.to || dateRange.from));
    data.push({
      id: currentId++,
      appointId,
      seatId,
      userId,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      created: now,
      updated: null
    });
  }

  return { data, nextId: currentId };
}

export async function POST(request) {
  const now = new Date();
  
  try {
    const body = await request.json();
    const { selectedEmployees, selectedDays, dateRange, selectedSeatIds } = body;

    // バリデーション
    const employeeValidation = validateEmployees(selectedEmployees);
    if (!employeeValidation.isValid) {
      return NextResponse.json({ error: employeeValidation.error }, { status: 400 });
    }

    const seatValidation = validateSeats(selectedSeatIds);
    if (!seatValidation.isValid) {
      return NextResponse.json({ error: seatValidation.error }, { status: 400 });
    }

    // ユーザーマッピング取得
    const userMappingResult = await getUserMapping(selectedEmployees);
    if (!userMappingResult.isValid) {
      return NextResponse.json({ error: userMappingResult.error }, { status: 400 });
    }

    // 社員数と座席数のチェック
    const countValidation = validateEmployeeCount(selectedEmployees, selectedSeatIds);
    if (!countValidation.isValid) {
      return NextResponse.json({ error: countValidation.error }, { status: 400 });
    }

    // ID生成
    const startId = await getNextId();

    // 予約設定オブジェクトの作成
    const reservationConfig = {
      selectedDays,
      dateRange,
      targetDates,
      startId,
      now
    };

    // 登録データの準備
    let createData = [];
    
    if (selectedEmployees.length === 1) {
      createData = createSingleEmployeeReservations(
        selectedEmployees[0], 
        userMappingResult.mapping, 
        selectedSeatIds, 
        reservationConfig
      );
    } else {
      createData = createMultipleEmployeeReservations(
        selectedEmployees, 
        userMappingResult.mapping, 
        selectedSeatIds, 
        reservationConfig
      );
    }

    // 重複チェックを実行
    const duplicateCheck = await checkDuplicateReservationsBatch(createData);
    
    if (duplicateCheck.isDuplicate) {
      return NextResponse.json({ 
        error: `座席ID: ${duplicateCheck.seatId} の ${duplicateCheck.date.toLocaleDateString('ja-JP')} は既に予約済みです` 
      }, { status: 400 });
    }

    // DB登録
    const result = await prisma.m_SEAT_APPOINT.createMany({ 
      data: createData,
      skipDuplicates: true
    });

    return NextResponse.json({ 
      success: true, 
      result,
      appointId: startId,
      recordCount: createData.length
    }, { status: 200 });

  } catch (_error) {
    return NextResponse.json({ 
      error: 'サーバーエラーが発生しました' 
    }, { status: 500 });
  }
}
