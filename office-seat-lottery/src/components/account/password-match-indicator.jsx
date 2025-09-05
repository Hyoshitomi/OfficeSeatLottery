import { Check, X } from 'lucide-react';

/**
 * タイトル: PasswordMatchIndicator / パスワード一致インジケーター
 * 要約: 2つのパスワード入力が一致しているかどうかに応じて、アイコン（チェックまたはバツ）を表示します。
 * 補足: 確認用パスワードが未入力の場合は何も表示しません。表示/非表示アイコンと重ならないよう、右端から少しずらして配置されます。
 * @param {{
 *   match:            boolean,
 *   confirmPassword:  string
 * }} props
 * @param {boolean} props.match - パスワードが一致しているかどうかの真偽値。
 * @param {string} props.confirmPassword - 確認用パスワードの入力値。
 * @returns {import('react').ReactElement | null} 一致状態を示すアイコン、またはnull。
 */
export function PasswordMatchIndicator({ match, confirmPassword }) {
  // 確認用パスワードが入力されていない場合は何も表示しない
  if (!confirmPassword) {
    return null;
  }

  return (
    // Eyeアイコンと重ならないよう、右からの位置を調整 (right-3 -> right-12)
    <div className="absolute right-12 top-1/2 -translate-y-1/2">
      {match ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-red-500" />
      )}
    </div>
  );
}
