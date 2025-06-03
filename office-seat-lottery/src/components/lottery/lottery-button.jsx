import { Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LotteryButton({ 
  onLottery, 
  isLoading, 
  disabled 
}) {
  return (
    <div className="pt-4">
      <Button
        onClick={onLottery}
        className="w-full h-12 text-lg font-bold"
        disabled={isLoading || disabled}
      >
        {isLoading ? "抽選中..." : "抽選する"}
        <Ticket className="ml-2 h-5 w-5" />
      </Button>
    </div>
  )
}
