"use client"

import { useState } from "react"
import { ja } from "date-fns/locale"
import { useSession } from "next-auth/react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useEmployees } from "@/hooks/use-employees"
import { MultiSelect } from "@/components/ui/multi-select"

export default function ReservationTabs({ selectedSeatIds = [], onBack }) {
  const { data: session } = useSession()
  const user = session?.user
  
  // 曜日予約の状態
  const [selectedDays, setSelectedDays] = useState([])

  // 日付予約の状態
  const [dateRange, setDateRange] = useState()

  const weekdays = [
    { id: "monday", label: "月", value: "monday" },
    { id: "tuesday", label: "火", value: "tuesday" },
    { id: "wednesday", label: "水", value: "wednesday" },
    { id: "thursday", label: "木", value: "thursday" },
    { id: "friday", label: "金", value: "friday" },
  ]

  const { 
    employeeList, 
    selectedEmployees, 
    setSelectedEmployees, 
  } = useEmployees(user)

  // 選択可能な社員数の制限（1人または選択座席数）
  const maxSelectableEmployees = selectedSeatIds.length > 0 ? selectedSeatIds.length : 1

  const handleEmployeeSelectionChange = (newSelection) => {
    if (newSelection.length <= maxSelectableEmployees) {
      setSelectedEmployees(newSelection)
    }
  }

  const handleDayChange = (dayValue, checked) => {
    if (checked) {
      setSelectedDays([...selectedDays, dayValue])
    } else {
      setSelectedDays(selectedDays.filter((day) => day !== dayValue))
    }
  }

   // エラー状態を追加
   const [reservationError, setReservationError] = useState(null)

  // 曜日予約のバリデーション
  const isWeeklyFormValid = selectedEmployees.length > 0 && selectedDays.length > 0
  
  // 日付予約のバリデーション（単日または期間選択）
  const isDateFormValid = selectedEmployees.length > 0 && dateRange && (
    (dateRange.from && !dateRange.to) || // 単日選択
    (dateRange.from && dateRange.to)     // 期間選択
  )

  // handleWeeklyReservation関数の修正
const handleWeeklyReservation = async () => {
    try {
      setReservationError(null) // エラーをリセット
      
      const response = await fetch('/api/seats/appoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedEmployees,
          selectedDays,
          selectedSeatIds
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert('曜日予約が正常に登録されました');
        // 必要に応じて画面遷移やリセット処理
      } else {
        setReservationError(result.error) // エラーを設定
        alert(`エラー: ${result.error}`);
      }
    } catch (_error) {
      setReservationError('予約登録中にエラーが発生しました')
      alert('予約登録中にエラーが発生しました');
    }
  };

  // handleDateReservation関数の修正
  const handleDateReservation = async () => {
    try {
      setReservationError(null) // エラーをリセット
      
      const response = await fetch('/api/seats/appoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedEmployees,
          dateRange,
          selectedSeatIds
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert('日付予約が正常に登録されました');
        // 必要に応じて画面遷移やリセット処理
      } else {
        setReservationError(result.error) // エラーを設定
        alert(`エラー: ${result.error}`);
      }
    } catch (_error) {
      setReservationError('予約登録中にエラーが発生しました')
      alert('予約登録中にエラーが発生しました');
    }
  };

  // 登録済み予約確認機能
  const handleCheckReservations = () => {
    // 予約一覧画面への遷移またはモーダル表示
    // 実装方法は要件に応じて調整
    console.log("登録済み予約の確認");
  };


  // 日付表示用のヘルパー関数
  const formatDateRange = (range) => {
    if (!range || !range.from) return ""
    if (!range.to || range.from.getTime() === range.to.getTime()) {
      // 単日選択
      return range.from.toLocaleDateString("ja-JP")
    } else {
      // 期間選択
      return `${range.from.toLocaleDateString("ja-JP")} 〜 ${range.to.toLocaleDateString("ja-JP")}`
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>予約システム</CardTitle>
          <CardDescription>
            選択座席数: {selectedSeatIds.length}席 | 選択可能社員数: 最大{maxSelectableEmployees}人
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="reserver">
                予約者名 ({selectedEmployees.length}/{maxSelectableEmployees}人選択中)
              </Label>
              <MultiSelect
                id="employee-select"
                options={employeeList}
                onValueChange={handleEmployeeSelectionChange}
                defaultValue={[]}
                placeholder="社員名を選択してください"
                variant="inverted"
                maxCount={maxSelectableEmployees}
                maxSelections={maxSelectableEmployees}
                className="w-full"
              />
            </div>
          </div>

          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weekly">曜日予約</TabsTrigger>
              <TabsTrigger value="date">日付予約</TabsTrigger>
            </TabsList>

            <TabsContent value="weekly" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>曜日（毎週）</Label>
                  <div className="flex flex-wrap gap-4">
                    {weekdays.map((day) => (
                      <div key={day.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={day.id}
                          checked={selectedDays.includes(day.value)}
                          onCheckedChange={(checked) => handleDayChange(day.value, checked)}
                        />
                        <Label
                          htmlFor={day.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {day.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {isWeeklyFormValid && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">
                      <strong>選択内容:</strong> 毎週 {selectedDays.map((day) => weekdays.find((w) => w.value === day)?.label).join("、")}曜日
                    </p>
                    <p className="text-sm">
                      <strong>座席数:</strong> {selectedSeatIds.length}席
                    </p>
                  </div>
                )}

                <div className="pt-4 space-y-2">
                  {/* エラーがある場合のみボタンを表示 - 横幅一杯 */}
                  {reservationError && reservationError.includes('既に予約済み') && (
                    <Button
                      onClick={handleCheckReservations}
                      variant="destructive"
                      className="w-full"
                    >
                      登録済み予約の確認
                    </Button>
                  )}
                  <div className="flex gap-2">
                    <Button
                      onClick={onBack}
                      variant="outline"
                      className="flex-1"
                    >
                      座席選択に戻る
                    </Button>
                    <Button
                      onClick={handleWeeklyReservation}
                      disabled={!isWeeklyFormValid}
                      className="flex-1"
                    >
                      曜日予約を確定 
                    </Button>

                  </div>
                </div>

              </div>
            </TabsContent>

            <TabsContent value="date" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>日付を選択（単日または期間選択可能）</Label>
                  <div className="flex justify-center">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      locale={ja}
                      numberOfMonths={2}
                      className="rounded-md border"
                    />
                  </div>
                </div>

                {isDateFormValid && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">
                      <strong>選択期間:</strong> {formatDateRange(dateRange)}
                    </p>
                    <p className="text-sm">
                      <strong>座席数:</strong> {selectedSeatIds.length}席
                    </p>
                  </div>
                )}

                <div className="pt-4 space-y-2">
                  {reservationError && reservationError.includes('既に予約済み') && (
                    <Button
                      onClick={handleCheckReservations}
                      variant="destructive"
                      className="w-full"
                    >
                      登録済み予約の確認
                    </Button>
                  )}
                  <div className="flex gap-2">
                    <Button
                      onClick={onBack}
                      variant="outline"
                      className="flex-1"
                    >
                      座席選択に戻る
                    </Button>
                    <Button
                      onClick={handleDateReservation} 
                      disabled={!isDateFormValid} 
                      className="flex-1"
                    >
                      日付予約を確定 
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
