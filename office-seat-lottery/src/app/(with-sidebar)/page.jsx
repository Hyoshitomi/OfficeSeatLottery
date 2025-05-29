"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/sidebar/site-header"
import { MultiSelect } from "@/components/multi-select"
import { Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useSession } from "next-auth/react";
import { toast } from "sonner" // 追加

export default function Home() {
  const [employeeList, setEmployeeList] = useState([])
  const [selectedEmployees, setSelectedEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)
  const { data: session } = useSession();
  const user = session?.user;

  // 疑似プログレスバー
  useEffect(() => {
    if (!isLoading) {
      setProgress(100)
      return
    }
    setProgress(0)
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 95) return Math.min(prev + Math.random() * 5, 95)
        return prev
      })
    }, 100)
    return () => clearInterval(timer)
  }, [isLoading])

  // APIから社員リストを取得（管理者の場合のみ）
  useEffect(() => {
    if (!user?.adminFlag) {
      setSelectedEmployees([user?.employeeNumber])
    }

    if (user?.adminFlag) {
      fetch("/api/user")
        .then((res) => res.json())
        .then((data) => setEmployeeList(data))
        .catch((e) => {
          toast.error("社員リストの取得に失敗しました") // 変更
          setEmployeeList([])
        })
    }
  }, [user])

  // 抽選処理を実行する関数
  async function handleLottery() {
    if (selectedEmployees.length === 0) {
      toast.error("社員を選択してください") // 変更
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
        setResult(
          <>
            抽選が終了しました。
            <br />
            座席表タブから結果を確認してください。
          </>
        )
        toast.success("抽選が完了しました！") // 追加
      } else {
        toast.error(data.error || "抽選処理中にエラーが発生しました") // 変更
      }
    } catch (error) {
      console.error("抽選処理エラー:", error)
      toast.error("抽選処理中にエラーが発生しました") // 変更
    } finally {
      setProgress(100)
      setTimeout(() => setIsLoading(false), 400) // 100%を一瞬見せてから解除
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
            {/* 管理者の場合のみ社員選択を表示 */}
            {user?.adminFlag && (
              <div className="space-y-2">
                <label htmlFor="employee-select" className="text-lg font-medium">
                  社員名
                </label>
                <MultiSelect
                  id="employee-select"
                  options={employeeList}
                  onValueChange={setSelectedEmployees}
                  defaultValue={[]}
                  placeholder="社員名を選択してください"
                  variant="inverted"
                  maxCount={5}
                  className="w-full"
                />
              </div>
            )}

            {/* 非管理者の場合の説明文 */}
            {!user?.adminFlag && (
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-lg font-medium">あなたの席を抽選します</p>
                <p className="text-sm text-muted-foreground mt-1">抽選ボタンを押して席を決定してください</p>
              </div>
            )}

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

            {/* 抽選中のプログレスバーとメッセージ */}
            {isLoading && (
              <div className="mt-6">
                <Progress value={progress} className="h-4" />
                <div className="text-center mt-2 text-sm text-gray-500">
                  {progress < 100 ? `抽選処理中... (${Math.floor(progress)}%)` : "完了"}
                </div>
              </div>
            )}

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
