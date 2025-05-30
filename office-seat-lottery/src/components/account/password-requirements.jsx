import { Check, X } from "lucide-react"

export function PasswordRequirements({ 
  requirements, 
  getRequirementColor, 
  validationAttempted 
}) {
  const getRequirementIcon = (isValid) => {
    if (isValid) {
      return <Check className="h-4 w-4 text-green-500" />
    }
    if (validationAttempted && !isValid) {
      return <X className="h-4 w-4 text-red-500" />
    }
    return <div className="h-4 w-4" />
  }

  const requirementsList = [
    { key: 'length', label: '8文字以上' },
    { key: 'uppercase', label: '大文字を含む' },
    { key: 'lowercase', label: '小文字を含む' },
    { key: 'number', label: '数字を含む' },
    { key: 'special', label: '特殊文字を含む (!?_$#)' }
  ]

  return (
    <div className="text-sm bg-gray-50 p-4 rounded-md">
      <p className="font-medium mb-3 text-gray-700">パスワード要件:</p>
      <div className="space-y-2">
        {requirementsList.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-2">
            {getRequirementIcon(requirements[key])}
            <span className={getRequirementColor(requirements[key])}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
