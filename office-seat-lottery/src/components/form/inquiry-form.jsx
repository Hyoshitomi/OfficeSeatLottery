import { zodResolver } from "@hookform/resolvers/zod"
import React, { useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

// --- 修正点 1: FormInputをインポート ---
import { FormInput } from "@/components/form/form-input" 
import { FormRadioGroup } from "@/components/form/form-radio"
import { FormTextarea } from "@/components/form/form-textarea"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

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

  const onSubmit = useCallback(
    form.handleSubmit(
      async (values) => {
        try {
          // --- 注意点: APIエンドポイントが /api/contact になっていることを確認 ---
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          })

          if (!response.ok) throw new Error("API request failed")

          toast.success("送信が完了しました。対応には最大1営業日かかります。")
          form.reset()
        } catch (_error) {
          toast.error("送信に失敗しました。もう一度お試しください。")
        }
      },
      (errors) => {
        const [firstError] = Object.values(errors)
        if (firstError && firstError.message) {
          toast.error(firstError.message)
        } else {
          toast.error("入力内容をご確認ください。")
        }
      }
    ),
    [form]
  )

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
          <FormTextarea
            control={form.control}
            name="request"
            label="問い合わせ内容"
            placeholder="お問い合わせ内容を入力してください"
            rows={5}
          />
        )}

        <Button type="submit">送信</Button>
      </form>
    </Form>
  )
}
