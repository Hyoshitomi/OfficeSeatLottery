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
  console.time("lottery: 全体")
  const now = new Date();
  const today = toStartOfUTCDay(now);

  try {
    // --- 1. リクエストパース ---
    console.time("lottery: parse body")
    const body = await request.json();
    const { employeeNumbers } = body;
    console.timeEnd("lottery: parse body")

    // --- 2. バリデーション ---
    console.time("lottery: validation")
    if (!Array.isArray(employeeNumbers) || employeeNumbers.length === 0) {
      console.timeEnd("lottery: validation")
      console.timeEnd("lottery: 全体")
      return errorResponse('社員番号リストが必要です', 400);
    }
    console.timeEnd("lottery: validation")

    // --- 3. DBから必要な情報を一括取得 ---
    console.time("lottery: fetch DB")
    const [users, seats, todayRecords] = await Promise.all([
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
      })
    ]);
    console.timeEnd("lottery: fetch DB")

    // --- 4. ユーザーチェック ---
    console.time("lottery: user check")
    const userIds = users.map(u => u.userId);
    if (userIds.length === 0) {
      console.timeEnd("lottery: user check")
      console.timeEnd("lottery: 全体")
      return errorResponse('該当するユーザーが存在しません', 400);
    }
    console.timeEnd("lottery: user check")

    // --- 5. 利用可能座席チェック ---
    console.time("lottery: seat check")
    const allSeatIds = seats.map(s => s.seatId);
    if (allSeatIds.length === 0) {
      console.timeEnd("lottery: seat check")
      console.timeEnd("lottery: 全体")
      return errorResponse('利用可能な座席がありません', 400);
    }
    console.timeEnd("lottery: seat check")

    // --- 6. 本日登録済みユーザー・使用済み座席のセット化 ---
    console.time("lottery: set化")
    const registeredUserIds = new Set(todayRecords.map(r => r.userId));
    const usedSeatIds = new Set(todayRecords.map(r => r.seatId));
    console.timeEnd("lottery: set化")

    // --- 7. 未登録ユーザーの抽出 ---
    console.time("lottery: filter target users")
    const targetUserIds = userIds.filter(id => !registeredUserIds.has(id));
    if (targetUserIds.length === 0) {
      console.timeEnd("lottery: filter target users")
      console.timeEnd("lottery: 全体")
      return errorResponse('全てのユーザーが既に登録済みです', 400);
    }
    console.timeEnd("lottery: filter target users")

    // --- 8. 空き座席抽出 ---
    console.time("lottery: filter available seats")
    const availableSeatIds = allSeatIds.filter(id => !usedSeatIds.has(id));
    if (availableSeatIds.length < targetUserIds.length) {
      console.timeEnd("lottery: filter available seats")
      console.timeEnd("lottery: 全体")
      return errorResponse('空き座席が足りません。本日は集中コーナーを使用してください。', 400);
    }
    console.timeEnd("lottery: filter available seats")

    // --- 9. シャッフル・割り当て ---
    console.time("lottery: shuffle and assign")
    const shuffledSeatIds = shuffleArray(availableSeatIds).slice(0, targetUserIds.length);
    const createData = targetUserIds.map((userId, idx) => ({
      date: today,
      seatId: shuffledSeatIds[idx],
      userId,
      created: now,
      updated: null
    }));
    console.timeEnd("lottery: shuffle and assign")

    // --- 10. DB登録 ---
    console.time("lottery: createMany")
    const dbResult = await prisma.t_SEAT_POSITION.createMany({ data: createData });
    console.timeEnd("lottery: createMany")

    // --- 11. レスポンス生成 ---
    console.time("lottery: response")
    const response = NextResponse.json({ result: createData, dbResult }, { status: 200 });
    console.timeEnd("lottery: response")

    console.timeEnd("lottery: 全体")
    return response;

  } catch (error) {
    console.error("[API] DB登録エラー:", error);
    console.timeEnd("lottery: 全体")
    return errorResponse('サーバーエラーが発生しました', 500, error);
  }
}

function errorResponse(message, status, error) {
  if (error) {
    console.error("[API] エラー詳細:", error);
  }
  return NextResponse.json({ error: message }, { status });
}
