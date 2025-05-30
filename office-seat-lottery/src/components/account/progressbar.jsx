import { Progress } from "@/components/ui/progress"

export function ProgressBar({ isLoading, progress }) {
  if (!isLoading) return null

  return (
    <div className="mb-6">
      <Progress value={progress} className="h-3" />
      <div className="text-center mt-2 text-sm text-gray-500">
        {progress < 100 ? `処理中... (${Math.floor(progress)}%)` : "完了"}
      </div>
    </div>
  )
}
