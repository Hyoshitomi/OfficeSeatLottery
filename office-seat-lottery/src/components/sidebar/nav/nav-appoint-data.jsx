import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function AppointDataInput() {
  return (
    <Card className="w-full shadow-sm border-0">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-sm font-medium text-gray-700">
          テーブルID（アルファベット）
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Textarea
            value = "A"
            placeholder="テーブルIDを入力"
            className="focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-500"
          />
        </div>
      </CardContent>
    </Card>
  )
}
