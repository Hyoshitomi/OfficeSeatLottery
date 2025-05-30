import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/account/password-input"
import { PasswordRequirements } from "@/components/account/password-requirements"
import { PasswordMatchIndicator } from "@/components/account/password-match-indicator"
import { usePasswordValidation } from "@/hooks/use-password-validation"

export function PasswordChangeCard({
  currentPassword,
  newPassword,
  confirmPassword,
  onChange,
  validationAttempted
}) {
  const { requirements, match, getRequirementColor } = usePasswordValidation(
    newPassword, 
    confirmPassword, 
    validationAttempted
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>パスワード変更</CardTitle>
        <CardDescription>セキュリティのため定期的にパスワードを変更してください</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">現在のパスワード</Label>
          <PasswordInput
            id="currentPassword"
            value={currentPassword}
            onChange={(value) => onChange("currentPassword", value)}
            placeholder="現在のパスワードを入力してください"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">新しいパスワード</Label>
          <PasswordInput
            id="newPassword"
            value={newPassword}
            onChange={(value) => onChange("newPassword", value)}
            placeholder="新しいパスワードを入力してください"
            restrictChars={true}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">確認用パスワード</Label>
          <PasswordInput
            id="confirmPassword"
            value={confirmPassword}
            onChange={(value) => onChange("confirmPassword", value)}
            placeholder="新しいパスワードを再入力してください"
            restrictChars={true}
          />
        </div>

        <PasswordRequirements 
          requirements={requirements}
          getRequirementColor={getRequirementColor}
          validationAttempted={validationAttempted}
        />

        <PasswordMatchIndicator 
          match={match}
          confirmPassword={confirmPassword}
        />
      </CardContent>
    </Card>
  )
}
