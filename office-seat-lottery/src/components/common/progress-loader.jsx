import { Progress } from "@/components/ui/progress"


export function ProgressLoader({ progress = 0 }) { // デフォルト値を設定
  const safeProgress = progress || 0 // undefined/nullの場合は0にする
  
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-2/3 max-w-md">
        <Progress value={safeProgress} className="h-4" />
        <div className="text-center mt-2 text-sm text-gray-500">
          {safeProgress < 100 ? `読み込み中... (${Math.floor(safeProgress)}%)` : "完了"}
        </div>
      </div>
    </div>
  )
}
