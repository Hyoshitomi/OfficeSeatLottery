import { useMemo } from "react"

export function usePasswordValidation(password, confirmPassword, validationAttempted) {
  const requirements = useMemo(() => ({
    length: (password || '').length >= 8,
    uppercase: /[A-Z]/.test(password || ''),
    lowercase: /[a-z]/.test(password || ''),
    number: /[0-9]/.test(password || ''),
    special: /[!?_$#]/.test(password || ''),
  }), [password])

  const allValid = useMemo(() => 
    Object.values(requirements).every(Boolean), 
    [requirements]
  )

  const match = useMemo(() => 
    (password || '') === (confirmPassword || ''), 
    [password, confirmPassword]
  )

  const getRequirementColor = (isValid) => {
    if (!validationAttempted && !(password || '')) {
      return "text-gray-500"
    }
    if (validationAttempted && !isValid) {
      return "text-red-500"
    }
    if (isValid) {
      return "text-green-500"
    }
    return "text-gray-500"
  }

  return { requirements, allValid, match, getRequirementColor }
}
