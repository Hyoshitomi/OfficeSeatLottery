import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import SeatCanvas from '@/components/seat/seat-canvas'

// NameBoxコンポーネントのモック
jest.mock('@/components/seat/name-box', () => {
  return function MockNameBox({ id, name, status, position, isSelected, onSeatClick, onDragStop, move }) {
    return (
      <div
        data-testid={`name-box-${id}`}
        data-name={name}
        data-status={status}
        data-selected={isSelected}
        onClick={() => onSeatClick && onSeatClick(id)}
        onMouseUp={() => move && onDragStop && onDragStop(id, (position?.x || 0) + 10, (position?.y || 0) + 10)}
      >
        {name}
      </div>
    )
  }
})

// AddBoxButtonコンポーネントのモック
jest.mock('@/components/seat/add-box-button', () => {
  return function MockAddBoxButton({ onClick }) {
    return (
      <button data-testid="add-box-button" onClick={onClick}>
        座席を追加
      </button>
    )
  }
})

describe('SeatCanvas', () => {
  const defaultBoxes = [
    { id: 'seat-1', name: '田中太郎', status: 'movable', x: 100, y: 200 },
    { id: 'seat-2', name: '佐藤花子', status: 'fixed', x: 300, y: 400 },
    { id: 'seat-3', name: '', status: 'unused', x: 500, y: 600 }
  ]

  const defaultProps = {
    src: 'https://example.com/office-layout.jpg',
    imgSize: { width: 800, height: 600 },
    boxes: defaultBoxes,
    selectedSeatIds: [],
    onImgLoad: jest.fn(),
    onAddBox: jest.fn(),
    onDragStop: jest.fn(),
    onSeatClick: jest.fn(),
    onExit: jest.fn(),
    appoint: false,
    move: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('基本レンダリング', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<SeatCanvas {...defaultProps} />)

      expect(screen.getByRole('img')).toBeInTheDocument()
      // move=falseの場合はAddBoxButtonは表示されない
      expect(screen.queryByTestId('add-box-button')).not.toBeInTheDocument()
    })

    it('move=trueの場合、AddBoxButtonが表示される', () => {
      render(<SeatCanvas {...defaultProps} move={true} />)

      expect(screen.getByTestId('add-box-button')).toBeInTheDocument()
    })

    it('背景画像が正しく設定される', () => {
      render(<SeatCanvas {...defaultProps} />)

      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('src', 'https://example.com/office-layout.jpg')
      expect(img).toHaveAttribute('alt', 'オフィスレイアウト')
    })

    it('画像サイズが正しく設定される', () => {
      render(<SeatCanvas {...defaultProps} />)

      const img = screen.getByRole('img')
      expect(img).toHaveStyle({ width: '800px', height: '600px' })
    })

    it('コンテナに適切なCSSクラスが適用される', () => {
      render(<SeatCanvas {...defaultProps} />)

      const container = screen.getByRole('img').closest('div')
      expect(container).toHaveClass('relative', 'inline-block')
    })
  })

  describe('NameBoxレンダリング', () => {
    it('すべてのNameBoxが表示される', () => {
      render(<SeatCanvas {...defaultProps} />)

      expect(screen.getByTestId('name-box-seat-1')).toBeInTheDocument()
      expect(screen.getByTestId('name-box-seat-2')).toBeInTheDocument()
      expect(screen.getByTestId('name-box-seat-3')).toBeInTheDocument()
    })

    it('NameBoxに正しい名前が表示される', () => {
      render(<SeatCanvas {...defaultProps} />)

      expect(screen.getByText('田中太郎')).toBeInTheDocument()
      expect(screen.getByText('佐藤花子')).toBeInTheDocument()
    })

    it('NameBoxに正しいステータスが設定される', () => {
      render(<SeatCanvas {...defaultProps} />)

      expect(screen.getByTestId('name-box-seat-1')).toHaveAttribute('data-status', 'movable')
      expect(screen.getByTestId('name-box-seat-2')).toHaveAttribute('data-status', 'fixed')
      expect(screen.getByTestId('name-box-seat-3')).toHaveAttribute('data-status', 'unused')
    })
  })

  describe('座席選択状態', () => {
    it('選択された座席が正しくマークされる', () => {
      const props = { ...defaultProps, selectedSeatIds: ['seat-1', 'seat-3'] }
      render(<SeatCanvas {...props} />)

      expect(screen.getByTestId('name-box-seat-1')).toHaveAttribute('data-selected', 'true')
      expect(screen.getByTestId('name-box-seat-2')).toHaveAttribute('data-selected', 'false')
      expect(screen.getByTestId('name-box-seat-3')).toHaveAttribute('data-selected', 'true')
    })

    it('選択座席がない場合、すべてfalseになる', () => {
      render(<SeatCanvas {...defaultProps} />)

      expect(screen.getByTestId('name-box-seat-1')).toHaveAttribute('data-selected', 'false')
      expect(screen.getByTestId('name-box-seat-2')).toHaveAttribute('data-selected', 'false')
      expect(screen.getByTestId('name-box-seat-3')).toHaveAttribute('data-selected', 'false')
    })
  })

  describe('イベントハンドリング', () => {
    it('画像読み込み時にonImgLoadが呼ばれる', () => {
      const mockOnImgLoad = jest.fn()
      render(<SeatCanvas {...defaultProps} onImgLoad={mockOnImgLoad} />)

      const img = screen.getByRole('img')
      fireEvent.load(img)

      expect(mockOnImgLoad).toHaveBeenCalledWith({ width: 800, height: 600 })
    })

    it('AddBoxButtonクリック時にonAddBoxが呼ばれる', () => {
      render(<SeatCanvas {...defaultProps} move={true} />)

      const addButton = screen.getByTestId('add-box-button')
      fireEvent.click(addButton)

      expect(defaultProps.onAddBox).toHaveBeenCalledTimes(1)
    })

    it('座席クリック時にonSeatClickが呼ばれる', () => {
      render(<SeatCanvas {...defaultProps} />)

      const seat = screen.getByTestId('name-box-seat-1')
      fireEvent.click(seat)

      expect(defaultProps.onSeatClick).toHaveBeenCalledWith('seat-1')
    })

    it('ドラッグ停止時にonDragStopが呼ばれる', () => {
      const mockOnDragStop = jest.fn()
      render(<SeatCanvas {...defaultProps} move={true} onDragStop={mockOnDragStop} />)

      const seat = screen.getByTestId('name-box-seat-1')
      fireEvent.mouseUp(seat)

      expect(mockOnDragStop).toHaveBeenCalledWith('seat-1', 110, 210)
    })
  })

  describe('エッジケース', () => {
    it('boxesが空の場合でもエラーが発生しない', () => {
      const props = { ...defaultProps, boxes: [] }

      expect(() => {
        render(<SeatCanvas {...props} />)
      }).not.toThrow()

      expect(screen.getByRole('img')).toBeInTheDocument()
    })

    it('boxesがnullの場合でもエラーが発生しない', () => {
      const props = { ...defaultProps, boxes: null }

      expect(() => {
        render(<SeatCanvas {...props} />)
      }).not.toThrow()
    })

    it('boxesがundefinedの場合でもエラーが発生しない', () => {
      const props = { ...defaultProps, boxes: undefined }

      expect(() => {
        render(<SeatCanvas {...props} />)
      }).not.toThrow()
    })

    it('selectedSeatIdsがnullの場合でも正常動作する', () => {
      const props = { ...defaultProps, selectedSeatIds: null }

      expect(() => {
        render(<SeatCanvas {...props} />)
      }).not.toThrow()
    })

    it('必須プロパティが不足してもエラーが発生しない', () => {
      expect(() => {
        render(<SeatCanvas />)
      }).not.toThrow()
    })
  })

  describe('プロパティバリデーション', () => {
    it('コールバック関数がnullでもエラーが発生しない', () => {
      const props = {
        ...defaultProps,
        onImgLoad: null,
        onDragStop: null,
        onAddBox: null,
        onSeatClick: null
      }

      expect(() => {
        render(<SeatCanvas {...props} />)
      }).not.toThrow()
    })
  })
})
