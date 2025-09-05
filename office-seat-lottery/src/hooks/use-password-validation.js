import { useMemo, useCallback } from 'react';

// --- 定数定義 ---

/**
 * パスワード要件を検証するための正規表現セット。
 * @type {{uppercase: RegExp, lowercase: RegExp, number: RegExp, special: RegExp}}
 */
const VALIDATION_REGEX = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[!?_$#]/,
};

// --- ヘルパー関数 ---

/**
 * タイトル: validatePasswordRequirements / パスワード要件の検証
 * 要約: パスワード文字列が定義された要件（長さ、大文字・小文字、数字、特殊文字）を満たしているかを判定します。
 * @param {string} password - 検証対象のパスワード文字列。
 * @returns {{length: boolean, uppercase: boolean, lowercase: boolean, number: boolean, special: boolean}} 各要件の検証結果を格納したオブジェクト。
 */
const validatePasswordRequirements = (password) => {
  const pw = password || '';
  return {
    length: pw.length >= 8,
    uppercase: VALIDATION_REGEX.uppercase.test(pw),
    lowercase: VALIDATION_REGEX.lowercase.test(pw),
    number: VALIDATION_REGEX.number.test(pw),
    special: VALIDATION_REGEX.special.test(pw),
  };
};

// --- カスタムフック ---

/**
 * タイトル: usePasswordValidation / パスワード検証ロジックフック
 * 要約: パスワードとその確認入力の検証状態、およびUI表示用のヘルパー関数を提供します。
 * @param {string} password - ユーザーが入力したパスワード。
 * @param {string} confirmPassword - ユーザーが入力した確認用パスワード。
 * @param {boolean} validationAttempted - フォーム送信が試みられたかなど、バリデーションを厳格に評価するかのフラグ。
 * @returns {{
 *   requirements: {length: boolean, uppercase: boolean, lowercase: boolean, number: boolean, special: boolean},
 *   allValid: boolean,
 *   match: boolean,
 *   getRequirementColor: (isValid: boolean) => string
 * }} パスワード要件、全要件の有効性、パスワードの一致、および要件表示用の色を返す関数を含むオブジェクト。
 */
export function usePasswordValidation(
  password,
  confirmPassword,
  validationAttempted,
) {
  const requirements = useMemo(
    () => validatePasswordRequirements(password),
    [password],
  );

  const allValid = useMemo(
    () => Object.values(requirements).every(Boolean),
    [requirements],
  );

  const match = useMemo(
    () => (password || '') === (confirmPassword || ''),
    [password, confirmPassword],
  );

  /**
   * タイトル: getRequirementColor / 要件表示用のCSSクラス取得
   * 要約: 要件の有効性とバリデーション試行状態に基づいて、Tailwind CSSの色クラス名を返します。
   * @param {boolean} isValid - 特定の要件が有効か無効か。
   * @returns {string} Tailwind CSSの色クラス名（'text-gray-500', 'text-red-500', 'text-green-500'）。
   */
  const getRequirementColor = useCallback(
    (isValid) => {
      // 未入力かつ未試行の初期状態
      if (!validationAttempted && !password) {
        return 'text-gray-500';
      }
      // 試行済みだが要件を満たしていない場合
      if (validationAttempted && !isValid) {
        return 'text-red-500';
      }
      // 要件を満たしている場合
      if (isValid) {
        return 'text-green-500';
      }
      // 上記以外（入力中だがまだ満たしていない状態）
      return 'text-gray-500';
    },
    [password, validationAttempted],
  );

  return { requirements, allValid, match, getRequirementColor };
}
