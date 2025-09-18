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
    // 今日の日付の0時0分0秒を取得
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // ① endDateが今日以降のレコードを全て取得
    const records = await prisma.m_SEAT_APPOINT.findMany({
      where: {
        endDate: { gte: startOfToday }, // 'gt' (より大きい) から 'gte' (以上) へ変更
      },
    });

    // ② 取得したデータを要件に従って並び替え
    records.sort((a, b) => {
      const aIsPermanent = new Date(a.endDate).getFullYear() === 9999;
      const bIsPermanent = new Date(b.endDate).getFullYear() === 9999;

      // 優先度3: endDateが9999/12/31のデータを最後に回す
      if (aIsPermanent !== bIsPermanent) {
        return aIsPermanent ? 1 : -1;
      }

      // --- ここからは a, b ともにendDateが9999/12/31でない、または両方ともそうである場合の処理 ---

      // 9999/12/31同士のデータの順序はIDで安定させる
      if (aIsPermanent && bIsPermanent) {
        return a.id - b.id;
      }

      // --- ここからは a, b ともにendDateが9999/12/31でない場合の処理 ---

      const aStartsInFuture = new Date(a.startDate) >= startOfToday;
      const bStartsInFuture = new Date(b.startDate) >= startOfToday;
      
      // 優先度1: startDateが今日以降のものを先に表示
      if (aStartsInFuture !== bStartsInFuture) {
        return aStartsInFuture ? -1 : 1;
      }
      
      // 優先度2: 各グループ（未来開始/過去開始）内でstartDateの昇順にソート
      const startDateDiff = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      if (startDateDiff !== 0) {
        return startDateDiff;
      }

      // startDateも同じ場合はIDで安定した順序を保証
      return a.id - b.id;
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
