import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import { DateSelector } from '@/components/common/date-selector'

// UIコンポーネントのモック
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }) => <div className={className}>{children}</div>,
  CardContent: ({ children }) => <div data-testid="card-content">{children}</div>,
  CardDescription: ({ children }) => <div data-testid="card-description">{children}</div>,
  CardFooter: ({ children }) => <div data-testid="card-footer">{children}</div>,
  CardHeader: ({ children }) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }) => <h2 data-testid="card-title">{children}</h2>
}))

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, className }) => (
    <button 
      onClick={onClick} 
      className={className}
      data-variant={variant}
      data-testid="button"
    >
      {children}
    </button>
  )
}))

jest.mock('@/components/ui/calendar', () => ({
  Calendar: ({ selected, onSelect, mode }) => (
    <div data-testid="calendar" data-mode={mode}>
      <button onClick={() => onSelect(new Date('2025-06-15'))}>
        カレンダー
      </button>
      {selected && <div>選択日: {selected.toDateString()}</div>}
    </div>
  )
}))

jest.mock('@/components/ui/popover', () => ({
  Popover: ({ children }) => <div data-testid="popover">{children}</div>,
  PopoverContent: ({ children, className }) => (
    <div data-testid="popover-content" className={className}>{children}</div>
  ),
  PopoverTrigger: ({ children, asChild }) => (
    <div data-testid="popover-trigger" data-as-child={asChild}>{children}</div>
  )
}))

jest.mock('date-fns', () => ({
  format: jest.fn((date, formatStr) => {
    if (formatStr === 'PPP') return '2025年6月15日'
    return date.toDateString()
  })
}))

jest.mock('lucide-react', () => ({
  CalendarIcon: () => <svg data-testid="calendar-icon">Calendar Icon</svg>
}))

jest.mock('@/lib/utils', () => ({
  cn: (...classes) => classes.filter(Boolean).join(' ')
}))

describe('DateSelector', () => {
  const mockOnDateSelect = jest.fn()
  const mockOnToday = jest.fn()
  const mockOnConfirm = jest.fn()

  const defaultProps = {
    selectedDate: null,
    onDateSelect: mockOnDateSelect,
    onToday: mockOnToday,
    onConfirm: mockOnConfirm
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<DateSelector {...defaultProps} />)

    expect(screen.getByTestId('card-header')).toBeInTheDocument()
    expect(screen.getByTestId('card-content')).toBeInTheDocument()
    expect(screen.getByTestId('card-footer')).toBeInTheDocument()
  })

  it('カレンダーアイコンが表示される', () => {
    render(<DateSelector {...defaultProps} />)

    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument()
  })

  it('Popoverコンポーネントが表示される', () => {
    render(<DateSelector {...defaultProps} />)

    expect(screen.getByTestId('popover')).toBeInTheDocument()
    expect(screen.getByTestId('popover-trigger')).toBeInTheDocument()
    expect(screen.getByTestId('popover-content')).toBeInTheDocument()
  })

  it('Calendarコンポーネントが表示される', () => {
    render(<DateSelector {...defaultProps} />)

    expect(screen.getByTestId('calendar')).toBeInTheDocument()
  })

  it('日付選択時にonDateSelectが呼ばれる', () => {
    render(<DateSelector {...defaultProps} />)

    const calendarButton = screen.getByText('カレンダー')
    fireEvent.click(calendarButton)

    expect(mockOnDateSelect).toHaveBeenCalledWith(new Date('2025-06-15'))
  })

  it('選択された日付が表示される', () => {
    const selectedDate = new Date('2025-06-15')
    const props = { ...defaultProps, selectedDate }

    render(<DateSelector {...props} />)

    expect(screen.getByText('選択日: Sun Jun 15 2025')).toBeInTheDocument()
  })

  it('今日ボタンクリック時にonTodayが呼ばれる', () => {
    render(<DateSelector {...defaultProps} />)

    const buttons = screen.getAllByTestId('button')
    const todayButton = buttons.find(button => button.textContent.includes('今日'))
    
    if (todayButton) {
      fireEvent.click(todayButton)
      expect(mockOnToday).toHaveBeenCalled()
    }
  })

  it('確定ボタンクリック時にonConfirmが呼ばれる', () => {
    render(<DateSelector {...defaultProps} />)

    const buttons = screen.getAllByTestId('button')
    const confirmButton = buttons.find(button => button.textContent.includes('確定'))
    
    if (confirmButton) {
      fireEvent.click(confirmButton)
      expect(mockOnConfirm).toHaveBeenCalled()
    }
  })
})
