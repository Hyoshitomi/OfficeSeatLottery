import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SidebarRight from '@/components/sidebar/right-sidebar-edit'

jest.mock('@/components/seat/image-uploader', () => {
  return function ImageUploader({ onChange }) {
    return (
      <div data-testid="image-uploader">
        <input 
          type="file" 
          onChange={(e) => onChange && onChange(e.target.files[0])}
          data-testid="file-input"
        />
      </div>
    )
  }
})

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }) => (
    <button onClick={onClick} data-testid="button" {...props}>
      {children}
    </button>
  )
}))

jest.mock('@/components/sidebar/nav/nav-tablename', () => {
  return function TableNameInput({ value, onChange }) {
    return (
      <input 
        value={value || ''}
        onChange={onChange}
        data-testid="table-name-input"
      />
    )
  }
})

jest.mock('@/components/ui/sidebar', () => ({
  Sidebar: ({ children, ...props }) => <div data-testid="sidebar" {...props}>{children}</div>,
  SidebarFooter: ({ children }) => <div data-testid="sidebar-footer">{children}</div>,
  SidebarContent: ({ children }) => <div data-testid="sidebar-content">{children}</div>,
  SidebarMenu: ({ children }) => <div data-testid="sidebar-menu">{children}</div>,
  SidebarMenuItem: ({ children }) => <div data-testid="sidebar-menu-item">{children}</div>
}))

describe('RightSidebarEdit', () => {
  const mockOnFileChange = jest.fn()
  const mockSetTableName = jest.fn()
  const mockOnSave = jest.fn()

  const defaultProps = {
    onFileChange: mockOnFileChange,
    tableName: 'test-table',
    setTableName: mockSetTableName,
    onSave: mockOnSave
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<SidebarRight {...defaultProps} />)
    
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('image-uploader')).toBeInTheDocument()
    expect(screen.getByTestId('table-name-input')).toBeInTheDocument()
    expect(screen.getByText('保存')).toBeInTheDocument()
  })

  it('テーブル名が正しく表示される', () => {
    render(<SidebarRight {...defaultProps} />)
    
    const input = screen.getByTestId('table-name-input')
    expect(input).toHaveValue('test-table')
  })

  it('テーブル名変更時にsetTableNameが呼ばれる', () => {
    render(<SidebarRight {...defaultProps} />)
    
    const input = screen.getByTestId('table-name-input')
    fireEvent.change(input, { target: { value: 'new-table-name' } })
    
    expect(mockSetTableName).toHaveBeenCalled()
  })

  it('ファイル選択時にonFileChangeが呼ばれる', () => {
    render(<SidebarRight {...defaultProps} />)
    
    const fileInput = screen.getByTestId('file-input')
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    
    fireEvent.change(fileInput, { target: { files: [file] } })
    
    expect(mockOnFileChange).toHaveBeenCalledWith(file)
  })

  it('保存ボタンクリック時にonSaveが呼ばれる', () => {
    render(<SidebarRight {...defaultProps} />)
    
    const saveButton = screen.getByText('保存')
    fireEvent.click(saveButton)
    
    expect(mockOnSave).toHaveBeenCalledTimes(1)
  })

  it('テーブル名が空でも正常動作する', () => {
    const props = { ...defaultProps, tableName: '' }
    render(<SidebarRight {...props} />)
    
    const input = screen.getByTestId('table-name-input')
    expect(input).toHaveValue('')
  })

  it('コールバック関数がnullでもエラーが発生しない', () => {
    const props = {
      onFileChange: null,
      tableName: 'test',
      setTableName: null,
      onSave: null
    }
    
    expect(() => {
      render(<SidebarRight {...props} />)
    }).not.toThrow()
  })
})
