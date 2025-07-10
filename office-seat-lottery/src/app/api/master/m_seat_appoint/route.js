import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

/**
 * GET  : 有効な座席予約の取得
 * POST : 座席予約の一括更新／削除
 */

/* ------------------------------------------------------------------ */
/* GET                                                                */
/* ------------------------------------------------------------------ */
export async function GET() {
  try {
    const now = new Date();

    const records = await prisma.m_SEAT_APPOINT.findMany({
      where: {
        endDate: { gt: now },           // ① 現在より未来の予約のみ
      },
      orderBy: [
        { endDate: 'asc' },             // ② 終了日時が近い順
        { id: 'asc' },                  // ③ 同一日時内で安定した並び
      ],
    });

    return NextResponse.json(records);
  } catch (err) {
    console.error('GET /api/master/m_seat_appoint error:', err);
    return NextResponse.json(
      { error: 'データ取得に失敗しました' },
      { status: 500 },
    );
  }
}

/* ------------------------------------------------------------------ */
/* POST                                                               */
/* ------------------------------------------------------------------ */
export async function POST(request) {
  try {
    const { updates = [], deletes = [] } = await request.json();

    /* ----------------------------- 更新 ---------------------------- */
    const updateOps = updates.map((item) => {
      // userId を変更する場合のみ data に含める
      const updateData = {
        appointId: item.appointId,
        seatId: item.seatId,
        startDate: new Date(item.startDate),
        endDate: new Date(item.endDate),
        updated: new Date(),
      };
      if (item.userId !== undefined && item.userId !== null) {
        updateData.userId = item.userId;
      }

      return prisma.m_SEAT_APPOINT.update({
        where: { id: item.id },
        data: updateData,
      });
    });

    /* ----------------------------- 削除 ---------------------------- */
    const deleteOp =
      deletes.length > 0
        ? prisma.m_SEAT_APPOINT.deleteMany({
            where: { id: { in: deletes } },
          })
        : null;

    /* ------------------------- トランザクション -------------------- */
    const tx = [
      ...updateOps,
      ...(deleteOp ? [deleteOp] : []),
    ];

    const results = await prisma.$transaction(tx);

    // 最後に deleteOp があれば結果は配列末尾、なければ null
    const deletedCount =
      deleteOp ? (results[results.length - 1] ).count : 0;

    return NextResponse.json({
      success: true,
      updatedCount: updates.length,
      deletedCount,
    });
  } catch (err) {
    console.error('POST /api/master/m_seat_appoint error:', err);
    return NextResponse.json(
      { error: 'データ更新／削除に失敗しました' },
      { status: 500 },
    );
  }
}
