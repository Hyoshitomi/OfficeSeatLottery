import { MultiSelect } from "@/components/multi-select"

export function EmployeeSelector({ 
  employeeList, 
  selectedEmployees, 
  onSelectionChange,
  isAdmin 
}) {
  if (!isAdmin) {
    return (
      <div className="text-center p-4 bg-muted rounded-lg">
        <p className="text-lg font-medium">あなたの席を抽選します</p>
        <p className="text-sm text-muted-foreground mt-1">
          抽選ボタンを押して席を決定してください
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label htmlFor="employee-select" className="text-lg font-medium">
        社員名
      </label>
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
    </div>
  )
}
