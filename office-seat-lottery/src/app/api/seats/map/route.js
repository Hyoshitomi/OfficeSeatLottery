import { NextResponse } from 'next/server'
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// 定数定義
const SEAT_STATUS = {
  ACTIVE: 1,
  FIXED: 2,
  FLOWING: 1,
  RESERVED: 4,
  MAINTENANCE: 4
};

const DEFAULT_USER_NAME = '(名前未設定)';
const MAX_DATE = new Date('9999-12-31');

export async function GET(request) {
  try {
    const dateStr = extractDateFromRequest(request);
    const targetDay = parseAndValidateDate(dateStr);
    const allSeats = await fetchSeatsWithRelations(targetDay);
    const seats = processSeats(allSeats, targetDay);

    return NextResponse.json(seats, { status: 200 });
  } catch (_error) {
    return handleError(error);
  }
}

/**
 * リクエストから日付パラメータを抽出
 * @param {Request} request - HTTPリクエスト
 * @returns {string} 日付文字列
 */
function extractDateFromRequest(request) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date');

  if (!dateStr) {
    throw new Error('dateパラメータが必要です (例: ?date=2025-06-01)');
  }

  return dateStr;
}

/**
 * 日付文字列を解析・検証してUTC日付を返す
 * @param {string} dateStr - 日付文字列
 * @returns {Date} UTC日付オブジェクト
 */
function parseAndValidateDate(dateStr) {
  const date = new Date(dateStr);
  
  if (isNaN(date.getTime())) {
    throw new Error('dateパラメータが不正です');
  }

  // 00:00:00に揃える
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

/**
 * 座席データとリレーションを取得
 * @param {Date} targetDay - 対象日
 * @returns {Promise<Array>} 座席データ配列
 */
async function fetchSeatsWithRelations(targetDay) {
  return await prisma.m_SEAT.findMany({
    where: {
      status: { in: [SEAT_STATUS.ACTIVE, SEAT_STATUS.MAINTENANCE] }
    },
    include: {
      seatAppointments: {
        where: {
          startDate: { lte: targetDay },
          endDate: { gte: targetDay }
        },
        include: {
          user: true
        }
      },
      seatPositions: {
        where: {
          date: targetDay
        },
        include: {
          user: true
        }
      }
    }
  });
}

/**
 * 座席データを処理してレスポンス用の配列を作成
 * @param {Array} allSeats - 全座席データ
 * @returns {Array} 処理済み座席データ配列
 */
function processSeats(allSeats) {
  const seats = [];

  for (const seat of allSeats) {
    const seatData = processSingleSeat(seat);
    
    if (seatData) {
      seats.push(seatData);
    }
  }

  return seats;
}

/**
 * 単一の座席データを処理
 * @param {Object} seat - 座席データ
 * @returns {Object|null} 処理済み座席データまたはnull
 */
function processSingleSeat(seat) {
  // 予約データがある場合
  if (seat.seatAppointments.length > 0) {
    return processAppointmentSeat(seat);
  }

  // 流動席の場合
  return processFlowingSeat(seat);
}

/**
 * 予約がある座席を処理
 * @param {Object} seat - 座席データ
 * @returns {Object} 処理済み座席データ
 */
function processAppointmentSeat(seat) {
  const appointment = seat.seatAppointments[0];
  const endDate = new Date(appointment.endDate);
  
  const status = isFixedAppointment(endDate) ? SEAT_STATUS.FIXED : SEAT_STATUS.RESERVED;
  const userName = getUserName(appointment.user);

  return {
    seatId: seat.seatId,
    name: userName,
    status,
    imageX: seat.imageX,
    imageY: seat.imageY,
  };
}

/**
 * 流動席を処理
 * @param {Object} seat - 座席データ
 * @returns {Object|null} 処理済み座席データまたはnull
 */
function processFlowingSeat(seat) {
  // 該当日のポジションデータがない場合はスキップ
  if (seat.seatPositions.length === 0) {
    return null;
  }

  const position = seat.seatPositions[0];
  const userName = getUserName(position.user);

  return {
    seatId: seat.seatId,
    name: userName,
    status: SEAT_STATUS.FLOWING,
    imageX: seat.imageX,
    imageY: seat.imageY,
  };
}

/**
 * 固定予約かどうかを判定
 * @param {Date} endDate - 終了日
 * @returns {boolean} 固定予約の場合true
 */
function isFixedAppointment(endDate) {
  return endDate.getTime() === MAX_DATE.getTime();
}

/**
 * ユーザー名を取得（優先順位: showName > lastName > デフォルト）
 * @param {Object} user - ユーザーデータ
 * @returns {string} ユーザー名
 */
function getUserName(user) {
  return user?.showName || user?.lastName || DEFAULT_USER_NAME;
}

/**
 * エラーハンドリング
 * @param {Error|unknown} error - エラーオブジェクト
 * @returns {NextResponse} エラーレスポンス
 */
function handleError(error) {
  const message = error instanceof Error ? error.message : String(error);
  const status = message.includes('パラメータ') ? 400 : 500;
  
  return NextResponse.json({ error: message }, { status });
}


export async function DELETE(request) {
  try {
    const { seatId } = await request.json();
    if (!seatId) {
      return NextResponse.json({ error: 'seatId is required' }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.t_SEAT_POSITION.deleteMany({ where: { seatId } });
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}