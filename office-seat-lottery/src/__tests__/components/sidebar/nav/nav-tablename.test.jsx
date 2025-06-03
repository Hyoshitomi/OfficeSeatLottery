import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TableNameInput from '@/components/sidebar/nav/nav-tablename'

jest.mock('@/components/ui/card', () => ({
  Card: ({ children }) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }) => <div data-testid="card-content">{children}</div>,
  CardHeader: ({ children }) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }) => <h3 data-testid="card-title">{children}</h3>
}))

jest.mock('@/components/ui/textarea', () => ({
  Textarea: ({ value, onChange, readOnly, ...props }) => (
    <textarea 
      data-testid="textarea" 
      value={value || ''}
      onChange={onChange}
      readOnly={readOnly}
      {...props} 
    />
  )
}))



describe('TableNameInput', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<TableNameInput value="" onChange={mockOnChange} />)
    
    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByTestId('card-header')).toBeInTheDocument()
    expect(screen.getByTestId('card-content')).toBeInTheDocument()
  })

  it('タイトルが正しく表示される', () => {
    render(<TableNameInput value="" onChange={mockOnChange} />)
    
    expect(screen.getByTestId('card-title')).toBeInTheDocument()
    expect(screen.getByText('テーブルID（アルファベット）')).toBeInTheDocument()
  })

  it('値が正しく表示される', () => {
    render(<TableNameInput value="test-table" onChange={mockOnChange} />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveValue('test-table')
  })

  it('値変更時にonChangeが呼ばれる', () => {
    render(<TableNameInput value="" onChange={mockOnChange} />)
    
    const textarea = screen.getByTestId('textarea')
    fireEvent.change(textarea, { target: { value: 'new-value' } })
    
    expect(mockOnChange).toHaveBeenCalled()
  })

  it('プレースホルダーが正しく設定される', () => {
    render(<TableNameInput value="" onChange={mockOnChange} />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveAttribute('placeholder', 'テーブルIDを入力')
  })

  it('valueがnullでもエラーが発生しない', () => {
    expect(() => {
      render(<TableNameInput value={null} onChange={mockOnChange} />)
    }).not.toThrow()
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveValue('')
  })

  it('onChangeがnullでもエラーが発生しない', () => {
    expect(() => {
      render(<TableNameInput value="test" readOnly />)
    }).not.toThrow()
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toHaveAttribute('readOnly')
  })
})
