import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

/**
 * タイトル: DateSelector / 日付選択カードコンポーネント
 * 要約: カレンダーからの日付選択、今日へのリセット、確定アクションを提供するUIコンポーネントです。
 * @param {{
 *   selectedDate: Date,
 *   onDateSelect: (date: Date) => void,
 *   onToday:      () => void,
 *   onConfirm:    () => void
 * }} props
 * @param {Date} props.selectedDate - 現在選択されている日付。
 * @param {(date: Date) => void} props.onDateSelect - カレンダーで日付が選択されたときに呼び出されるコールバック。
 * @param {() => void} props.onToday - 「今日に戻す」ボタンがクリックされたときに呼び出されるコールバック。
 * @param {() => void} props.onConfirm - 「この日付で確定」ボタンがクリックされたときに呼び出されるコールバック。
 * @returns {import('react').ReactElement} 日付選択カードのJSX要素。
 */
export function DateSelector({
  selectedDate,
  onDateSelect,
  onToday,
  onConfirm,
}) {
  return (
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
                      'w-full justify-start text-left font-normal',
                      !selectedDate && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, 'yyyy/MM/dd')
                    ) : (
                      <span>日付を選択</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={onDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onToday}>
            今日
          </Button>
          <Button onClick={onConfirm}>作成</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
