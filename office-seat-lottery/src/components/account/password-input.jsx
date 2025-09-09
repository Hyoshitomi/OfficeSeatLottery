import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const VALID_PASSWORD_CHARS_REGEX = /^[a-zA-Z0-9!?_$#]*$/;

/**
 * タイトル: PasswordInput / パスワード入力コンポーネント
 * 要約: パスワードの表示/非表示切り替え機能と、オプションの文字種制限機能を持つ入力フィールドです。
 * @param {{
 *   id:            string,
 *   value:         string,
 *   onChange:      (value: string) => void,
 *   placeholder:   string,
 *   restrictChars?: boolean
 * }} props
 * @param {string} props.id - input要素のid属性。
 * @param {string} props.value - 入力値。
 * @param {(value: string) => void} props.onChange - 値が変更されたときに呼び出されるコールバック。
 * @param {string} props.placeholder - プレースホルダーテキスト。
 * @param {boolean} [props.restrictChars=false] - パスワードに使用可能な文字を制限するかどうかのフラグ。
 * @returns {import('react').ReactElement} パスワード入力フィールドのJSX要素。
 */
export function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  restrictChars = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  /**
   * タイトル: handleInputChange / 入力変更ハンドラ
   * 要約: 入力値が変更された際に、文字種制限を考慮して親コンポーネントのonChangeを呼び出します。
   * @param {import('react').ChangeEvent<HTMLInputElement>} e - DOMのchangeイベント。
   */
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (restrictChars && !VALID_PASSWORD_CHARS_REGEX.test(newValue)) {
      return; // 許可されていない文字が含まれている場合は更新しない
    }
    onChange(newValue);
  };

  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="pr-10" // アイコンのスペースを確保
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? 'パスワードを非表示' : 'パスワードを表示'}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
