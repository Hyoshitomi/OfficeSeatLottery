import React from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

/**
 * タイトル: FormInput / react-hook-form連携テキスト入力
 * 要約: react-hook-formとshadcn/uiを連携させるための、ラベルとバリデーションメッセージ付きのInputコンポーネントです。
 * @param {{
 *   control: import('react-hook-form').Control<any>,
 *   name:    string,
 *   label:   string,
 * } & React.ComponentProps<typeof Input>} props - react-hook-formのcontrol、フィールド名、ラベル、およびInputコンポーネントが受け付ける全てのプロパティ。
 * @returns {import('react').ReactElement}
 */
export function FormInput({ control, name, label, ...props }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
