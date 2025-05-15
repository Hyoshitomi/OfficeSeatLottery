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
    // 1. 今日登録済みのユーザーID一覧を取得
    // T_SEAT_POSITION（流動席）
    const positionUserIds = await prisma.t_SEAT_POSITION.findMany({
      where: {
        date: {
          gte: today,
          lt: tomorrow
        }
      },
      select: { userId: true }
    });

    // M_SEAT_APPOINT（固定・予約席）
    const appointUserIds = await prisma.m_SEAT_APPOINT.findMany({
      where: {
        startDate: { lte: today },
        endDate: { gte: today }
      },
      select: { userId: true }
    });

    // ユニークなユーザーIDのリスト
    const registeredUserIds = [
      ...new Set([
        ...positionUserIds.map(u => u.userId),
        ...appointUserIds.map(u => u.userId),
      ])
    ];

    // 2. 登録済みユーザーを除外してM_USER一覧取得
    const users = await prisma.m_USER.findMany({
      where: {
        deleteFlag: false,
        userId: { notIn: registeredUserIds }
      },
      orderBy: { employeeNumber: 'asc' }
    });

    // employeeList形式に変換
    const employeeList = users.map(user => ({
      value: user.employeeNumber,
      label: `${user.lastName} ${user.firstName}`,
      icon: null,
    }));

    return NextResponse.json(employeeList, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
