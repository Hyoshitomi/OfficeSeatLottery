import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import AddBoxButton from '@/components/seat/add-box-button'

describe('AddBoxButton', () => {
  const mockOnClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<AddBoxButton onClick={mockOnClick} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('+')
  })

  it('ボタンクリック時にonClickが呼ばれる', () => {
    render(<AddBoxButton onClick={mockOnClick} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('適切なCSSクラスが適用される', () => {
    render(<AddBoxButton onClick={mockOnClick} />)

    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'absolute',
      'top-2',
      'right-2',
      'w-8',
      'h-8',
      'leading-none',
      'bg-[#1AA7FF]',
      'text-white',
      'rounded-full',
      'flex',
      'items-center',
      'justify-center',
      'text-xl',
      'shadow-md',
      'hover:bg-blue-500'
    )
  })

  it('button要素のtype属性がbuttonに設定される', () => {
    render(<AddBoxButton onClick={mockOnClick} />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('複数回クリックした場合、その回数分onClickが呼ばれる', () => {
    render(<AddBoxButton onClick={mockOnClick} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(3)
  })

  it('onClickがundefinedの場合でもエラーが発生しない', () => {
    expect(() => {
      render(<AddBoxButton onClick={undefined} />)
    }).not.toThrow()
  })

  it('onClickがnullの場合でもエラーが発生しない', () => {
    expect(() => {
      render(<AddBoxButton onClick={null} />)
    }).not.toThrow()
  })
})
