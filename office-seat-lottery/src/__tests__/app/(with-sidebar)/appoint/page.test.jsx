import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MapPage from '@/app/(with-sidebar)/appoint/page';

// jest.setup.jsで既にモックされているため、個別モックは最小限に

jest.mock('@/components/sidebar/site-header', () => ({
  SiteHeader: jest.fn(() => <div data-testid="site-header">Site Header</div>),
}));

jest.mock('@/components/seat/seat-canvas', () => {
  return jest.fn(({ boxes, imgSize, onDragStop, onSeatClick, selectedSeatIds, onImgLoad }) => (
    <div data-testid="seat-canvas">
      <div data-testid="canvas-props" 
           data-boxes={JSON.stringify(boxes)}
           data-img-size={JSON.stringify(imgSize)}
           data-selected-seats={JSON.stringify(selectedSeatIds)} />
      <button 
        data-testid="mock-seat-1"
        onClick={() => onSeatClick && onSeatClick('seat-1')}
      >
        Seat 1
      </button>
      <button 
        data-testid="mock-seat-2"
        onClick={() => onSeatClick && onSeatClick('seat-2')}
      >
        Seat 2
      </button>
      <div 
        data-testid="draggable-seat"
        onMouseUp={() => onDragStop && onDragStop('seat-1', 100, 200)}
      >
        Draggable Seat
      </div>
      <button
        data-testid="img-load-trigger"
        onClick={() => onImgLoad && onImgLoad()}
      >
        Load Image
      </button>
    </div>
  ));
});

jest.mock('@/components/sidebar/right-sidebar-appoint', () => {
  return jest.fn(({ selectedSeatIds, onSelect }) => (
    <div data-testid="right-sidebar">
      <div data-testid="sidebar-selected-seats" data-selected={JSON.stringify(selectedSeatIds)} />
      <button 
        data-testid="select-button"
        onClick={() => onSelect && onSelect()}
      >
        予約日を選択する
      </button>
    </div>
  ));
});

jest.mock('@/components/common/progress-loader', () => ({
  ProgressLoader: jest.fn(({ progress }) => (
    <div data-testid="progress-loader" data-progress={progress}>
      Progress: {progress}%
    </div>
  )),
}));

jest.mock('@/components/form/reservation-tabs', () => {
  return jest.fn(({ selectedSeatIds, onBack }) => (
    <div data-testid="reservation-tabs">
      <div data-testid="reservation-selected-seats" data-selected={JSON.stringify(selectedSeatIds)} />
      <button 
        data-testid="back-button"
        onClick={() => onBack && onBack()}
      >
        戻る
      </button>
    </div>
  ));
});

jest.mock('@/hooks/use-progress', () => ({
  useProgress: jest.fn(),
}));

jest.mock('@/hooks/use-seat', () => ({
  useSeats: jest.fn(),
}));

jest.mock('@/hooks/use-image', () => ({
  useImage: jest.fn(),
}));

// タイムアウト設定を追加
jest.setTimeout(10000);

