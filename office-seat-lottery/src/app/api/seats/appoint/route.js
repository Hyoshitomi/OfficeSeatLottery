import { NextResponse } from 'next/server';
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

/**
 * ユーティリティ関数群
 */
const Utils = {
  /**
   * 日付文字列またはDateオブジェクトからUTCの日付開始時刻を取得します。
   * @param {string | Date} dateInput - 日付を示す文字列またはDateオブジェクト。
   * @returns {Date} - UTCの日の開始時刻。
   */
  toStartOfUTCDay: (dateInput) => {
    // "YYYY-MM-DD"形式の文字列を直接パースする
    if (typeof dateInput === 'string' && dateInput.includes('-')) {
        const [year, month, day] = dateInput.split('-').map(Number);
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            return new Date(Date.UTC(year, month - 1, day));
        }
    }
    
    // 上記で処理できない場合 (ISO文字列など) はDateコンストラクタで処理
    const date = new Date(dateInput);

    if (isNaN(date.getTime())) {
      return new Date(NaN); // 不正な場合は無効なDateを返す
    }

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    
    return new Date(Date.UTC(year, month, day));
  },

  /**
   * 次の予約IDを取得します。
   * @returns {Promise<number>} - 次の利用可能なID。
   */
  getNextReservationId: async () => {
    const maxId = await prisma.m_SEAT_APPOINT.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true }
    });
    return (maxId?.id || 0) + 1;
  }
};

/**
 * バリデーション関数群
 */
const Validators = {
  /**
   * 選択された社員のバリデーションを行います。
   * @param {string[]} selectedEmployees - 選択された社員番号の配列。
   * @returns {{isValid: boolean, error?: string}} - バリデーション結果。
   */
  validateEmployees: (selectedEmployees) => {
    if (!selectedEmployees || selectedEmployees.length === 0) {
      return { isValid: false, error: '社員が選択されていません' };
    }
    return { isValid: true };
  },

  /**
   * 選択された座席のバリデーションを行います。
   * @param {number[]} selectedSeatIds - 選択された座席IDの配列。
   * @returns {{isValid: boolean, error?: string}} - バリデーション結果。
   */
  validateSeats: (selectedSeatIds) => {
    if (!selectedSeatIds || selectedSeatIds.length === 0) {
      return { isValid: false, error: '座席が選択されていません' };
    }
    return { isValid: true };
  },

  /**
   * 社員数と座席数の整合性をバリデーションします。
   * @param {string[]} selectedEmployees - 選択された社員番号の配列。
   * @param {number[]} selectedSeatIds - 選択された座席IDの配列。
   * @returns {{isValid: boolean, error?: string}} - バリデーション結果。
   */
  validateEmployeeAndSeatCount: (selectedEmployees, selectedSeatIds) => {
    const isValidEmployeeCount = selectedEmployees.length === 1 ||
                                 selectedEmployees.length === selectedSeatIds.length;

    if (!isValidEmployeeCount) {
      return {
        isValid: false,
        error: '社員数は1人または座席数と一致している必要があります'
      };
    }
    return { isValid: true };
  }
};

/**
 * ユーザー関連関数群
 */
const UserOperations = {
  /**
   * 社員番号からユーザーIDへのマッピングを取得します。
   * @param {string[]} employeeNumbers - 社員番号の配列。
   * @returns {Promise<{isValid: boolean, mapping?: object, error?: string}>} - マッピング結果。
   */
  getUserMapping: async (employeeNumbers) => {
    const users = await prisma.m_USER.findMany({
      where: {
        employeeNumber: { in: employeeNumbers },
        deleteFlag: false
      },
      select: {
        userId: true,
        employeeNumber: true
      }
    });

    const foundEmployeeNumbers = users.map(user => user.employeeNumber);
    const notFoundEmployees = employeeNumbers.filter(emp => !foundEmployeeNumbers.includes(emp));

    if (notFoundEmployees.length > 0) {
      return {
        isValid: false,
        error: `以下の社員番号が見つかりません: ${notFoundEmployees.join(', ')}`
      };
    }

    const employeeToUserIdMap = {};
    users.forEach(user => {
      employeeToUserIdMap[user.employeeNumber] = user.userId;
    });

    return { isValid: true, mapping: employeeToUserIdMap };
  }
};

