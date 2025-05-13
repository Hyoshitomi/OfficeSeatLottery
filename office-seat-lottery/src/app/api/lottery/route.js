import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { employeeNumbers } = req.body;
  if (!Array.isArray(employeeNumbers) || employeeNumbers.length === 0) {
    res.status(400).json({ error: 'employeeNumbers is required' });
    return;
  }

  // 今日の日付（00:00:00に揃える）
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  try {
    // 1. employeeNumberからuserIdを取得
    const users = await prisma.m_USER.findMany({
      where: { employeeNumber: { in: employeeNumbers } },
      select: { userId: true }
    });
    const userIds = users.map(u => u.userId);

    // 2. status=1のseatId取得
    const seats = await prisma.m_SEAT.findMany({
      where: { status: 1 },
      select: { seatId: true }
    });
    const allSeatIds = seats.map(s => s.seatId);

    // 3. 今日既に割り当てられているseatIdを取得
    const usedSeats = await prisma.t_SEAT_POSITION.findMany({
      where: { date: today },
      select: { seatId: true }
    });
    const usedSeatIds = usedSeats.map(s => s.seatId);

    // 4. 利用可能なseatIdを抽出
    const availableSeatIds = allSeatIds.filter(id => !usedSeatIds.includes(id));

    // 5. シャッフル
    for (let i = availableSeatIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableSeatIds[i], availableSeatIds[j]] = [availableSeatIds[j], availableSeatIds[i]];
    }

    if (availableSeatIds.length < userIds.length) {
      res.status(400).json({ error: '空き座席が足りません' });
      return;
    }

    // 6. 登録データ作成
    const createData = userIds.map((userId, idx) => ({
      date: today,
      seatId: availableSeatIds[idx],
      userId,
      created: now,
      updated: null
    }));

    // 7. 登録
    await prisma.t_SEAT_POSITION.createMany({ data: createData });

    res.status(200).json({ result: createData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
