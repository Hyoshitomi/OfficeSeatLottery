import { Progress } from "@/components/ui/progress"

export function ProgressLoader({ progress }) {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-2/3 max-w-md">
        <Progress value={progress} className="h-4" />
        <div className="text-center mt-2 text-sm text-gray-500">
          {progress < 100 ? `読み込み中... (${Math.floor(progress)}%)` : "完了"}
        </div>
      </div>
    </div>
  )
}
