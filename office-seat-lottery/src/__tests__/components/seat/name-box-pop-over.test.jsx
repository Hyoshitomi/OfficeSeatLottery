import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import NameBoxPopOver from '@/components/seat/name-box-pop-over'

// UIコンポーネントのモック
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, className }) => (
    <button 
      onClick={onClick} 
      data-variant={variant}
      className={className}
      data-testid="button"
    >
      {children}
    </button>
  )
}))

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}))

describe('NameBoxPopOver', () => {
  const mockOnUpdate = jest.fn()
  const mockOnDelete = jest.fn()
  const mockOnExit = jest.fn()

  const defaultProps = {
    id: 'seat-1',
    name: '田中太郎',
    status: 'movable',
    x: 100,
    y: 200,
    move: false,
    onUpdate: mockOnUpdate,
    onDelete: mockOnDelete,
    onExit: mockOnExit,
    appoint: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // 各テスト前に9時以降の時間を設定
    const mockDate = new Date('2025-06-03T10:00:00')
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('予約画面の場合、何も表示されない', () => {
    const props = { ...defaultProps, appoint: true }
    const { container } = render(<NameBoxPopOver {...props} />)

    expect(container.firstChild).toBeNull()
  })

  it('move=falseかつstatus=movable以外の場合、何も表示されない', () => {
    const props = { ...defaultProps, status: 'unused' }
    const { container } = render(<NameBoxPopOver {...props} />)

    expect(container.firstChild).toBeNull()
  })

  it('9時前の場合、何も表示されない', () => {
    // このテスト専用に8時にモック
    jest.restoreAllMocks()
    const earlyMockDate = new Date('2025-06-03T08:00:00')
    jest.spyOn(global, 'Date').mockImplementation(() => earlyMockDate)

    const { container } = render(<NameBoxPopOver {...defaultProps} />)

    expect(container.firstChild).toBeNull()
  })

  it('move=falseかつstatus=movableかつ9時以降の場合、解放ボタンが表示される', () => {
    render(<NameBoxPopOver {...defaultProps} />)

    expect(screen.getByText('解放')).toBeInTheDocument()
  })

  it('move=trueの場合、編集フォームが表示される', () => {
    const props = { ...defaultProps, move: true }
    render(<NameBoxPopOver {...props} />)

    // 名前入力フィールド
    expect(screen.getByDisplayValue('田中太郎')).toBeInTheDocument()
    
    // ラジオボタンを正しく取得
    expect(screen.getByRole('radio', { name: '使用' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '不使用' })).toBeInTheDocument()
    
    // 削除ボタン
    expect(screen.getByText('削除')).toBeInTheDocument()
  })

  it('名前入力時にonUpdateが呼ばれる（move=true）', async () => {
    const props = { ...defaultProps, move: true }
    render(<NameBoxPopOver {...props} />)

    const nameInput = screen.getByDisplayValue('田中太郎')
    fireEvent.change(nameInput, { target: { value: '佐藤花子' } })

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith('seat-1', '佐藤花子', 'movable', 100, 200)
    }, { timeout: 400 })
  })

  it('ステータス変更時にonUpdateが呼ばれる（move=true）', async () => {
    const props = { ...defaultProps, move: true }
    render(<NameBoxPopOver {...props} />)

    // 「不使用」ラジオボタンをクリック
    const unusedRadio = screen.getByRole('radio', { name: '不使用' })
    fireEvent.click(unusedRadio)

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith('seat-1', '田中太郎', 'unused', 100, 200)
    }, { timeout: 400 })
  })

  it('削除ボタンクリック時にonDeleteが呼ばれる', () => {
    const props = { ...defaultProps, move: true }
    render(<NameBoxPopOver {...props} />)

    const deleteButton = screen.getByText('削除')
    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledWith('seat-1')
  })

  it('解放ボタンクリック時に確認メッセージが表示される', () => {
    render(<NameBoxPopOver {...defaultProps} />)

    const exitButton = screen.getByText('解放')
    fireEvent.click(exitButton)

    // 確認メッセージが表示される
    expect(screen.getByText(/席を開放するための機能です/)).toBeInTheDocument()
    expect(screen.getByText('OK')).toBeInTheDocument()
    expect(screen.getByText('キャンセル')).toBeInTheDocument()
  })

  it('解放確認でOKをクリックするとonExitが呼ばれる', () => {
    render(<NameBoxPopOver {...defaultProps} />)

    // 解放ボタンをクリック
    const exitButton = screen.getByText('解放')
    fireEvent.click(exitButton)

    // OKボタンをクリック
    const okButton = screen.getByText('OK')
    fireEvent.click(okButton)

    expect(mockOnExit).toHaveBeenCalledWith('seat-1')
  })

  it('解放確認でキャンセルをクリックすると確認メッセージが閉じる', () => {
    render(<NameBoxPopOver {...defaultProps} />)

    // 解放ボタンをクリック
    const exitButton = screen.getByText('解放')
    fireEvent.click(exitButton)

    // キャンセルボタンをクリック
    const cancelButton = screen.getByText('キャンセル')
    fireEvent.click(cancelButton)

    // 確認メッセージが非表示になり、解放ボタンが再表示される
    expect(screen.queryByText(/席を開放するための機能です/)).not.toBeInTheDocument()
    expect(screen.getByText('解放')).toBeInTheDocument()
  })

  it('ステータスオプションが正しく表示される', () => {
    const props = { ...defaultProps, move: true }
    render(<NameBoxPopOver {...props} />)

    // ラジオボタンの存在確認
    expect(screen.getByRole('radio', { name: '使用' })).toBeChecked()
    expect(screen.getByRole('radio', { name: '不使用' })).not.toBeChecked()
  })
})
