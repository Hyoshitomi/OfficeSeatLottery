import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

/* 当日の 00:00:00〜翌日 00:00:00 範囲を返すユーティリティ */
const todayRange = () => {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setDate(end.getDate() + 1)
  return { start, end }
}

/* ───────── GET : 当日分の一覧（変更なし） ───────── */
export async function GET() {
  try {
    const { start, end } = todayRange()

    const seatPositions = await prisma.t_SEAT_POSITION.findMany({
      where: { date: { gte: start, lt: end } },
      orderBy: { seatId: 'asc' },
      select: {
        seatId: true,
        user: { select: { lastName: true, firstName: true } }
      }
    })

    const response = seatPositions.map(p => ({
      id: p.seatId,
      label: `${p.user.lastName} ${p.user.firstName}`
    }))

    return NextResponse.json(response, { status: 200 })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

/* ───────── POST: 座席交換（delete→insert 版） ───────── */
export async function POST(req) {
  try {
    /* 1. パラメータ取得 */
    const { seatA = [], seatB = [] } = await req.json()
    const idA= seatA[0]
    const idB= seatB[0]
    if (!idA || !idB || idA === idB)
      return NextResponse.json({ error: 'seatA / seatB を確認してください' }, { status: 400 })

    const { start, end } = todayRange()

    /* 2. 交換処理を 1 トランザクションで実行 */
    await prisma.$transaction(async (tx) => {
      /* 2-1. 当日の 2 行を取得 */
      const rows = await tx.t_SEAT_POSITION.findMany({
        where: {
          date: { gte: start, lt: end },
          seatId: { in: [idA, idB] }
        },
        select: { id: true, seatId: true, userId: true, date: true, created: true }
      })
      if (rows.length !== 2) throw new Error('対象データが見つかりません')

      const [rowA] = rows.filter(r => r.seatId === idA)
      const [rowB] = rows.filter(r => r.seatId === idB)

      /* 2-2. 事前重複チェック（同日で他席に同じ userId が無いか） */
      const duplicate = await tx.t_SEAT_POSITION.findFirst({
        where: {
          date: { gte: start, lt: end },
          userId: { in: [rowA.userId, rowB.userId] },
          NOT: { id: { in: [rowA.id, rowB.id] } }
        }
      })
      if (duplicate) throw new Error('同じユーザーが既に別席に登録されています')

      /* 2-3. 両行を削除 */
      await tx.t_SEAT_POSITION.deleteMany({ where: { id: { in: [rowA.id, rowB.id] } } })

      /* 2-4. 交換した userId で insert */
      await tx.t_SEAT_POSITION.createMany({
        data: [
          {
            date: rowA.date,
            seatId: rowA.seatId,
            userId: rowB.userId,     // ← 入れ替え
            created: rowA.created,
            updated: new Date()
          },
          {
            date: rowB.date,
            seatId: rowB.seatId,
            userId: rowA.userId,     // ← 入れ替え
            created: rowB.created,
            updated: new Date()
          }
        ],
        skipDuplicates: false        // 重複があれば例外でロールバック
      })
    })

    return NextResponse.json({ message: '座席を交換しました' }, { status: 200 })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    const status =  500
    return NextResponse.json({ error: msg }, { status })
  }
}
