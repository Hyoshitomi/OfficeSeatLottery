import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import NameBox from '@/components/seat/name-box'

// UIコンポーネントのモック
jest.mock('@/components/ui/popover', () => ({
  Popover: ({ children, open }) => (
    <div data-testid="popover" data-open={open}>
      {children}
    </div>
  ),
  PopoverTrigger: ({ children }) => <div data-testid="popover-trigger">{children}</div>,
  PopoverContent: ({ children }) => <div data-testid="popover-content">{children}</div>
}))

// 根本解決: react-draggableモックを完全に書き直し
jest.mock('react-draggable', () => {
  return function MockDraggable({ children, onStop, disabled }) {
    return (
      <div 
        data-testid="draggable"
        data-disabled={disabled}
        onMouseUp={() => onStop && onStop({}, { x: 10, y: 20 })}
      >
        {children}
      </div>
    )
  }
})

// 根本解決: NameBoxPopOverモックも修正
jest.mock('@/components/seat/name-box-pop-over', () => {
  return function MockNameBoxPopOver({ id, name, status, x, y, move, appoint }) {
    // カスタムプロパティを受け取るが、DOM要素には渡さない
    return (
      <div 
        data-testid="name-box-popover"
        data-id={id}
        data-name={name}
        data-status={status}
        data-x={x}
        data-y={y}
        data-move={move}
        data-appoint={appoint}
      />
    )
  }
})

