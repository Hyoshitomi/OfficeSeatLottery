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
    // t_SEAT_POSITION, m_SEAT, m_USERをJOIN
    const positions = await prisma.t_SEAT_POSITION.findMany({
      where: {
        date: {
          gte: today,
          lt: tomorrow
        }
      },
      include: {
        seat: true,
        user: true,
      }
    });

    // nameロジックを適用
    const seats = positions.map(pos => {
      let name = '';
      if (pos.user) {
        name = pos.user.showName || pos.user.lastName || '(名前未設定)';
      } else {
        name = '(名前未設定)';
      }
      return {
        seatId: pos.seatId,
        name,
        status: pos.seat ? pos.seat.status : null,
        imageX: pos.seat ? pos.seat.imageX : null,
        imageY: pos.seat ? pos.seat.imageY : null,
      };
    });

    return NextResponse.json(seats, { status: 200 });
  } catch (e) {
    console.error(e); // 追加: エラー内容をログ出力
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

