import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FormInput } from '@/components/form/form-input';
import { FormRadioGroup } from '@/components/form/form-radio';
import { FormTextarea } from '@/components/form/form-textarea';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

// --- スキーマ定義 ---
const InquirySchema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式が正しくありません' }),
  name: z.string().min(1, { message: '名前を入力してください' }),
  employeeNumber: z.string().min(1, { message: '社員番号を入力してください' }),
  inquiryType: z.enum(['passwordReset', 'other'], {
    required_error: '問い合わせ種類を選択してください',
  }),
  request: z.string().optional(),
});

// --- API通信関数 ---
/**
 * タイトル: sendInquiryAPI / 問い合わせ内容の送信
 * 要約: フォームで入力された内容をAPIエンドポイントにPOSTリクエストで送信します。
 * @param {z.infer<typeof InquirySchema>} values - InquirySchemaに準拠したフォームの入力値。
 * @returns {Promise<void>}
 * @throws {Error} APIリクエストが失敗した場合にエラーをスローします。
 */
const sendInquiryAPI = async (values) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new Error('API request failed');
  }
};

// --- フォームフィールド定義 ---
const INPUT_FIELDS = [
  {
    name: 'email',
    label: 'メールアドレス',
    placeholder: 'メールアドレスを入力してください',
    type: 'email',
  },
  {
    name: 'name',
    label: '名前',
    placeholder: 'お名前を入力してください',
    type: 'text',
  },
  {
    name: 'employeeNumber',
    label: '社員番号',
    placeholder: '社員番号を入力してください',
    type: 'text',
  },
];
const RADIO_OPTIONS = [
  { value: 'passwordReset', label: 'パスワードリセット' },
  { value: 'other', label: 'その他' },
];

/**
 * タイトル: InquiryForm / 問い合わせフォームコンポーネント
 * 要約: ユーザーからの問い合わせを受け付けるためのフォームUIと送信ロジックを提供します。
 * 補足: Zodによるバリデーションとreact-hook-formによる状態管理を行っています。
 * @returns {import('react').ReactElement}
 */
export function InquiryForm() {
  const form = useForm({
    resolver: zodResolver(InquirySchema),
    defaultValues: {
      email: '',
      name: '',
      employeeNumber: '',
      inquiryType: undefined,
      request: '',
    },
  });

  const inquiryType = form.watch('inquiryType');

  /**
   * タイトル: handleFormSubmit / フォーム送信処理
   * @param {z.infer<typeof InquirySchema>} values - バリデーションを通過したフォームの入力値。
   */
  const handleFormSubmit = async (values) => {
    try {
      await sendInquiryAPI(values);
      toast.success('送信が完了しました。対応には最大1営業日かかります。');
      form.reset();
    } catch (error) {
      toast.error('送信に失敗しました。もう一度お試しください。');
    }
  };

  /**
   * タイトル: handleFormError / フォームバリデーションエラー処理
   * @param {import('react-hook-form').FieldErrors} errors - バリデーションエラーオブジェクト。
   */
  const handleFormError = (errors) => {
    const firstErrorMessage = Object.values(errors)?.[0]?.message;
    toast.error(firstErrorMessage || '入力内容をご確認ください。');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
        className="space-y-6"
      >
        {INPUT_FIELDS.map((field) => (
          <FormInput
            key={field.name}
            control={form.control}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
          />
        ))}

        <FormRadioGroup
          control={form.control}
          name="inquiryType"
          label="お問い合わせ種類"
          options={RADIO_OPTIONS}
        />

        {inquiryType === 'other' && (
          <FormTextarea
            control={form.control}
            name="request"
            label="お問い合わせ内容"
            placeholder="具体的な内容をご記入ください。"
            rows={5}
          />
        )}

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? '送信中...' : '送信する'}
        </Button>
      </form>
    </Form>
  );
}
