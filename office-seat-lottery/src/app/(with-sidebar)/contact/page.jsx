'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SiteHeader } from '@/components/sidebar/site-header'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/form/form-input'
import { toast } from "sonner" // 追加

const FormSchema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式が正しくありません' }),
  password: z
    .string()
    .min(8, { message: 'パスワードは8文字以上で入力してください' })
    .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, {
      message: '数字・小文字・大文字をそれぞれ1文字以上含めてください',
    }),
  request: z.string().optional(),
})

export default function Home() {
  const form = useForm({
    defaultValues: {
      email: '',
      name: '',
      employeeNumber: '',
      request: '',
      inquiryType: '',
    },
    resolver: zodResolver(FormSchema),
  })

  // 送信処理
  const onSubmit = form.handleSubmit(
    async (data) => {
      try {
        // ここでAPI送信処理など
        // await fetch(...)

        toast.success('送信が完了しました。')
        form.reset()
      } catch (error) {
        toast.error('送信に失敗しました。もう一度お試しください。')
      }
    },
    (errors) => {
      // バリデーションエラー時
      const firstError = Object.values(errors)[0]
      if (firstError && firstError.message) {
        toast.error(firstError.message )
      } else {
        toast.error('入力内容をご確認ください。')
      }
    }
  )

  const inquiryType = form.watch('inquiryType')

  return (
    <>
      <SiteHeader title="問い合わせ" />
      <main className="flex-1 overflow-auto p-4 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md">
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 gap-4 mt-6"
            >
              <FormInput
                control={form.control}
                name="email"
                label="メールアドレス"
                placeholder="メールアドレスを入力してください"
              />
              <FormInput
                control={form.control}
                name="name"
                label="名前"
                placeholder="お名前を入力してください"
              />
              <FormInput
                control={form.control}
                name="employeeNumber"
                label="社員番号"
                placeholder="社員番号を入力してください"
              />
              <div className="grid grid-cols-1 gap-2">
                <label className="text-sm font-medium">問い合わせ種類</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="passwordReset"
                      value="passwordReset"
                      {...form.register('inquiryType')}
                      className="mr-1"
                    />
                    <label htmlFor="passwordReset" className="text-sm">
                      パスワードリセット
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="other"
                      value="other"
                      {...form.register('inquiryType')}
                      className="mr-1"
                    />
                    <label htmlFor="other" className="text-sm">
                      その他
                    </label>
                  </div>
                </div>
              </div>

              {inquiryType === 'other' && (
                <FormInput
                  control={form.control}
                  name="request"
                  label="問い合わせ内容"
                  type="text"
                  placeholder=""
                />
              )}

              <Button type="submit">送信</Button>
            </form>
          </Form>
        </div>
      </main>
    </>
  )
}
