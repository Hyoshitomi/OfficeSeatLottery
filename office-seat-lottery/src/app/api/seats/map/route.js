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

  try {
    // 全座席を取得（status=1または4のみ）
    const allSeats = await prisma.m_SEAT.findMany({
      where: {
        status: { in: [1, 4] }
      },
      include: {
        seatAppointments: {
          where: {
            startDate: { lte: targetDay },
            endDate: { gte: targetDay }
          },
          include: {
            user: true
          }
        },
        seatPositions: {
          where: {
            date: targetDay  // 完全一致
          },
          include: {
            user: true
          }
        }
      }
    });

    const seats = [];

    for (const seat of allSeats) {
      let finalStatus;
      let userName = '(名前未設定)';

      // M_SEAT_APPOINTテーブルで範囲内のデータをチェック
      if (seat.seatAppointments.length > 0) {
        const appointment = seat.seatAppointments[0]; // 条件に合致する予約
        
        // endDateが9999/12/31かチェック
        const endDate = new Date(appointment.endDate);
        const maxDate = new Date('9999-12-31');
        
        if (endDate.getTime() === maxDate.getTime()) {
          finalStatus = 2; // 固定
        } else {
          finalStatus = 4; // 予約
        }
        
        userName = appointment.user?.showName || appointment.user?.lastName || '(名前未設定)';
      } else {
        // M_SEAT_APPOINTに範囲内のデータが無い場合
        finalStatus = 1; // 流動
        
        // status1の場合はt_seat_positionから該当日のデータを取得
        if (seat.seatPositions.length > 0) {
          const position = seat.seatPositions[0];
          userName = position.user?.showName || position.user?.lastName || '(名前未設定)';
        } else {
          // 該当日のデータが無い場合は取得しない
          continue;
        }
      }

      seats.push({
        seatId: seat.seatId,
        name: userName,
        status: finalStatus,
        imageX: seat.imageX,
        imageY: seat.imageY,
      });
    }

    return NextResponse.json(seats, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
