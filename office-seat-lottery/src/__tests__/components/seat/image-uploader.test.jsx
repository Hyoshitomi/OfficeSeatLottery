import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import ImageUploader from '@/components/seat/image-uploader'

// UIコンポーネントのモック
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className }) => (
    <button 
      onClick={onClick} 
      className={className}
      data-testid="image-upload-button"
    >
      {children}
    </button>
  )
}))

describe('ImageUploader', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<ImageUploader onChange={mockOnChange} />)

    expect(screen.getByTestId('image-upload-button')).toBeInTheDocument()
    expect(screen.getByText('画像を変更')).toBeInTheDocument()
    
    // 修正: 隠れたファイル入力要素を正しく取得
    const fileInput = document.querySelector('input[type="file"]')
    expect(fileInput).toBeInTheDocument()
  })

  it('ボタンクリック時にファイル入力がトリガーされる', () => {
    render(<ImageUploader onChange={mockOnChange} />)

    // 修正: 正しい要素を取得
    const fileInput = document.querySelector('input[type="file"]')
    const clickSpy = jest.spyOn(fileInput, 'click')

    const uploadButton = screen.getByTestId('image-upload-button')
    fireEvent.click(uploadButton)

    expect(clickSpy).toHaveBeenCalledTimes(1)
  })

  it('ファイル選択時にonChangeが呼ばれる', () => {
    render(<ImageUploader onChange={mockOnChange} />)

    // 修正: 正しい要素を取得
    const fileInput = document.querySelector('input[type="file"]')
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

    // 修正: configurable: trueを追加
    Object.defineProperty(fileInput, 'files', {
      value: [file],
      configurable: true,
    })

    fireEvent.change(fileInput)

    expect(mockOnChange).toHaveBeenCalledWith(file)
  })

  it('ファイルが選択されていない場合、onChangeが呼ばれない', () => {
    render(<ImageUploader onChange={mockOnChange} />)

    // 修正: 正しい要素を取得
    const fileInput = document.querySelector('input[type="file"]')

    // 修正: configurable: trueを追加
    Object.defineProperty(fileInput, 'files', {
      value: [],
      configurable: true,
    })

    fireEvent.change(fileInput)

    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('ファイル入力の属性が正しく設定される', () => {
    render(<ImageUploader onChange={mockOnChange} />)

    // 修正: 正しい要素を取得
    const fileInput = document.querySelector('input[type="file"]')
    
    expect(fileInput).toHaveAttribute('type', 'file')
    expect(fileInput).toHaveAttribute('accept', 'image/*')
    expect(fileInput).toHaveStyle({ display: 'none' })
  })

  it('onChangeがundefinedの場合でもエラーが発生しない', () => {
    expect(() => {
      render(<ImageUploader onChange={undefined} />)
    }).not.toThrow()
  })
})
