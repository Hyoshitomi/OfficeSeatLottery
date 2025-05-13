"use client"
import { useState } from "react"
import { SiteHeader } from '@/components/sidebar/site-header'
import { MultiSelect } from "@/components/multi-select"
import { Cat, Dog, Fish, Rabbit, Turtle, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


const employeeList = [
  { value: "10001", label: "山田太郎", icon: Turtle },
  { value: "10002", label: "佐藤花子", icon: Cat },
  { value: "10003", label: "鈴木一郎", icon: Dog },
  { value: "10004", label: "田中美咲", icon: Rabbit },
  { value: "10005", label: "伊藤健太", icon: Fish },
]

export default function Home() {
  const [selectedEmployees, setSelectedEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)

  // 抽選処理を実行する関数
  async function handleLottery() {
    if (selectedEmployees.length === 0) {
      alert("社員番号を選択してください")
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/lottery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeNumbers: selectedEmployees }),
      })

      const data = await res.json()

      if (res.ok) {
        setResult(`当選者: ${data.result}`)
      } else {
        alert(data.error || "抽選処理中にエラーが発生しました")
      }
    } catch (error) {
      console.error("抽選処理エラー:", error)
      alert("抽選処理中にエラーが発生しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader title="オフィス席抽選" />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">席抽選システム</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="employee-select" className="text-lg font-medium">
                社員番号選択
              </label>
              <MultiSelect
                id="employee-select"
                options={employeeList}
                onValueChange={setSelectedEmployees}
                defaultValue={[]}
                placeholder="社員番号を選択してください"
                variant="inverted"
                maxCount={5}
                className="w-full"
              />
            </div>

            <div className="pt-4">
              <Button
                onClick={handleLottery}
                className="w-full h-12 text-lg font-bold"
                disabled={isLoading || selectedEmployees.length === 0}
              >
                {isLoading ? "抽選中..." : "抽選する"}
                <Ticket className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {result && (
              <div className="mt-6 p-4 bg-muted rounded-lg text-center">
                <p className="font-bold text-xl">{result}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
