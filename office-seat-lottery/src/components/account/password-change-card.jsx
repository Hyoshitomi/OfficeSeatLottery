import { PasswordInput } from '@/components/account/password-input';
import { PasswordMatchIndicator } from '@/components/account/password-match-indicator';
import { PasswordRequirements } from '@/components/account/password-requirements';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { usePasswordValidation } from '@/hooks/use-password-validation';

/**
 * タイトル: PasswordChangeCard / パスワード変更フォームUI
 * 要約: パスワード変更に必要な入力フィールドとバリデーション結果を表示するカードコンポーネントです。
 * @param {{
 *   currentPassword:       string,
 *   newPassword:           string,
 *   confirmPassword:       string,
 *   onChange:              (key: string, value: string) => void,
 *   validationAttempted: boolean
 * }} props
 * @param {string} props.currentPassword - 現在のパスワードの入力値。
 * @param {string} props.newPassword - 新しいパスワードの入力値。
 * @param {string} props.confirmPassword - 確認用パスワードの入力値。
 * @param {(key: 'currentPassword' | 'newPassword' | 'confirmPassword', value: string) => void} props.onChange - 入力値が変更されたときに呼び出されるコールバック関数。
 * @param {boolean} props.validationAttempted - フォームの送信が試みられたかどうかのフラグ。
 * @returns {import('react').ReactElement} パスワード変更カードのJSX要素。
 */
export function PasswordChangeCard({
  currentPassword,
  newPassword,
  confirmPassword,
  onChange,
  validationAttempted,
}) {
  const { requirements, match, getRequirementColor } = usePasswordValidation(
    newPassword,
    confirmPassword,
    validationAttempted,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>パスワード変更</CardTitle>
        <CardDescription>
          セキュリティのため定期的にパスワードを変更してください
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="current-password">現在のパスワード</Label>
          <PasswordInput
            id="current-password"
            value={currentPassword}
            onChange={(value) => onChange('currentPassword', value)}
            placeholder="現在のパスワードを入力してください"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="new-password">新しいパスワード</Label>
          <PasswordInput
            id="new-password"
            value={newPassword}
            onChange={(value) => onChange('newPassword', value)}
            placeholder="新しいパスワードを入力してください"
            restrictChars
          />
        </div>

        <PasswordRequirements
          requirements={requirements}
          getRequirementColor={getRequirementColor}
        />

        <div className="space-y-2">
          <Label htmlFor="confirm-password">確認用パスワード</Label>
          <div className="relative">
            <PasswordInput
              id="confirm-password"
              value={confirmPassword}
              onChange={(value) => onChange('confirmPassword', value)}
              placeholder="新しいパスワードを再入力してください"
              restrictChars
            />
            <PasswordMatchIndicator
              match={match}
              confirmPassword={confirmPassword}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
