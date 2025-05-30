import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

export function PasswordInput({ 
  id, 
  value, 
  onChange, 
  placeholder, 
  restrictChars = false 
}) {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    if (restrictChars) {
      const validChars = /^[a-zA-Z0-9!?_$#]*$/
      if (validChars.test(e.target.value) || e.target.value === "") {
        onChange(e.target.value)
      }
    } else {
      onChange(e.target.value)
    }
  }

  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  )
}
