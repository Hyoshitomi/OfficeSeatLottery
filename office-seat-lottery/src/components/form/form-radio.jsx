import React from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

/**
 * タイトル: FormRadioGroup / react-hook-form連携ラジオボタングループ
 * 要約: react-hook-formとshadcn/uiを連携させるためのラジオボタングループコンポーネントです。
 * @param {{
 *   control: import('react-hook-form').Control<any>,
 *   name:    string,
 *   label:   string,
 *   options: Array<{value: string, label: string}>
 * }} props
 * @param {import('react-hook-form').Control<any>} props.control - react-hook-formのcontrolオブジェクト。
 * @param {string} props.name - フォームスキーマにおけるフィールド名。
 * @param {string} props.label - グループ全体のラベル。
 * @param {Array<{value: string, label: string}>} props.options - 各ラジオボタンのvalueとlabelを持つオブジェクトの配列。
 * @returns {import('react').ReactElement}
 */
export function FormRadioGroup({ control, name, label, options }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