/**
 * 予約データ生成関数群
 */
const ReservationDataBuilder = {
  /**
   * 指定された座席に対する予約データを作成します。
   * @param {number} seatId - 座席ID。
   * @param {string} userId - ユーザーID。
   * @param {object} reservationConfig - 予約設定。
   * @param {number} currentId - 現在の予約ID。
   * @returns {{data: object[], nextId: number}} - 生成された予約データと次のID。
   */
  createReservationsForSeat: (seatId, userId, reservationConfig, currentId) => {
    const { selectedDays, dateRange, targetDates, now } = reservationConfig;
    const data = [];

    if (selectedDays && selectedDays.length > 0) {
      for (const targetDateStr of targetDates) {
        const formattedDate = Utils.toStartOfUTCDay(targetDateStr);
        data.push({
          id: currentId++,
          appointId: reservationConfig.startId,
          seatId,
          userId,
          startDate: formattedDate,
          endDate: formattedDate,
          created: now,
          updated: null
        });
      }
    } else if (dateRange) {
      const formattedStartDate = Utils.toStartOfUTCDay(dateRange.from);
      const formattedEndDate = Utils.toStartOfUTCDay(dateRange.to || dateRange.from);
      data.push({
        id: currentId++,
        appointId: reservationConfig.startId,
        seatId,
        userId,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        created: now,
        updated: null
      });
    }

    return { data, nextId: currentId };
  },

  /**
   * 単一社員の予約データを作成します。
   * @param {string} employeeNumber - 社員番号。
   * @param {object} userMapping - 社員番号とユーザーIDのマッピング。
   * @param {number[]} selectedSeatIds - 選択された座席IDの配列。
   * @param {object} reservationConfig - 予約設定。
   * @returns {object[]} - 生成された予約データ。
   */
  createSingleEmployeeReservations: (employeeNumber, userMapping, selectedSeatIds, reservationConfig) => {
    const createData = [];
    const userId = userMapping[employeeNumber];
    let currentId = reservationConfig.startId;

    for (const seatId of selectedSeatIds) {
      const { data, nextId } = ReservationDataBuilder.createReservationsForSeat(seatId, userId, reservationConfig, currentId);
      createData.push(...data);
      currentId = nextId;
    }

    return createData;
  },

  /**
   * 複数社員の予約データを作成します。
   * @param {string[]} selectedEmployees - 選択された社員番号の配列。
   * @param {object} userMapping - 社員番号とユーザーIDのマッピング。
   * @param {number[]} selectedSeatIds - 選択された座席IDの配列。
   * @param {object} reservationConfig - 予約設定。
   * @returns {object[]} - 生成された予約データ。
   */
  createMultipleEmployeeReservations: (selectedEmployees, userMapping, selectedSeatIds, reservationConfig) => {
    const createData = [];
    let currentId = reservationConfig.startId;

    for (let i = 0; i < selectedEmployees.length; i++) {
      const employeeNumber = selectedEmployees[i];
      const userId = userMapping[employeeNumber];
      const seatId = selectedSeatIds[i];

      const { data, nextId } = ReservationDataBuilder.createReservationsForSeat(seatId, userId, reservationConfig, currentId);
      createData.push(...data);
      currentId = nextId;
    }

    return createData;
  }
};

/**
 * 予約重複チェック関数
 */
