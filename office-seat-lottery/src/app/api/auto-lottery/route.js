// app/api/auto-lottery/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

function toStartOfUTCDay(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// JSTの曜日名を "Monday" など英語で取得
function getJSTWeekdayLong(now) {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'Asia/Tokyo' }).format(now)
}

export async function POST() {
  const now = new Date()
  const today = toStartOfUTCDay(now) // 既存の日付比較がUTC日付開始であれば踏襲
  const jstWeekday = getJSTWeekdayLong(now) // "Monday" | "Tuesday" | ...

  try {
    // 1) 自動対象メンバーをJSTの曜日で抽出
    const members = await prisma.m_AUTO_LOTTERY_MEMBER.findMany({
      where: { Weekday: jstWeekday }, // Weekdayが単一値で一致する想定（複数値ならcontains/has等に変更）
      select: { userId: true }
    })

    const userIds = members.map(m => m.userId)
    if (userIds.length === 0) {
      return NextResponse.json({ message: '対象ユーザーなし（本日の曜日に一致するメンバーがいません）', date: today, weekday: jstWeekday }, { status: 200 })
    }

    // 2) 必要情報の一括取得
    const [seats, todayRecords, appointmentRecords] = await Promise.all([
      prisma.m_SEAT.findMany({ where: { status: 1 }, select: { seatId: true } }),
      prisma.t_SEAT_POSITION.findMany({ where: { date: today }, select: { userId: true, seatId: true } }),
      prisma.m_SEAT_APPOINT.findMany({ where: { startDate: { lte: today }, endDate: { gte: today } }, select: { seatId: true } })
    ])

    // 3) 利用可能座席チェックと除外
    const allSeatIds = seats.map(s => s.seatId)
    if (allSeatIds.length === 0) {
      return errorResponse('利用可能な座席がありません', 400)
    }

    const registeredUserIds = new Set(todayRecords.map(r => r.userId)) // 本日すでに登録済みのユーザー
    const usedSeatIds = new Set(todayRecords.map(r => r.seatId))       // 本日すでに使用中の座席
    const appointedSeatIds = new Set(appointmentRecords.map(r => r.seatId)) // 予約期間中の座席

    // 4) まだ本日登録されていない対象ユーザー
    const targetUserIds = userIds.filter(id => !registeredUserIds.has(id))
    if (targetUserIds.length === 0) {
      return errorResponse('全ての対象ユーザーが本日登録済みです', 400)
    }

    // 5) 空席抽出（使用中と予約中を除外）
    const availableSeatIds = allSeatIds.filter(id => !usedSeatIds.has(id) && !appointedSeatIds.has(id))
    if (availableSeatIds.length < targetUserIds.length) {
      return errorResponse('空き座席が足りません。本日は集中コーナーを使用してください。', 400)
    }

    // 6) ランダム割り当て
    const shuffledSeatIds = shuffleArray(availableSeatIds).slice(0, targetUserIds.length)
    const createData = targetUserIds.map((userId, idx) => ({
      date: today,
      seatId: shuffledSeatIds[idx],
      userId,
      created: now,
      updated: null
    }))

    // 7) 一括登録
    const dbResult = await prisma.t_SEAT_POSITION.createMany({ data: createData })

    return NextResponse.json({ weekday: jstWeekday, result: createData, dbResult }, { status: 200 })
  } catch (e) {
    return errorResponse('サーバーエラーが発生しました', 500, e)
  }
}

function errorResponse(message, status, error) {
  return NextResponse.json({ error: message, detail: error instanceof Error ? error.message : undefined }, { status })
}
