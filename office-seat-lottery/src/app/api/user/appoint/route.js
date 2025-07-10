import { NextResponse } from 'next/server'
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 登録済みユーザー除外ロジックを削除し、全ユーザーを直接取得
    const users = await prisma.m_USER.findMany({
      where: {
        deleteFlag: false // 削除フラグが立っていないユーザーのみ
      },
      orderBy: [
        { insideFlag: 'desc' }, 
        { userId: 'asc' } 
      ]
    });

    // フォーマット変換
    const employeeList = users.map((u) => ({
      id: u.userId,
      value: u.employeeNumber,
      label: `${u.lastName} ${u.firstName}`,
    }));

    return NextResponse.json(employeeList, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
