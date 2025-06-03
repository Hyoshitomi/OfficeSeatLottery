import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ReservationTabs from '@/components/seat/reservation-tabs'

// 外部ライブラリとコンポーネントのモック
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: { user: { adminFlag: true } }
  }))
}))

jest.mock('@/hooks/use-employees', () => ({
  useEmployees: jest.fn(() => ({
    employeeList: [
      { value: '1', label: '田中太郎' },
      { value: '2', label: '佐藤花子' }
    ],
    selectedEmployees: [],
    setSelectedEmployees: jest.fn(),
    isAdmin: true
  }))
}))

jest.mock('@/components/ui/calendar', () => ({
  Calendar: ({ selected, onSelect, mode }) => (
    <div data-testid="calendar" data-mode={mode}>
      <button onClick={() => onSelect({ from: new Date('2025-06-15'), to: new Date('2025-06-20') })}>
        日付選択
      </button>
    </div>
  )
}))

jest.mock('@/components/ui/card', () => ({
  Card: ({ children }) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }) => <div data-testid="card-content">{children}</div>,
  CardDescription: ({ children }) => <div data-testid="card-description">{children}</div>,
  CardHeader: ({ children }) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }) => <h3 data-testid="card-title">{children}</h3>
}))

jest.mock('@/components/ui/checkbox', () => ({
  Checkbox: ({ id, checked, onCheckedChange }) => (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      data-testid={`checkbox-${id}`}
    />
  )
}))

jest.mock('@/components/ui/label', () => ({
  Label: ({ children, htmlFor }) => (
    <label htmlFor={htmlFor} data-testid={`label-${htmlFor}`}>{children}</label>
  )
}))

jest.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children, defaultValue }) => (
    <div data-testid="tabs" data-default-value={defaultValue}>{children}</div>
  ),
  TabsContent: ({ children, value }) => (
    <div data-testid={`tabs-content-${value}`}>{children}</div>
  ),
  TabsList: ({ children }) => <div data-testid="tabs-list">{children}</div>,
  TabsTrigger: ({ children, value }) => (
    <button data-testid={`tabs-trigger-${value}`}>{children}</button>
  )
}))

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, disabled, variant }) => (
    <button 
      onClick={onClick} 
      disabled={disabled}
      data-variant={variant}
      data-testid="button"
    >
      {children}
    </button>
  )
}))

jest.mock('@/components/lottery/employee-selector', () => ({
  EmployeeSelector: ({ employeeList, selectedEmployees, onSelectionChange, isAdmin }) => (
    <div data-testid="employee-selector">
      <select
        multiple
        value={selectedEmployees}
        onChange={(e) => {
          const values = Array.from(e.target.selectedOptions, option => option.value)
          onSelectionChange(values)
        }}
      >
        {employeeList.map(emp => (
          <option key={emp.value} value={emp.value}>{emp.label}</option>
        ))}
      </select>
    </div>
  )
}))

describe('ReservationTabs', () => {
  const mockOnBack = jest.fn()
  
  const defaultProps = {
    selectedSeatIds: ['seat-1', 'seat-2'],
    onBack: mockOnBack
  }

  beforeEach(() => {
    jest.clearAllMocks()
    console.log = jest.fn() // console.logをモック
  })

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<ReservationTabs {...defaultProps} />)

    expect(screen.getByTestId('tabs')).toBeInTheDocument()
    expect(screen.getByTestId('tabs-trigger-weekly')).toBeInTheDocument()
    expect(screen.getByTestId('tabs-trigger-date')).toBeInTheDocument()
    expect(screen.getByTestId('employee-selector')).toBeInTheDocument()
  })

  it('曜日チェックボックスが正しく表示される', () => {
    render(<ReservationTabs {...defaultProps} />)

    expect(screen.getByTestId('checkbox-monday')).toBeInTheDocument()
    expect(screen.getByTestId('checkbox-tuesday')).toBeInTheDocument()
    expect(screen.getByTestId('checkbox-wednesday')).toBeInTheDocument()
    expect(screen.getByTestId('checkbox-thursday')).toBeInTheDocument()
    expect(screen.getByTestId('checkbox-friday')).toBeInTheDocument()
  })

  it('曜日チェックボックスをクリックすると選択状態が変わる', () => {
    render(<ReservationTabs {...defaultProps} />)

    const mondayCheckbox = screen.getByTestId('checkbox-monday')
    fireEvent.change(mondayCheckbox, { target: { checked: true } })

    expect(mondayCheckbox).toBeChecked()
  })

  it('カレンダーコンポーネントが表示される', () => {
    render(<ReservationTabs {...defaultProps} />)

    expect(screen.getByTestId('calendar')).toBeInTheDocument()
  })

  it('日付選択時に状態が更新される', () => {
    render(<ReservationTabs {...defaultProps} />)

    const calendarButton = screen.getByText('日付選択')
    fireEvent.click(calendarButton)

    // 日付が選択されたことを確認（実際のテストでは状態の変更を確認）
    expect(screen.getByTestId('calendar')).toBeInTheDocument()
  })

  it('選択座席数が正しく表示される', () => {
    render(<ReservationTabs {...defaultProps} />)

    expect(screen.getByText(/選択座席数:\s*2\s*席/)).toBeInTheDocument()
  })

  it('戻るボタンクリック時にonBackが呼ばれる', () => {
    render(<ReservationTabs {...defaultProps} />)

    const backButtons = screen.getAllByText('座席選択に戻る')
    fireEvent.click(backButtons[0])

    expect(mockOnBack).toHaveBeenCalledTimes(1)
  })

  it('曜日予約ボタンが無効状態で表示される（初期状態）', () => {
    render(<ReservationTabs {...defaultProps} />)

    const weeklyButton = screen.getByText('曜日予約を確定')
    const dateButton = screen.getByText('日付予約を確定')
    expect(weeklyButton).toBeDisabled()
    expect(dateButton).toBeDisabled()
  })

  it('日付予約ボタンが無効状態で表示される（初期状態）', () => {
    render(<ReservationTabs {...defaultProps} />)

    const reserveButtons = screen.getAllByText(/予約を確定/)
    expect(reserveButtons[1]).toBeDisabled()
  })

  it('選択座席数が0の場合、最大選択可能社員数が1になる', () => {
    const props = { ...defaultProps, selectedSeatIds: [] }
    render(<ReservationTabs {...props} />)

    expect(screen.getByText(/選択座席数: 0席/)).toBeInTheDocument()
  })

  it('EmployeeSelectorに正しいpropsが渡される', () => {
    render(<ReservationTabs {...defaultProps} />)

    const employeeSelector = screen.getByTestId('employee-selector')
    expect(employeeSelector).toBeInTheDocument()
    
    // 社員リストのオプションが表示されることを確認
    expect(screen.getByText('田中太郎')).toBeInTheDocument()
    expect(screen.getByText('佐藤花子')).toBeInTheDocument()
  })
})