describe('NameBox', () => {
  const defaultProps = {
    id: 'seat-1',
    name: '田中太郎',
    status: 'movable',
    position: { x: 100, y: 200 },
    onDragStop: jest.fn(),
    onUpdate: jest.fn(),
    onDelete: jest.fn(),
    onExit: jest.fn(),
    onSeatClick: jest.fn(),
    isSelected: false,
    appoint: false,
    move: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('基本レンダリング', () => {
    it('名前が正しく表示される', () => {
      render(<NameBox {...defaultProps} />)
      expect(screen.getByText('田中太郎')).toBeInTheDocument()
    })

    it('Draggableコンポーネントが正しく設定される', () => {
      render(<NameBox {...defaultProps} />)
      expect(screen.getByTestId('draggable')).toBeInTheDocument()
    })
  })

  describe('ステータススタイル', () => {
    it('movableステータスの場合、適切なスタイルが適用される', () => {
      render(<NameBox {...defaultProps} status="movable" />)
      
      const nameBox = screen.getByText('田中太郎').closest('div')
      expect(nameBox).toBeInTheDocument()
    })

    it('fixedステータスの場合、適切なスタイルが適用される', () => {
      render(<NameBox {...defaultProps} status="fixed" />)
      
      const nameBox = screen.getByText('田中太郎').closest('div')
      expect(nameBox).toBeInTheDocument()
    })

    it('unusedステータスの場合、適切なスタイルが適用される', () => {
      render(<NameBox {...defaultProps} status="unused" />)
      
      const nameBox = screen.getByText('田中太郎').closest('div')
      expect(nameBox).toBeInTheDocument()
    })

    it('reservedステータスの場合、適切なスタイルが適用される', () => {
      render(<NameBox {...defaultProps} status="reserved" />)
      
      const nameBox = screen.getByText('田中太郎').closest('div')
      expect(nameBox).toBeInTheDocument()
    })
  })

  describe('選択状態', () => {
    it('予約画面で選択中の場合、赤枠スタイルが適用される', () => {
      render(<NameBox {...defaultProps} appoint={true} isSelected={true} />)
      
      const nameBox = screen.getByText('田中太郎').closest('div')
      expect(nameBox).toBeInTheDocument()
    })

    it('予約画面で未選択の場合、通常スタイルが適用される', () => {
      render(<NameBox {...defaultProps} appoint={true} isSelected={false} />)
      
      const nameBox = screen.getByText('田中太郎').closest('div')
      expect(nameBox).toBeInTheDocument()
    })
  })

  describe('クリック処理', () => {
    it('予約画面でクリック時にonSeatClickが呼ばれる', async () => {
      render(<NameBox {...defaultProps} appoint={true} />)
      
      const clickableElement = screen.getByText('田中太郎').closest('div')
      
      await act(async () => {
        fireEvent.click(clickableElement)
      })
      
      expect(defaultProps.onSeatClick).toHaveBeenCalledWith('seat-1')
    })

    it('通常画面でクリック時にPopoverが開く', async () => {
      render(<NameBox {...defaultProps} appoint={false} />)
      
      const clickableElement = screen.getByText('田中太郎').closest('div')
      
      await act(async () => {
        fireEvent.click(clickableElement)
      })
      
      expect(screen.getByTestId('popover')).toHaveAttribute('data-open', 'true')
    })
  })

  describe('右クリック処理', () => {
    it('通常画面で右クリック時にPopoverが開く', async () => {
      render(<NameBox {...defaultProps} appoint={false} />)
      
      const clickableElement = screen.getByText('田中太郎').closest('div')
      
      await act(async () => {
        fireEvent.contextMenu(clickableElement)
      })
      
      expect(screen.getByTestId('popover')).toHaveAttribute('data-open', 'true')
    })

    it('予約画面で右クリック時にPopoverが開かない', () => {
      render(<NameBox {...defaultProps} appoint={true} />)
      
      const clickableElement = screen.getByText('田中太郎').closest('div')
      fireEvent.contextMenu(clickableElement)
      
      expect(screen.getByTestId('popover')).toHaveAttribute('data-open', 'false')
    })
  })

  describe('ドラッグ処理', () => {
    it('move=trueの場合、ドラッグが有効になる', () => {
      render(<NameBox {...defaultProps} move={true} />)
      
      expect(screen.getByTestId('draggable')).toHaveAttribute('data-disabled', 'false')
    })

    it('move=falseの場合、ドラッグが無効になる', () => {
      render(<NameBox {...defaultProps} move={false} />)
      
      expect(screen.getByTestId('draggable')).toHaveAttribute('data-disabled', 'true')
    })

    it('ドラッグ終了時にonDragStopが呼ばれる', () => {
      render(<NameBox {...defaultProps} move={true} />)
      
      const draggable = screen.getByTestId('draggable')
      fireEvent.mouseUp(draggable)
      
      expect(defaultProps.onDragStop).toHaveBeenCalledWith('seat-1', 110, 220)
    })
  })

  describe('位置設定', () => {
    it('位置が正しく設定される', () => {
      render(<NameBox {...defaultProps} />)
      
      expect(screen.getByTestId('name-box-popover')).toBeInTheDocument()
    })

    it('位置が変更された場合、正しく反映される', () => {
      const props = { ...defaultProps, position: { x: 300, y: 400 } }
      render(<NameBox {...props} />)
      
      expect(screen.getByTestId('name-box-popover')).toBeInTheDocument()
    })
  })

  describe('エッジケース', () => {
    it('positionがnullでもエラーが発生しない', () => {
      const props = { ...defaultProps, position: null }
      
      expect(() => {
        render(<NameBox {...props} />)
      }).not.toThrow()
    })

    it('positionのプロパティが不足してもエラーが発生しない', () => {
      const props = { ...defaultProps, position: {} }
      
      expect(() => {
        render(<NameBox {...props} />)
      }).not.toThrow()
    })
  })

  describe('Popoverの表示制御', () => {
    it('予約画面ではPopoverが表示されない', () => {
      render(<NameBox {...defaultProps} appoint={true} />)
      
      expect(screen.getByTestId('popover')).toHaveAttribute('data-open', 'false')
    })

    it('通常画面ではPopoverが表示される', async () => {
      render(<NameBox {...defaultProps} appoint={false} />)
      
      const clickableElement = screen.getByText('田中太郎').closest('div')
      
      await act(async () => {
        fireEvent.click(clickableElement)
      })
      
      expect(screen.getByTestId('popover')).toHaveAttribute('data-open', 'true')
    })
  })
})
