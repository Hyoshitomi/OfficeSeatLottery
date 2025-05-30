import { Check, X } from "lucide-react"

export function PasswordMatchIndicator({ match, confirmPassword }) {
  if (!confirmPassword) return null

  return (
    <div className="text-sm">
      {match ? (
        <div className="flex items-center gap-2 text-green-500">
          <Check className="h-4 w-4" />
          <span>パスワードが一致しています</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-red-500">
          <X className="h-4 w-4" />
          <span>パスワードが一致しません</span>
        </div>
      )}
    </div>
  )
}
