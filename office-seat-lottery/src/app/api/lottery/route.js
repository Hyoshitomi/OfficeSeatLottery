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
    // 1. ユーザーチェック
    const users = await prisma.m_USER.findMany({
      where: { employeeNumber: { in: employeeNumbers.map(String) } },
      select: { userId: true }
    });
    const userIds = users.map(u => u.userId);
    if (userIds.length === 0) {
      return NextResponse.json({ error: '該当するユーザーが存在しません' }, { status: 400 });
    }

    // 2. 座席マスタチェック
    const seats = await prisma.m_SEAT.findMany({
      where: { status: 1 },
      select: { seatId: true }
    });
    const allSeatIds = seats.map(s => s.seatId);
    if (allSeatIds.length === 0) {
      return NextResponse.json({ error: '利用可能な座席がありません' }, { status: 400 });
    }

    // 3. テーブル登録済みチェック（ユーザー重複チェック）
    const existingRecords = await prisma.t_SEAT_POSITION.findMany({
      where: {
        date: today,
        userId: { in: userIds }
      },
      select: { userId: true }
    });
    const duplicateUserIds = new Set(existingRecords.map(r => r.userId));
    const filteredUserIds = userIds.filter(id => !duplicateUserIds.has(id));
    if (filteredUserIds.length === 0) {
      return NextResponse.json({ error: 'すでに全てのユーザーが登録済みです' }, { status: 400 });
    }

    // 4. 残り座席数チェック
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
    const availableSeatIds = allSeatIds.filter(id => !usedSeatIds.includes(id));
    if (availableSeatIds.length < filteredUserIds.length) {
      return NextResponse.json({ error: '空き座席が足りません。本日は集中コーナーを使用してください。' }, { status: 400 });
    }

    // 5. シャッフル
    for (let i = availableSeatIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableSeatIds[i], availableSeatIds[j]] = [availableSeatIds[j], availableSeatIds[i]];
    }

    // 6. 登録データ作成
    const createData = filteredUserIds.map((userId, idx) => ({
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