const ReservationChecker = {
  /**
   * 複数の予約データに対する重複チェックを一括で行います。
   * @param {object[]} createData - 新規作成する予約データの配列。
   * @returns {Promise<{isDuplicate: boolean, seatId?: number, date?: Date}>} - 重複チェック結果。
   */
  checkDuplicateReservationsBatch: async (createData) => {
    if (createData.length === 0) {
      return { isDuplicate: false };
    }

    const seatIds = [...new Set(createData.map(data => data.seatId))];
    const minDate = new Date(Math.min(...createData.map(data => data.startDate.getTime())));
    const maxDate = new Date(Math.max(...createData.map(data => data.endDate.getTime())));

    const existingReservations = await prisma.m_SEAT_APPOINT.findMany({
      where: {
        seatId: { in: seatIds },
        OR: [
          {
            startDate: { lte: maxDate },
            endDate: { gte: minDate }
          }
        ]
      },
      select: {
        seatId: true,
        startDate: true,
        endDate: true
      }
    });

    for (const newData of createData) {
      const conflict = existingReservations.find(existing =>
        existing.seatId === newData.seatId &&
        (newData.startDate.getTime() <= existing.endDate.getTime() && newData.endDate.getTime() >= existing.startDate.getTime())
      );

      if (conflict) {
        return {
          isDuplicate: true,
          seatId: newData.seatId,
          date: newData.startDate
        };
      }
    }

    return { isDuplicate: false };
  }
};

/**
 * 予約処理メインロジック
 */
const ReservationService = {
  /**
   * 予約を作成するメイン処理。
   * @param {object} requestBody - リクエストボディ。
   * @param {Date} now - 現在時刻。
   * @returns {Promise<object>} - 処理結果。
   */
  createReservations: async (requestBody, now) => {
    const { selectedEmployees, selectedDays, dateRange, selectedSeatIds, targetDates } = requestBody;

    // 1. バリデーション
    let validationResult = Validators.validateEmployees(selectedEmployees);
    if (!validationResult.isValid) return { status: 400, error: validationResult.error };

    validationResult = Validators.validateSeats(selectedSeatIds);
    if (!validationResult.isValid) return { status: 400, error: validationResult.error };

    // 2. ユーザーマッピング取得
    const userMappingResult = await UserOperations.getUserMapping(selectedEmployees);
    if (!userMappingResult.isValid) return { status: 400, error: userMappingResult.error };

    // 3. 社員数と座席数のチェック
    validationResult = Validators.validateEmployeeAndSeatCount(selectedEmployees, selectedSeatIds);
    if (!validationResult.isValid) return { status: 400, error: validationResult.error };

    // 4. ID生成
    const startId = await Utils.getNextReservationId();

    // 5. 予約設定オブジェクトの作成
    const reservationConfig = {
      selectedDays,
      dateRange,
      targetDates,
      startId,
      now
    };

    // 6. 登録データの準備
    let createData = [];
    if (selectedEmployees.length === 1) {
      createData = ReservationDataBuilder.createSingleEmployeeReservations(
        selectedEmployees[0],
        userMappingResult.mapping,
        selectedSeatIds,
        reservationConfig
      );
    } else {
      createData = ReservationDataBuilder.createMultipleEmployeeReservations(
        selectedEmployees,
        userMappingResult.mapping,
        selectedSeatIds,
        reservationConfig
      );
    }

    // 7. 重複チェック
    const duplicateCheck = await ReservationChecker.checkDuplicateReservationsBatch(createData);
    if (duplicateCheck.isDuplicate) {
      return {
        status: 400,
        error: `座席ID: ${duplicateCheck.seatId} の ${duplicateCheck.date.toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' })} は既に予約済みです`
      };
    }

    // 8. DB登録
    const result = await prisma.m_SEAT_APPOINT.createMany({
      data: createData,
      skipDuplicates: true
    });

    return {
      status: 200,
      success: true,
      result,
      appointId: startId,
      recordCount: createData.length
    };
  }
};

/**
 * Next.js API RouteのPOSTハンドラー
 * @param {object} request - Next.jsのリクエストオブジェクト。
 * @returns {Promise<NextResponse>} - レスポンスオブジェクト。
 */
export async function POST(request) {
  const utcNow = new Date();

  try {
    const body = await request.json();
    const result = await ReservationService.createReservations(body, utcNow);

    if (result.status === 200) {
      return NextResponse.json({
        success: result.success,
        result: result.result,
        appointId: result.appointId,
        recordCount: result.recordCount
      }, { status: 200 });
    } else {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

  } catch (error) {
    // サーバーサイドでの予期せぬエラーはログに残す
    console.error("API Route Error:", error); 
    return NextResponse.json({
      error: 'サーバーエラーが発生しました'
    }, { status: 500 });
  }
}
