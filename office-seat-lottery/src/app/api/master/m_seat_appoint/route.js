import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // 現在日時
    const now = new Date()

    const records = await prisma.m_SEAT_APPOINT.findMany({
      where: {
        // ① endDate が現在日時を超えているレコードのみ取得
        endDate: { gt: now }
      },
      orderBy: [
        // ② endDate が近い順 → 9999-12-31 は末尾
        { endDate: 'asc' },
        // ③ 同じ endDate 内で安定した並びを保つ
        { id: 'asc' }
      ]
    })

    return NextResponse.json(records)
  } catch (err) {
    console.error('GET /api/master/m_seat_appoint error:', err)
    return NextResponse.json(
      { error: 'データ取得に失敗しました' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    // リクエストボディから updates と deletes を取得
    const { updates, deletes } = await request.json()

    // 更新処理の配列を生成
    const updateOps = updates.map(item =>
      prisma.m_SEAT_APPOINT.update({
        where: { id: item.id },
        data: {
          appointId: item.appointId,
          seatId: item.seatId,
          userId: item.userId,
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate),
          updated: new Date(),
        },
      })
    )

    // 削除処理（ID 配列が空でない場合のみ実行）
    const deleteOp = deletes && deletes.length > 0
      ? prisma.m_SEAT_APPOINT.deleteMany({
          where: { id: { in: deletes } },
        })
      : Promise.resolve({ count: 0 })

    // 更新と削除を並列実行
    const [updatedResults, deleteResult] = await Promise.all([
      prisma.$transaction(updateOps),
      deleteOp,
    ])

    return NextResponse.json({
      success: true,
      updatedCount: updatedResults.length,
      deletedCount: deleteResult.count,
    })
  } catch (err) {
    console.error('POST /api/master/m_seat_appoint error:', err)
    return NextResponse.json(
      { error: 'データ更新／削除に失敗しました' },
      { status: 500 }
    )
  }
}