describe('MapPage', () => {
  const { useProgress } = require('@/hooks/use-progress');
  const { useSeats } = require('@/hooks/use-seat');
  const { useImage } = require('@/hooks/use-image');

  let mockProgressHook;
  let mockSeatsHook;
  let mockImageHook;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // 各テストで新しいモックインスタンスを作成
    mockProgressHook = {
      isLoading: false,
      progress: 0,
      startProgress: jest.fn(() => 'timer-id'),
      completeProgress: jest.fn(),
    };

    mockSeatsHook = {
      boxes: [
        { id: 'seat-1', x: 50, y: 50, name: 'Seat 1' },
        { id: 'seat-2', x: 100, y: 100, name: 'Seat 2' }
      ],
      imgSize: { width: 800, height: 600 },
      fetchSeats: jest.fn().mockResolvedValue(),
      exitSeat: jest.fn(),
      updateBox: jest.fn(),
      handleImgLoad: jest.fn(),
    };

    mockImageHook = {
      previewImage: '/mock-image.png',
      fileInputRef: { current: null },
    };
    
    useProgress.mockReturnValue(mockProgressHook);
    useSeats.mockReturnValue(mockSeatsHook);
    useImage.mockReturnValue(mockImageHook);
  });

  // メモリクリーンアップを追加
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('基本レンダリング', () => {
    it('すべてのコンポーネントが正しくレンダリングされる', () => {
      render(<MapPage />);
      
      expect(screen.getByTestId('site-header')).toBeInTheDocument();
      expect(screen.getByTestId('seat-canvas')).toBeInTheDocument();
      expect(screen.getByTestId('right-sidebar')).toBeInTheDocument();
      expect(screen.queryByTestId('reservation-tabs')).not.toBeInTheDocument();
    });

    it('ローディング中にProgressLoaderが表示される', () => {
      useProgress.mockReturnValue({
        ...mockProgressHook,
        isLoading: true,
        progress: 50,
      });

      render(<MapPage />);
      
      expect(screen.getByTestId('progress-loader')).toBeInTheDocument();
      expect(screen.getByTestId('progress-loader')).toHaveAttribute('data-progress', '50');
    });

    it('ローディング中でない場合ProgressLoaderが表示されない', () => {
      render(<MapPage />);
      
      expect(screen.queryByTestId('progress-loader')).not.toBeInTheDocument();
    });
  });

  describe('初期化処理', () => {
    it('座席データの取得処理が正しく動作する', async () => {
      render(<MapPage />);
      
      // 非同期処理を待機
      await waitFor(() => {
        expect(mockSeatsHook.fetchSeats).toHaveBeenCalledWith('/api/seats/edit');
      }, { timeout: 5000 });
    });

  });

  describe('座席選択機能', () => {
    it('座席クリック時に選択状態が更新される', () => {
      render(<MapPage />);
      
      const seat1Button = screen.getByTestId('mock-seat-1');
      fireEvent.click(seat1Button);
      
      // 選択された座席がサイドバーに反映される
      const sidebarSelectedSeats = screen.getByTestId('sidebar-selected-seats');
      expect(sidebarSelectedSeats).toHaveAttribute('data-selected', '["seat-1"]');
    });

    it('同じ座席を再度クリックすると選択解除される', () => {
      render(<MapPage />);
      
      const seat1Button = screen.getByTestId('mock-seat-1');
      
      // 1回目のクリック（選択）
      fireEvent.click(seat1Button);
      let sidebarSelectedSeats = screen.getByTestId('sidebar-selected-seats');
      expect(sidebarSelectedSeats).toHaveAttribute('data-selected', '["seat-1"]');
      
      // 2回目のクリック（選択解除）
      fireEvent.click(seat1Button);
      sidebarSelectedSeats = screen.getByTestId('sidebar-selected-seats');
      expect(sidebarSelectedSeats).toHaveAttribute('data-selected', '[]');
    });

    it('複数の座席を選択できる', () => {
      render(<MapPage />);
      
      const seat1Button = screen.getByTestId('mock-seat-1');
      const seat2Button = screen.getByTestId('mock-seat-2');
      
      fireEvent.click(seat1Button);
      fireEvent.click(seat2Button);
      
      const sidebarSelectedSeats = screen.getByTestId('sidebar-selected-seats');
      expect(sidebarSelectedSeats).toHaveAttribute('data-selected', '["seat-1","seat-2"]');
    });
  });

  describe('座席ドラッグ機能', () => {
    it('座席のドラッグ機能が正しく設定される', () => {
      render(<MapPage />);
      
      // SeatCanvasに渡されたonDragStopコールバックを確認
      const SeatCanvasComponent = require('@/components/seat/seat-canvas');
      const mockCalls = SeatCanvasComponent.mock.calls;
      
      if (mockCalls.length > 0) {
        const props = mockCalls[0][0];
        expect(props.onDragStop).toBeDefined();
        
        // onDragStopコールバックを実行
        props.onDragStop('seat-1', 100, 200);
        expect(mockSeatsHook.updateBox).toHaveBeenCalledWith('seat-1', { x: 100, y: 200 });
      }
    });
  });
    
  describe('予約画面の表示制御', () => {
    it('「予約日を選択する」ボタンクリック時に予約画面が表示される', () => {
      render(<MapPage />);
      
      // 座席を選択
      const seat1Button = screen.getByTestId('mock-seat-1');
      fireEvent.click(seat1Button);
      
      // 予約日選択ボタンをクリック
      const selectButton = screen.getByTestId('select-button');
      fireEvent.click(selectButton);
      
      // 予約画面が表示される
      expect(screen.getByTestId('reservation-tabs')).toBeInTheDocument();
      expect(screen.queryByTestId('seat-canvas')).not.toBeInTheDocument();
      expect(screen.queryByTestId('right-sidebar')).not.toBeInTheDocument();
    });

    it('座席が選択されていない場合は予約画面が表示されない', () => {
      render(<MapPage />);
      
      const selectButton = screen.getByTestId('select-button');
      fireEvent.click(selectButton);
      
      // 予約画面は表示されない
      expect(screen.queryByTestId('reservation-tabs')).not.toBeInTheDocument();
      expect(screen.getByTestId('seat-canvas')).toBeInTheDocument();
    });

    it('予約画面から戻るボタンでマップ画面に戻る', () => {
      render(<MapPage />);
      
      // 座席を選択して予約画面を表示
      const seat1Button = screen.getByTestId('mock-seat-1');
      fireEvent.click(seat1Button);
      
      const selectButton = screen.getByTestId('select-button');
      fireEvent.click(selectButton);
      
      expect(screen.getByTestId('reservation-tabs')).toBeInTheDocument();
      
      // 戻るボタンをクリック
      const backButton = screen.getByTestId('back-button');
      fireEvent.click(backButton);
      
      // マップ画面に戻る
      expect(screen.queryByTestId('reservation-tabs')).not.toBeInTheDocument();
      expect(screen.getByTestId('seat-canvas')).toBeInTheDocument();
      expect(screen.getByTestId('right-sidebar')).toBeInTheDocument();
    });
  });

  describe('コンポーネント間の連携', () => {
    it('SeatCanvasに正しいpropsが渡される', () => {
      render(<MapPage />);
      
      const canvasProps = screen.getByTestId('canvas-props');
      expect(canvasProps).toHaveAttribute('data-boxes', JSON.stringify(mockSeatsHook.boxes));
      expect(canvasProps).toHaveAttribute('data-img-size', JSON.stringify(mockSeatsHook.imgSize));
      expect(canvasProps).toHaveAttribute('data-selected-seats', '[]');
    });

    it('RightSidebarに選択された座席IDが渡される', () => {
      render(<MapPage />);
      
      // 座席を選択
      const seat1Button = screen.getByTestId('mock-seat-1');
      fireEvent.click(seat1Button);
      
      const sidebarSelectedSeats = screen.getByTestId('sidebar-selected-seats');
      expect(sidebarSelectedSeats).toHaveAttribute('data-selected', '["seat-1"]');
    });

    it('ReservationTabsに選択された座席IDが渡される', () => {
      render(<MapPage />);
      
      // 座席を選択して予約画面を表示
      const seat1Button = screen.getByTestId('mock-seat-1');
      fireEvent.click(seat1Button);
      
      const selectButton = screen.getByTestId('select-button');
      fireEvent.click(selectButton);
      
      const reservationSelectedSeats = screen.getByTestId('reservation-selected-seats');
      expect(reservationSelectedSeats).toHaveAttribute('data-selected', '["seat-1"]');
    });
  });

  describe('画像読み込み処理', () => {
    it('画像読み込み時にhandleImgLoadが呼ばれる', () => {
      render(<MapPage />);
      
      const imgLoadTrigger = screen.getByTestId('img-load-trigger');
      fireEvent.click(imgLoadTrigger);
      
      expect(mockSeatsHook.handleImgLoad).toHaveBeenCalled();
    });
  });

  describe('フックの呼び出し', () => {
    it('すべてのカスタムフックが正しく呼び出される', () => {
      render(<MapPage />);
      
      expect(useProgress).toHaveBeenCalled();
      expect(useSeats).toHaveBeenCalled();
      expect(useImage).toHaveBeenCalled();
    });
  });

  describe('状態管理', () => {
    it('初期状態では座席が選択されていない', () => {
      render(<MapPage />);
      
      const sidebarSelectedSeats = screen.getByTestId('sidebar-selected-seats');
      expect(sidebarSelectedSeats).toHaveAttribute('data-selected', '[]');
    });

    it('初期状態では予約画面が表示されていない', () => {
      render(<MapPage />);
      
      expect(screen.queryByTestId('reservation-tabs')).not.toBeInTheDocument();
      expect(screen.getByTestId('seat-canvas')).toBeInTheDocument();
    });
  });
});
