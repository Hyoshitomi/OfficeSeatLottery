import React from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

/**
 * タイトル: FormTextarea / react-hook-form連携テキストエリア
 * 要約: react-hook-formとshadcn/uiを連携させるための、ラベルとバリデーションメッセージ付きのTextareaコンポーネントです。
 * @param {{
 *   control: import('react-hook-form').Control<any>,
 *   name:    string,
 *   label:   string,
 * } & React.ComponentProps<typeof Textarea>} props - react-hook-formのcontrol、フィールド名、ラベル、およびTextareaコンポーネントが受け付ける全てのプロパティ。
 * @returns {import('react').ReactElement}
 */
export function FormTextarea({ control, name, label, ...props }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
