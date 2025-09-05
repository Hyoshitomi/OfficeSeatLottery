import { Check, X, Circle } from 'lucide-react';

// --- 定数定義 ---
const REQUIREMENT_DEFINITIONS = {
  length: '8文字以上',
  uppercase: '大文字を含む',
  lowercase: '小文字を含む',
  number: '数字を含む',
  special: '記号を含む (!?_$#)',
};

// --- 子コンポーネント ---

/**
 * タイトル: RequirementItem / 単一のパスワード要件表示
 * 要約: 1つのパスワード要件とその達成状況をアイコンとテキストで表示します。
 * @param {{
 *   label:    string,
 *   isValid:  boolean,
 *   color:    string,
 *   icon:     import('react').ReactElement
 * }} props
 * @returns {import('react').ReactElement}
 */
const RequirementItem = ({ label, isValid, color, icon }) => (
  <li className={`flex items-center text-sm ${color}`}>
    <div className="mr-2">{icon}</div>
    {label}
  </li>
);

// --- メインコンポーネント ---

/**
 * タイトル: PasswordRequirements / パスワード要件リスト
 * 要約: パスワードが満たすべき要件の一覧を、それぞれの達成状況と共に表示します。
 * @param {{
 *   requirements:        Record<string, boolean>,
 *   getRequirementColor: (isValid: boolean) => string,
 *   validationAttempted: boolean
 * }} props
 * @returns {import('react').ReactElement}
 */
export function PasswordRequirements({
  requirements,
  getRequirementColor,
  validationAttempted,
}) {
  /**
   * タイトル: getRequirementIcon / 要件達成状況に応じたアイコン取得
   * @param {boolean} isValid - 要件が満たされているか。
   * @returns {import('react').ReactElement}
   */
  const getRequirementIcon = (isValid) => {
    if (isValid) {
      return <Check className="h-4 w-4" />;
    }
    if (validationAttempted) {
      return <X className="h-4 w-4" />;
    }
    // 未入力、または入力中の状態
    return <Circle className="h-3 w-3" />;
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium">パスワード要件:</p>
      <ul className="space-y-1">
        {Object.entries(REQUIREMENT_DEFINITIONS).map(([key, label]) => {
          const isValid = !!requirements[key];
          return (
            <RequirementItem
              key={key}
              label={label}
              isValid={isValid}
              color={getRequirementColor(isValid)}
              icon={getRequirementIcon(isValid)}
            />
          );
        })}
      </ul>
    </div>
  );
}
