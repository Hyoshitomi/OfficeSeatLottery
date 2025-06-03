import React, { useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input"
import { FormRadioGroup } from "@/components/form/form-radio"

const InquirySchema = z.object({
  email: z.string().email({ message: "メールアドレスの形式が正しくありません" }),
  name: z.string().min(1, { message: "名前を入力してください" }),
  employeeNumber: z.string().min(1, { message: "社員番号を入力してください" }),
  inquiryType: z.enum(["passwordReset", "other"], { required_error: "問い合わせ種類を選択してください" }),
  request: z.string().optional(),
})

const fieldDefs = [
  {
    name: "email",
    label: "メールアドレス",
    placeholder: "メールアドレスを入力してください",
    type: "text",
    required: true,
  },
  {
    name: "name",
    label: "名前",
    placeholder: "お名前を入力してください",
    type: "text",
    required: true,
  },
  {
    name: "employeeNumber",
    label: "社員番号",
    placeholder: "社員番号を入力してください",
    type: "text",
    required: true,
  },
]

const radioOptions = [
  { value: "passwordReset", label: "パスワードリセット" },
  { value: "other", label: "その他" },
]

export function InquiryForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      employeeNumber: "",
      inquiryType: "",
      request: "",
    },
    resolver: zodResolver(InquirySchema),
  })

  const inquiryType = form.watch("inquiryType")

  // 送信処理（useCallbackで最適化）
  const onSubmit = useCallback(
    form.handleSubmit(
      async (data) => {
        try {
          // ここでAPI送信処理など
          // await fetch(...)

          toast.success("送信が完了しました。")
          form.reset()
        } catch (_error) {
          toast.error("送信に失敗しました。もう一度お試しください。")
        }
      },
      (errors) => {
        // バリデーションエラー時
        const firstError = Object.values(errors)[0]
        if (firstError && firstError.message) {
          toast.error(firstError.message)
        } else {
          toast.error("入力内容をご確認ください。")
        }
      }
    ),
    [form]
  )

  // フォーム項目のレンダリング
  const renderFields = useMemo(
    () =>
      fieldDefs.map((def) => (
        <FormInput
          key={def.name}
          control={form.control}
          name={def.name}
          label={def.label}
          placeholder={def.placeholder}
          type={def.type}
        />
      )),
    [form.control]
  )

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 mt-6">
        {renderFields}

        <FormRadioGroup
          control={form.control}
          name="inquiryType"
          label="問い合わせ種類"
          options={radioOptions}
        />

        {inquiryType === "other" && (
          <FormInput
            control={form.control}
            name="request"
            label="問い合わせ内容"
            placeholder="お問い合わせ内容を入力してください"
            type="text"
          />
        )}

        <Button type="submit">送信</Button>
      </form>
    </Form>
  )
}
