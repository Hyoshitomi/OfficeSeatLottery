import { NextResponse } from 'next/server'
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function GET(request) {
  // クエリパラメータから日付を取得（例: ?date=2025-06-01）
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date');

  // 日付が指定されていなければエラー
  if (!dateStr) {
    return NextResponse.json({ error: 'dateパラメータが必要です (例: ?date=2025-06-01)' }, { status: 400 });
  }

  // 日付の妥当性チェック
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return NextResponse.json({ error: 'dateパラメータが不正です' }, { status: 400 });
  }

  // 00:00:00に揃える
  const targetDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const nextDay = new Date(targetDay);
  nextDay.setDate(targetDay.getDate() + 1);

  try {
    // status=1の座席
    const status1Positions = await prisma.t_SEAT_POSITION.findMany({
      where: {
        seat: { status: 1 },
        date: {
          gte: targetDay,
          lt: nextDay
        }
      },
      include: {
        seat: true,
        user: true
      }
    });

    // status=2,4の座席
    const status2And4Appointments = await prisma.m_SEAT_APPOINT.findMany({
      where: {
        seat: { status: { in: [2, 4] } },
        startDate: { lte: targetDay },
        endDate: { gte: targetDay }
      },
      include: {
        seat: true,
        user: true
      }
    });

    // レスポンス整形
    const seats = [
      ...status1Positions.map(pos => ({
        seatId: pos.seatId,
        name: pos.user ? (pos.user.showName || pos.user.lastName || '(名前未設定)') : '(名前未設定)',
        status: pos.seat.status,
        imageX: pos.seat.imageX,
        imageY: pos.seat.imageY,
      })),
      ...status2And4Appointments.map(app => ({
        seatId: app.seatId,
        name: app.user ? (app.user.showName || app.user.lastName || '(名前未設定)') : '(名前未設定)',
        status: app.seat.status,
        imageX: app.seat.imageX,
        imageY: app.seat.imageY,
      }))
    ];

    return NextResponse.json(seats, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
