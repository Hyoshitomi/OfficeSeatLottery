import { NextResponse } from 'next/server'
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function GET() {
  // 今日の日付（00:00:00に揃える）
  const now = new Date();
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  try {
    // status=1の座席：T_SEAT_POSITIONから当日分を取得
    const status1Positions = await prisma.t_SEAT_POSITION.findMany({
      where: {
        seat: { status: 1 },
        date: {
          gte: today,
          lt: tomorrow
        }
      },
      include: {
        seat: true,
        user: true
      }
    });

    // status=2,4の座席：M_SEAT_APPOINTから当日が予約範囲に含まれるものを取得
    const status2And4Appointments = await prisma.m_SEAT_APPOINT.findMany({
      where: {
        seat: { status: { in: [2, 4] } },
        startDate: { lte: today },
        endDate: { gte: today }
      },
      include: {
        seat: true,
        user: true
      }
    });

    // 2つの配列を統合し、レスポンス用に整形
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
    console.error(e); // エラー内容をログ出力
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}


export async function DELETE(request) {
  try {
    const { seatId } = await request.json();
    if (!seatId) {
      return NextResponse.json({ error: 'seatId is required' }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.t_SEAT_POSITION.deleteMany({ where: { seatId } });
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}