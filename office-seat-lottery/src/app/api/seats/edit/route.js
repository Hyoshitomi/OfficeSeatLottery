import { NextResponse } from 'next/server'

import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// 定数定義
const SEAT_STATUS = {
  MOVABLE: 1,    // 流動席
  UNUSED: 3      // 未使用席
};

const ALLOWED_STATUSES = ['movable', 'unused'];

export async function GET() {
  try {
    const seats = await prisma.m_SEAT.findMany();
    return NextResponse.json(seats, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { boxes } = await request.json();
    
    const seats = parseSeatsFromBoxes(boxes);
    await updateSeatsInDatabase(seats);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * ボックスデータから座席データを解析
 * @param {Array} boxes - ボックスデータ配列
 * @returns {Array} 座席データ配列
 */
function parseSeatsFromBoxes(boxes) {
  if (!Array.isArray(boxes)) {
    throw new Error('boxes must be an array');
  }

  return boxes
    .map(box => parseSingleSeat(box))
    .filter(seat => seat !== null);
}

/**
 * 単一の座席データを解析
 * @param {Object} box - ボックスデータ
 * @returns {Object|null} 座席データまたはnull
 */
function parseSingleSeat(box) {
  const seatInfo = parseSeatName(box.name);
  if (!seatInfo) return null;

  const status = parseStatus(box.status);
  if (status === null) return null;

  return {
    seatId: `${seatInfo.tableId}${seatInfo.seatNumber}`,
    tableId: seatInfo.tableId,
    seatNumber: seatInfo.seatNumber,
    status,
    imageX: parseCoordinate(box.x),
    imageY: parseCoordinate(box.y),
  };
}

/**
 * 座席名を解析してテーブルIDと座席番号を取得
 * @param {string} name - 座席名
 * @returns {Object|null} {tableId, seatNumber} または null
 */
function parseSeatName(name) {
  if (typeof name !== 'string') return null;
  
  const match = name.match(/^([A-Z]+)(\d+)$/);
  if (!match) return null;

  return {
    tableId: match[1],
    seatNumber: Number(match[2])
  };
}

/**
 * ステータス文字列を数値に変換（1または3のみ許可）
 * @param {string} status - ステータス文字列
 * @returns {number|null} ステータス数値またはnull
 */
function parseStatus(status) {
  if (!ALLOWED_STATUSES.includes(status)) {
    return null;
  }

  switch (status) {
    case 'movable':
      return SEAT_STATUS.MOVABLE;
    case 'unused':
      return SEAT_STATUS.UNUSED;
    default:
      return null;
  }
}

/**
 * 座標値を解析
 * @param {number} coordinate - 座標値
 * @returns {number} 整数座標値
 */
function parseCoordinate(coordinate) {
  return typeof coordinate === 'number' ? Math.round(coordinate) : 0;
}

/**
 * データベースの座席情報を更新
 * @param {Array} seats - 座席データ配列
 */
async function updateSeatsInDatabase(seats) {
  const dbSeats = await prisma.m_SEAT.findMany();
  const operations = calculateDatabaseOperations(seats, dbSeats);

  await prisma.$transaction(async (tx) => {
    await deleteSeats(tx, operations.deleteIds);
    await updateSeats(tx, operations.updateSeats);
    await insertSeats(tx, operations.insertSeats);
  });
}

/**
 * データベース操作を計算
 * @param {Array} seats - 新しい座席データ
 * @param {Array} dbSeats - 既存の座席データ
 * @returns {Object} 操作内容
 */
function calculateDatabaseOperations(seats, dbSeats) {
  const dbSeatIds = new Set(dbSeats.map(s => s.seatId));
  const reqSeatIds = new Set(seats.map(s => s.seatId));

  return {
    deleteIds: dbSeats
      .filter(s => !reqSeatIds.has(s.seatId))
      .map(s => s.seatId),
    updateSeats: seats.filter(s => dbSeatIds.has(s.seatId)),
    insertSeats: seats.filter(s => !dbSeatIds.has(s.seatId))
  };
}

/**
 * 座席を削除（関連データも削除）
 * @param {Object} tx - トランザクション
 * @param {Array} deleteIds - 削除対象のseatId配列
 */
async function deleteSeats(tx, deleteIds) {
  for (const seatId of deleteIds) {
    await tx.m_SEAT_APPOINT.deleteMany({ where: { seatId } });
    await tx.t_SEAT_POSITION.deleteMany({ where: { seatId } });
    await tx.m_SEAT.delete({ where: { seatId } });
  }
}

/**
 * 座席を更新
 * @param {Object} tx - トランザクション
 * @param {Array} updateSeats - 更新対象の座席データ配列
 */
async function updateSeats(tx, updateSeats) {
  for (const seat of updateSeats) {
    await tx.m_SEAT.update({
      where: { seatId: seat.seatId },
      data: {
        tableId: seat.tableId,
        seatNumber: seat.seatNumber,
        status: seat.status,
        imageX: seat.imageX,
        imageY: seat.imageY,
      }
    });
  }
}

/**
 * 座席を追加
 * @param {Object} tx - トランザクション
 * @param {Array} insertSeats - 追加対象の座席データ配列
 */
async function insertSeats(tx, insertSeats) {
  if (insertSeats.length > 0) {
    await tx.m_SEAT.createMany({ data: insertSeats });
  }
}
