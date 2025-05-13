import { NextResponse } from 'next/server'
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function GET() {
  try {
    // M_USERテーブルから全件取得
    const users = await prisma.m_USER.findMany({
      where: { deleteFlag: false }, // 論理削除されていないユーザーのみ
      orderBy: { employeeNumber: 'asc' }
    });

    // employeeList形式に変換
    const employeeList = users.map(user => ({
      value: user.employeeNumber, // employeeNumberをセット
      label: `${user.lastName} ${user.firstName}`, // 姓 名
      icon: null, // 空欄
    }));

    return NextResponse.json(employeeList, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
