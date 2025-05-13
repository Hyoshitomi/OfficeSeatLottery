import { NextResponse } from 'next/server'
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request) {
  // bodyの取得
  const body = await request.json();
  const { employeeNumbers } = body;

  if (!Array.isArray(employeeNumbers) || employeeNumbers.length === 0) {
    return NextResponse.json({ error: 'employeeNumbers is required' }, { status: 400 });
  }

  // 今日の日付（00:00:00に揃える）
  const now = new Date();
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  try {
    // 1. employeeNumberからuserIdを取得
    const users = await prisma.m_USER.findMany({
      where: { employeeNumber: { in: employeeNumbers.map(String) } },
      select: { userId: true }
    });
    const userIds = users.map(u => u.userId);

    // 2. status=1のseatId取得
    const seats = await prisma.m_SEAT.findMany({
      where: { status: 1 },
      select: { seatId: true }
    });
    const allSeatIds = seats.map(s => s.seatId);

    // 3. 今日既に割り当てられているseatIdを取得
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const usedSeats = await prisma.t_SEAT_POSITION.findMany({
      where: {
        date: {
          gte: today,
          lt: tomorrow
        }
      },
      select: { seatId: true }
    });
    const usedSeatIds = usedSeats.map(s => s.seatId);

    // 4. 利用可能なseatIdを抽出
    const availableSeatIds = allSeatIds.filter(id => !usedSeatIds.includes(id));

    // 5. シャッフル
    for (let i = availableSeatIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableSeatIds[i], availableSeatIds[j]] = [availableSeatIds[j], availableSeatIds[i]];
    }

    if (availableSeatIds.length < userIds.length) {
      return NextResponse.json({ error: '空き座席が足りません' }, { status: 400 });
    }

    // 6. 登録データ作成
    const createData = userIds.map((userId, idx) => ({
      date: today,
      seatId: availableSeatIds[idx],
      userId,
      created: now,
      updated: null
    }));

    // 7. 登録
    const result = await prisma.t_SEAT_POSITION.createMany({ data: createData });

    return NextResponse.json({ result: createData, dbResult: result }, { status: 200 });
  } catch (error) {
    console.error("[API] DB登録エラー:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}