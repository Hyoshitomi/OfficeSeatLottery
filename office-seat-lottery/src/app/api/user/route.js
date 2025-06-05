import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth";

import { PrismaClient } from "@/generated/prisma";
import { authOptions } from "@/lib/auth-options";

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
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

const SALT_ROUNDS = 12; // bcryptのラウンド数
export async function PATCH(request) {
  try {
    // セッション認証（API保護）
    const session = await getServerSession(authOptions);
    if (!session?.user?.employeeNumber) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    // DBからユーザー取得
    const user = await prisma.m_USER.findUnique({
      where: { employeeNumber: session.user.employeeNumber }
    });
    if (!user) {
      return NextResponse.json({ error: 'ユーザーが存在しません' }, { status: 404 });
    }
    if (user.deleteFlag) {
      return NextResponse.json({ error: '無効なユーザーです' }, { status: 403 });
    }

    // 現在のパスワード照合
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: '現在のパスワードが正しくありません' }, { status: 401 });
    }

    // 新旧パスワードの差分チェック
    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return NextResponse.json({ error: '新しいパスワードが現在のものと同じです' }, { status: 400 });
    }

    // 新パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // パスワード更新
    await prisma.m_USER.update({
      where: { employeeNumber: session.user.employeeNumber },
      data: { password: hashedPassword }
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (_error) {
    // エラー内容はレスポンスには詳細を出さない
    return NextResponse.json({ _error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
