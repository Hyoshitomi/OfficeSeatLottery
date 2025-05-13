import { NextResponse } from 'next/server'
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const seats = await prisma.m_SEAT.findMany();
    return NextResponse.json(seats, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { boxes } = await request.json();

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

    // トランザクションで全削除→一括登録
    await prisma.$transaction([
      prisma.m_SEAT.deleteMany({}), // 既存データ全削除
      prisma.m_SEAT.createMany({ data: seats }) // 新規一括登録
    ]);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

