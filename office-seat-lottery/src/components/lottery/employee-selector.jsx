import { MultiSelect } from '@/components/ui/multi-select';

/**
 * タイトル: EmployeeSelector / 社員選択コンポーネント
 * 要約: 管理者は社員リストから複数選択でき、非管理者には案内テキストのみを表示します。
 * 補足: options形式はMultiSelectに準拠（value/labelなど）。選択状態の保持は親側で行います。
 * @param {{
 *   employeeList: Array<any>,
 *   onSelectionChange: (values: Array<string | number>) => void,
 *   isAdmin: boolean
 * }} props - 社員リスト、選択変更ハンドラ、管理者フラグ。
 * @returns {import('react').ReactElement} 社員選択UIまたは案内テキスト。
 */
export function EmployeeSelector({ employeeList, onSelectionChange, isAdmin }) {
  if (!isAdmin) {
    return (
      <div className="space-y-1 text-sm">
        <p>あなたの席を抽選します</p>
        <p>抽選ボタンを押して席を決定してください</p>
      </div>
    );
  }

  return (
    <MultiSelect
    id="employee-select"
    options={employeeList}
    onValueChange={onSelectionChange}
    defaultValue={[]}
    placeholder="社員名を選択してください"
    variant="inverted"
    maxCount={5}
    className="w-full"
  />
  );
}
