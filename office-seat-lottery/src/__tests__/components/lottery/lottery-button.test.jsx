import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import { LotteryButton } from '@/components/lottery/lottery-button'

// UIコンポーネントのモック
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, disabled, className }) => (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={className}
      data-testid="lottery-button"
    >
      {children}
    </button>
  )
}))

jest.mock('lucide-react', () => ({
  Ticket: () => <svg data-testid="ticket-icon">Ticket Icon</svg>
}))

describe('LotteryButton', () => {
  const mockOnLottery = jest.fn()

  const defaultProps = {
    onLottery: mockOnLottery,
    isLoading: false,
    disabled: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<LotteryButton {...defaultProps} />)

    const button = screen.getByTestId('lottery-button')
    expect(button).toBeInTheDocument()
    expect(screen.getByTestId('ticket-icon')).toBeInTheDocument()
  })

  it('ボタンクリック時にonLotteryが呼ばれる', () => {
    render(<LotteryButton {...defaultProps} />)

    const button = screen.getByTestId('lottery-button')
    fireEvent.click(button)

    expect(mockOnLottery).toHaveBeenCalledTimes(1)
  })

  it('isLoading=trueの場合、ボタンが無効化される', () => {
    const props = { ...defaultProps, isLoading: true }
    
    render(<LotteryButton {...props} />)

    const button = screen.getByTestId('lottery-button')
    expect(button).toBeDisabled()
  })

  it('disabled=trueの場合、ボタンが無効化される', () => {
    const props = { ...defaultProps, disabled: true }
    
    render(<LotteryButton {...props} />)

    const button = screen.getByTestId('lottery-button')
    expect(button).toBeDisabled()
  })

  it('isLoadingとdisabledの両方がtrueの場合、ボタンが無効化される', () => {
    const props = { ...defaultProps, isLoading: true, disabled: true }
    
    render(<LotteryButton {...props} />)

    const button = screen.getByTestId('lottery-button')
    expect(button).toBeDisabled()
  })

  it('無効化されたボタンをクリックしてもonLotteryが呼ばれない', () => {
    const props = { ...defaultProps, disabled: true }
    
    render(<LotteryButton {...props} />)

    const button = screen.getByTestId('lottery-button')
    fireEvent.click(button)

    expect(mockOnLottery).not.toHaveBeenCalled()
  })

  it('ローディング中のボタンをクリックしてもonLotteryが呼ばれない', () => {
    const props = { ...defaultProps, isLoading: true }
    
    render(<LotteryButton {...props} />)

    const button = screen.getByTestId('lottery-button')
    fireEvent.click(button)

    expect(mockOnLottery).not.toHaveBeenCalled()
  })

  it('Ticketアイコンが表示される', () => {
    render(<LotteryButton {...defaultProps} />)

    expect(screen.getByTestId('ticket-icon')).toBeInTheDocument()
  })
})
