'use client'

import { useState, useRef, useEffect } from 'react'
import { SiteHeader } from '@/components/sidebar/site-header'
import SidebarRight from '@/components/sidebar/right-sidebar-img'
import SeatCanvas from '@/components/seat/SeatCanvas'
import { Progress } from "@/components/ui/progress"
import { useSession } from "next-auth/react";
import { toast } from "sonner" // 追加
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function Page() {
  const [previewImage, setPreviewImage] = useState('/sheet/座席表.png')
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 })
  const [boxes, setBoxes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0) 
  const fileInputRef = useRef(null)
  const { data: session } = useSession();
  const user = session?.user;
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showSeatMap, setShowSeatMap] = useState(false)

  // 疑似プログレスバー
  useEffect(() => {
    if (!isLoading) {
      setProgress(100)
      return
    }
    setProgress(0)
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev < 95) return Math.min(prev + Math.random() * 5, 95)
        return prev
      })
    }, 100)
    return () => clearInterval(timer)
  }, [isLoading])

  const fetchSeats = async (dateToFetch) => {
    setIsLoading(true)
    try {
      // 選択された日付をYYYY-MM-DD形式で取得
      const yyyy = dateToFetch.getFullYear()
      const mm = String(dateToFetch.getMonth() + 1).padStart(2, "0")
      const dd = String(dateToFetch.getDate()).padStart(2, "0")
      const dateStr = `${yyyy}-${mm}-${dd}`

      // 日付をクエリパラメータで渡す
      const res = await fetch(`/api/seats/map?date=${dateStr}`)
      if (res.ok) {
        const seats = await res.json()
        setBoxes(
          seats.map((seat) => ({
            id: seat.seatId,
            name: seat.name ?? "",
            status:
              seat.status === 1
                ? "movable"
                : seat.status === 2
                  ? "fixed"
                  : seat.status === 3
                    ? "unused"
                    : seat.status === 4
                      ? "reserved"
                      : "movable",
            x: seat.imageX ?? 0,
            y: seat.imageY ?? 0,
          })),
        )
      } else {
        setBoxes([])
      }
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
      }, 400)
    } catch (e) {
      setBoxes([])
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
      }, 400)
    }
  }

  const handleCreateClick = () => {
    setShowSeatMap(true)
    fetchSeats(selectedDate)
  }

  const handleImgLoad = e => {
    setImgSize({
      width: e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight,
    })
  }

  const handleStop = (id, x, y) =>
    setBoxes(prev => prev.map(b => b.id === id ? { ...b, x, y } : b))
  
  const handleExit = async (seatId) => {
    setBoxes(prev => prev.filter(b => b.id !== seatId))
    const res = await fetch('/api/seats/map', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatId }),
    });
    if (res.ok) {
      toast.success('席を解放しました') // 変更
      // 状態更新など
    } else {
      toast.error('解放に失敗しました') // 変更
    }
  }

  const getAbsoluteUrl = (url) => {
    if (/^https?:\/\//.test(url)) return url
    // サーバー側で動く場合はprocess.env.NEXT_PUBLIC_BASE_URLなどを使う
    return window.location.origin + url
  }

  const handleMakeImage = async () => {
    setIsLoading(true); // プログレスバー開始
    setProgress(0);
    try {
      const bgURL = encodeURI(getAbsoluteUrl(previewImage))
      const res = await fetch('/api/seats/imgPng', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bg: bgURL,
          boxes: boxes
        })
      })
      if (!res.ok) {
        const errorText = await res.text()
        toast.error('画像生成に失敗しました: ' + errorText)
        setProgress(100)
        setTimeout(() => setIsLoading(false), 400)
        return
      }
      const blob = await res.blob()
      const urlObj = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = urlObj
      a.download = `${format(selectedDate, "yyyy年MM月dd日")}座席図.png`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(urlObj)
      toast.success('PNG画像をダウンロードしました')
      setProgress(100)
      setTimeout(() => setIsLoading(false), 400)
    } catch (e) {
      toast.error('画像生成に失敗しました: ' + e.message)
      setProgress(100)
      setTimeout(() => setIsLoading(false), 400)
    }
  }
  
    
  const handleBackToDateSelection = () => {
    setShowSeatMap(false)
  }

  if (!user?.adminFlag) {
    return (
      <>
        <SiteHeader title="座席図編集"/>
        <main className="flex-1 overflow-auto p-4">
          <div>
            <p>ここは管理者のみ閲覧可能なページです。</p>
          </div>
        </main>
      </>
    )
  }
  return (
    <>
      <SiteHeader title={`${format(selectedDate, "yyyy年MM月dd日")}の座席図`} />
      <div className="flex flex-row h-[calc(100vh-56px)]">
        {!showSeatMap ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>日付を選択</CardTitle>
                <CardDescription>座席図を表示する日付を選択してください</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex flex-col space-y-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "yyyy年MM月dd日") : "日付を選択"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedDate(new Date())}>
                  今日
                </Button>
                <Button onClick={handleCreateClick}>作成</Button>
              </CardFooter>
            </Card>
          </div>
        ) : isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center h-full w-full">
              <div className="w-2/3 max-w-md">
                <Progress value={progress} className="h-4" />
                <div className="text-center mt-2 text-sm text-gray-500">
                  {progress < 100 ? `読み込み中... (${Math.floor(progress)}%)` : "完了"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 flex flex-col items-center justify-center">
              <SeatCanvas
                src={previewImage}
                imgSize={imgSize}
                boxes={boxes}
                onImgLoad={handleImgLoad}
                onDragStop={handleStop}
                onExit={handleExit}
                move={false}
              />
            </div>
            <SidebarRight
              fileInputRef={fileInputRef}
              onMakeImg={handleMakeImage}
              onReDateSelect={handleBackToDateSelection}
            />
          </>
        )}
      </div>
    </> )
}
