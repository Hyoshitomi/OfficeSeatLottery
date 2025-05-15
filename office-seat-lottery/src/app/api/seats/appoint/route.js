import { NextResponse } from 'next/server'
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const seats = await prisma.m_SEAT.findMany({
        where: {
          status: 1
        }
    });
    return NextResponse.json(seats, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { boxes } = await request.json();

    // 1. 送信データをパース
    const seats = boxes.map(box => {
      const match = box.name.match(/^([A-Z]+)(\d+)$/);
      const tableId = match ? match[1] : null;
      const seatNumber = match ? Number(match[2]) : null;
      let statusNum = 1;
      if (box.status === 'movable') statusNum = 1;
      else if (box.status === 'fixed') statusNum = 2;
      else if (box.status === 'unused') statusNum = 3;
      else if (box.status === 'reserved') statusNum = 4;

      return {
        seatId: tableId && seatNumber ? `${tableId}${seatNumber}` : undefined,
        tableId,
        seatNumber,
        status: statusNum,
        imageX: Math.round(box.x),
        imageY: Math.round(box.y),
      };
    }).filter(seat => seat.seatId);

    // 2. DBから現状の座席一覧を取得
    const dbSeats = await prisma.m_SEAT.findMany();
    const dbSeatIds = new Set(dbSeats.map(s => s.seatId));
    const reqSeatIds = new Set(seats.map(s => s.seatId));

    // 3. 削除対象seatId（DBにあるがリクエストにないもの）
    const deleteSeatIds = dbSeats
      .filter(s => !reqSeatIds.has(s.seatId))
      .map(s => s.seatId);

    // 4. 更新対象seatId（両方に存在するもの）
    const updateSeats = seats.filter(s => dbSeatIds.has(s.seatId));

    // 5. 新規追加seatId（リクエストにはあるがDBにないもの）
    const insertSeats = seats.filter(s => !dbSeatIds.has(s.seatId));

    // 6. トランザクションで処理
    await prisma.$transaction(async (tx) => {
      // 削除（関連テーブルも削除）
      for (const seatId of deleteSeatIds) {
        // 関連データ削除
        await tx.m_SEAT_APPOINT.deleteMany({ where: { seatId } });
        await tx.t_SEAT_POSITION.deleteMany({ where: { seatId } });
        // 座席削除
        await tx.m_SEAT.delete({ where: { seatId } });
      }

      // 更新
      for (const seat of updateSeats) {
        await tx.m_SEAT.update({
          where: { seatId: seat.seatId },
          data: {
            tableId: seat.tableId,
            seatNumber: seat.seatNumber,
            status: seat.status,
            imageX: seat.imageX,
            imageY: seat.imageY,
          }
        });
      }

      // 追加
      if (insertSeats.length > 0) {
        await tx.m_SEAT.createMany({ data: insertSeats });
      }
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}