import { NextResponse } from 'next/server'
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

function toStartOfUTCDay(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function getTomorrow(date) {
  const tomorrow = new Date(date);
  tomorrow.setUTCDate(date.getUTCDate() + 1);
  return tomorrow;
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function POST(request) {
  const now = new Date();
  const today = toStartOfUTCDay(now);

  try {
    // --- 1. リクエストパース ---
    const body = await request.json();
    const { employeeNumbers } = body;

    // --- 2. バリデーション ---
    if (!Array.isArray(employeeNumbers) || employeeNumbers.length === 0) {
      return errorResponse('社員番号リストが必要です', 400);
    }

    // --- 3. DBから必要な情報を一括取得 ---
    const [users, seats, todayRecords, appointmentRecords] = await Promise.all([
      prisma.m_USER.findMany({
        where: { employeeNumber: { in: employeeNumbers.map(String) } },
        select: { userId: true }
      }),
      prisma.m_SEAT.findMany({
        where: { status: 1 },
        select: { seatId: true }
      }),
      prisma.t_SEAT_POSITION.findMany({
        where: {
          date: today,
        },
        select: { userId: true, seatId: true }
      }),
      // M_SEAT_APPOINTで今日の日付が範囲内にある座席を取得
      prisma.m_SEAT_APPOINT.findMany({
        where: {
          startDate: { lte: today },
          endDate: { gte: today }
        },
        select: { seatId: true }
      })
    ]);

    // --- 4. ユーザーチェック ---
    const userIds = users.map(u => u.userId);
    if (userIds.length === 0) {
      return errorResponse('該当するユーザーが存在しません', 400);
    }

    // --- 5. 利用可能座席チェック ---
    const allSeatIds = seats.map(s => s.seatId);
    if (allSeatIds.length === 0) {
      return errorResponse('利用可能な座席がありません', 400);
    }

    // --- 6. 除外座席のセット化 ---
    const registeredUserIds = new Set(todayRecords.map(r => r.userId));
    const usedSeatIds = new Set(todayRecords.map(r => r.seatId)); // T_SEAT_POSITIONで使用済み
    const appointedSeatIds = new Set(appointmentRecords.map(r => r.seatId)); // M_SEAT_APPOINTで予約済み

    // --- 7. 未登録ユーザーの抽出 ---
    const targetUserIds = userIds.filter(id => !registeredUserIds.has(id));
    if (targetUserIds.length === 0) {
      return errorResponse('全てのユーザーが既に登録済みです', 400);
    }

    // --- 8. 空き座席抽出（T_SEAT_POSITIONとM_SEAT_APPOINTの両方をチェック） ---
    const availableSeatIds = allSeatIds.filter(id => 
      !usedSeatIds.has(id) && !appointedSeatIds.has(id)
    );
    
    if (availableSeatIds.length < targetUserIds.length) {
      return errorResponse('空き座席が足りません。本日は集中コーナーを使用してください。', 400);
    }

    // --- 9. シャッフル・割り当て ---
    const shuffledSeatIds = shuffleArray(availableSeatIds).slice(0, targetUserIds.length);
    const createData = targetUserIds.map((userId, idx) => ({
      date: today,
      seatId: shuffledSeatIds[idx],
      userId,
      created: now,
      updated: null
    }));

    // --- 10. DB登録 ---
    const dbResult = await prisma.t_SEAT_POSITION.createMany({ data: createData });

    // --- 11. レスポンス生成 ---
    const response = NextResponse.json({ result: createData, dbResult }, { status: 200 });
    return response;

  } catch (error) {
    return errorResponse('サーバーエラーが発生しました', 500, error);
  }
}

function errorResponse(message, status, error) {
  return NextResponse.json({ error: message }, { status });
}
