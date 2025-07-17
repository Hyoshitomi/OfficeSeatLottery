import { Ticket } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ChangeButton({ 
  onChange, 
  isLoading, 
  disabled 
}) {
  return (
    <div className="pt-4">
      <Button
        onClick={onChange}
        className="w-full h-12 text-lg font-bold"
        disabled={isLoading || disabled}
      >
        {isLoading ? "交換中..." : "交換する"}
        <Ticket className="ml-2 h-5 w-5" />
      </Button>
    </div>
  )
}
