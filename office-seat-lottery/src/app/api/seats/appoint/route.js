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

export async function POST(request) {
  const now = new Date();
  
  try {
    const body = await request.json();
    const { selectedEmployees, selectedDays, dateRange, selectedSeatIds } = body;

    // バリデーション
    if (!selectedEmployees || selectedEmployees.length === 0) {
      return NextResponse.json({ error: '社員が選択されていません' }, { status: 400 });
    }

    if (!selectedSeatIds || selectedSeatIds.length === 0) {
      return NextResponse.json({ error: '座席が選択されていません' }, { status: 400 });
    }

    // **★ employeeNumberからuserIdを取得する処理を追加 ★**
    const users = await prisma.m_USER.findMany({
      where: {
        employeeNumber: { in: selectedEmployees },
        deleteFlag: false // 削除されていないユーザーのみ
      },
      select: {
        userId: true,
        employeeNumber: true
      }
    });

    // 見つからない社員番号がないかチェック
    const foundEmployeeNumbers = users.map(user => user.employeeNumber);
    const notFoundEmployees = selectedEmployees.filter(emp => !foundEmployeeNumbers.includes(emp));
    
    if (notFoundEmployees.length > 0) {
      return NextResponse.json({ 
        error: `以下の社員番号が見つかりません: ${notFoundEmployees.join(', ')}` 
      }, { status: 400 });
    }

    // employeeNumberとuserIdのマッピングを作成
    const employeeToUserIdMap = {};
    users.forEach(user => {
      employeeToUserIdMap[user.employeeNumber] = user.userId;
    });

    // 社員数と座席数のチェック
    const isValidEmployeeCount = selectedEmployees.length === 1 || 
                                selectedEmployees.length === selectedSeatIds.length;
    
    if (!isValidEmployeeCount) {
      return NextResponse.json({ 
        error: '社員数は1人または座席数と一致している必要があります' 
      }, { status: 400 });
    }

    // 登録データの準備
    const createData = [];
    
    // 最初のIDを取得（appointIdとして使用）
    const maxId = await prisma.m_SEAT_APPOINT.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true }
    });
    
    const startId = (maxId?.id || 0) + 1;
    let currentId = startId;

    if (selectedEmployees.length === 1) {
      // 1人の社員が複数座席を予約
      const [employeeNumber] = selectedEmployees;
      const userId = employeeToUserIdMap[employeeNumber]; // **★ userIdに変換 ★**
      
      for (const seatId of selectedSeatIds) {
        if (selectedDays && selectedDays.length > 0) {
          // 曜日予約の場合
          for (const targetDate of targetDates) {
            const formattedDate = toStartOfUTCDay(targetDate);
            createData.push({
              id: currentId++,
              appointId: startId,
              seatId,
              userId, // **★ 変換されたuserIdを使用 ★**
              startDate: formattedDate,
              endDate: formattedDate,
              created: now,
              updated: null
            });
          }
        } else if (dateRange) {
          const formattedStartDate = toStartOfUTCDay(new Date(dateRange.from));
          const formattedEndDate = toStartOfUTCDay(new Date(dateRange.to || dateRange.from));
          // 日付予約の場合
          createData.push({
            id: currentId++,
            appointId: startId,
            seatId,
            userId, // **★ 変換されたuserIdを使用 ★**
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            created: now,
            updated: null
          });
        }
      }
     } else {
      // 複数社員がそれぞれ座席を予約
      for (let i = 0; i < selectedEmployees.length; i++) {
        const employeeNumber = selectedEmployees[i];
        const userId = employeeToUserIdMap[employeeNumber]; // **★ userIdに変換 ★**
        const seatId = selectedSeatIds[i];
        
        if (selectedDays && selectedDays.length > 0) {
          // 曜日予約の場合
          for (const targetDate of targetDates) {
            const formattedDate = toStartOfUTCDay(targetDate);
            createData.push({
              id: currentId++,
              appointId: startId,
              seatId,
              userId, // **★ 変換されたuserIdを使用 ★**
              startDate: formattedDate,
              endDate: formattedDate,
              created: now,
              updated: null
            });
          }
        } else if (dateRange) {
          const formattedStartDate = toStartOfUTCDay(new Date(dateRange.from));
          const formattedEndDate = toStartOfUTCDay(new Date(dateRange.to || dateRange.from));
          // 日付予約の場合
          createData.push({
            id: currentId++,
            appointId: startId,
            seatId,
            userId, // **★ 変換されたuserIdを使用 ★**
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            created: now,
            updated: null
          });
        }
      }
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
