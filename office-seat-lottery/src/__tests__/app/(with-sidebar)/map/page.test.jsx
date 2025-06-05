import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

import MapPage from '@/app/(with-sidebar)/map/page';

// モック設定
jest.mock('@/components/sidebar/site-header', () => ({
  SiteHeader: jest.fn(({ title }) => <div data-testid="site-header">{title}</div>),
}));

jest.mock('@/components/seat/seat-canvas', () => {
  return jest.fn(({ boxes, imgSize, onDragStop, onImgLoad, src, onExit, move }) => (
    <div data-testid="seat-canvas">
      <div 
        data-testid="canvas-props" 
        data-boxes={JSON.stringify(boxes)}
        data-img-size={JSON.stringify(imgSize)}
        data-preview-image={src || ''}
        data-move={String(move)}
      />
      <div 
        data-testid="draggable-seat"
        onMouseUp={() => {
          if (onDragStop) {
            onDragStop('seat-1', 100, 200);
          }
        }}
      >
        Draggable Seat
      </div>
      <button
        data-testid="img-load-trigger"
        onClick={() => onImgLoad && onImgLoad()}
      >
        Load Image
      </button>
      <button
        data-testid="exit-trigger"
        onClick={() => onExit && onExit()}
      >
        Exit
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

jest.mock('@/hooks/use-progress', () => ({
  useProgress: jest.fn(),
}));

jest.mock('@/hooks/use-seat', () => ({
  useSeats: jest.fn(),
}));

jest.mock('@/hooks/use-image', () => ({
  useImage: jest.fn(),
}));

jest.mock('@/hooks/use-date', () => ({
  useDate: jest.fn(),
}));

// ヘルパー関数：モックデータの作成
function createMockData() {
  return {
    mockProgressHook: {
      isLoading: false,
      progress: 0,
      startProgress: jest.fn(() => 'timer-id'),
      completeProgress: jest.fn(),
    },
    mockSeatsHook: {
      boxes: [
        { id: 'seat-1', x: 50, y: 50, name: 'Seat 1' },
        { id: 'seat-2', x: 100, y: 100, name: 'Seat 2' }
      ],
      imgSize: { width: 800, height: 600 },
      fetchSeats: jest.fn().mockResolvedValue(),
      exitSeat: jest.fn(),
      updateBox: jest.fn(),
      handleImgLoad: jest.fn(),
    },
    mockImageHook: {
      previewImage: '/mock-image.png',
    },
    mockDateHook: {
      getDateString: jest.fn(() => '2025-06-04'),
    }
  };
}

// ヘルパー関数：フックの設定
function setupHooks(mockData) {
  const { useProgress } = require('@/hooks/use-progress');
  const { useSeats } = require('@/hooks/use-seat');
  const { useImage } = require('@/hooks/use-image');
  const { useDate } = require('@/hooks/use-date');

  useProgress.mockReturnValue(mockData.mockProgressHook);
  useSeats.mockReturnValue(mockData.mockSeatsHook);
  useImage.mockReturnValue(mockData.mockImageHook);
  useDate.mockReturnValue(mockData.mockDateHook);
}

describe('MapPage', () => {
  let mockData;

  beforeEach(() => {
    jest.clearAllMocks();
    mockData = createMockData();
    setupHooks(mockData);
  });

  describe('基本レンダリング', () => {
    it('すべてのコンポーネントが正しくレンダリングされる', () => {
      render(<MapPage />);
      
      expect(screen.getByTestId('site-header')).toBeInTheDocument();
      expect(screen.getByText('座席図')).toBeInTheDocument();
      expect(screen.getByTestId('seat-canvas')).toBeInTheDocument();
    });

    it('ローディング中にProgressLoaderが表示される', () => {
      mockData.mockProgressHook.isLoading = true;
      mockData.mockProgressHook.progress = 50;
      setupHooks(mockData);

      render(<MapPage />);
      
      expect(screen.getByTestId('progress-loader')).toBeInTheDocument();
      expect(screen.getByTestId('progress-loader')).toHaveAttribute('data-progress', '50');
      expect(screen.queryByTestId('seat-canvas')).not.toBeInTheDocument();
    });

    it('ローディング中でない場合SeatCanvasが表示される', () => {
      render(<MapPage />);
      
      expect(screen.queryByTestId('progress-loader')).not.toBeInTheDocument();
      expect(screen.getByTestId('seat-canvas')).toBeInTheDocument();
    });
  });

  describe('初期化処理', () => {
    it('useEffectで座席データの取得が実行される', async () => {
      const mockStartProgress = jest.fn(() => 'test-timer-id');
      const mockCompleteProgress = jest.fn();
      const mockFetchSeats = jest.fn().mockResolvedValue();
      
      mockData.mockProgressHook.startProgress = mockStartProgress;
      mockData.mockProgressHook.completeProgress = mockCompleteProgress;
      mockData.mockSeatsHook.fetchSeats = mockFetchSeats;
      setupHooks(mockData);

      await act(async () => {
        render(<MapPage />);
      });
      
      await waitFor(() => {
        expect(mockStartProgress).toHaveBeenCalled();
        expect(mockFetchSeats).toHaveBeenCalledWith('/api/seats/map', '2025-06-04');
        expect(mockCompleteProgress).toHaveBeenCalledWith('test-timer-id');
      });
    });

    it('getDateStringが正しく呼び出される', async () => {
      await act(async () => {
        render(<MapPage />);
      });
      
      await waitFor(() => {
        expect(mockData.mockDateHook.getDateString).toHaveBeenCalled();
      });
    });
  });

  describe('座席ドラッグ機能', () => {
    it('座席のドラッグ終了時にupdateBoxが呼ばれる', async () => {
      render(<MapPage />);
      
      const draggableSeat = screen.getByTestId('draggable-seat');
      fireEvent.mouseUp(draggableSeat);
      
      expect(mockData.mockSeatsHook.updateBox).toHaveBeenCalledWith('seat-1', { x: 100, y: 200 });
    });

    it('handleStopが正しいパラメータでupdateBoxを呼び出す', () => {
      render(<MapPage />);
      
      const draggableSeat = screen.getByTestId('draggable-seat');
      fireEvent.mouseUp(draggableSeat);
      
      expect(mockData.mockSeatsHook.updateBox).toHaveBeenCalledWith('seat-1', { x: 100, y: 200 });
      expect(mockData.mockSeatsHook.updateBox).toHaveBeenCalledTimes(1);
    });
  });

  describe('コンポーネント間の連携', () => {
    it('SeatCanvasに正しいpropsが渡される', () => {
      render(<MapPage />);
      
      const canvasProps = screen.getByTestId('canvas-props');
      expect(canvasProps).toHaveAttribute('data-boxes', JSON.stringify(mockData.mockSeatsHook.boxes));
      expect(canvasProps).toHaveAttribute('data-img-size', JSON.stringify(mockData.mockSeatsHook.imgSize));
      expect(canvasProps).toHaveAttribute('data-preview-image', '/mock-image.png');
      expect(canvasProps).toHaveAttribute('data-move', 'false');
    });
  });

  describe('画像読み込み処理', () => {
    it('画像読み込み時にhandleImgLoadが呼ばれる', () => {
      render(<MapPage />);
      
      const imgLoadTrigger = screen.getByTestId('img-load-trigger');
      fireEvent.click(imgLoadTrigger);
      
      expect(mockData.mockSeatsHook.handleImgLoad).toHaveBeenCalled();
    });
  });

  describe('座席退席機能', () => {
    it('退席ボタンクリック時にexitSeatが呼ばれる', () => {
      render(<MapPage />);
      
      const exitTrigger = screen.getByTestId('exit-trigger');
      fireEvent.click(exitTrigger);
      
      expect(mockData.mockSeatsHook.exitSeat).toHaveBeenCalled();
    });
  });

  describe('フックの呼び出し', () => {
    it('すべてのカスタムフックが正しく呼び出される', () => {
      const { useProgress } = require('@/hooks/use-progress');
      const { useSeats } = require('@/hooks/use-seat');
      const { useImage } = require('@/hooks/use-image');
      const { useDate } = require('@/hooks/use-date');

      render(<MapPage />);
      
      expect(useProgress).toHaveBeenCalled();
      expect(useSeats).toHaveBeenCalled();
      expect(useImage).toHaveBeenCalled();
      expect(useDate).toHaveBeenCalled();
    });
  });

  describe('非同期処理のテスト', () => {
    it('fetchSeatsが成功した場合の処理', async () => {
      const mockFetchSeats = jest.fn().mockResolvedValue();
      const mockStartProgress = jest.fn(() => 'async-timer-id');
      const mockCompleteProgress = jest.fn();
      
      mockData.mockSeatsHook.fetchSeats = mockFetchSeats;
      mockData.mockProgressHook.startProgress = mockStartProgress;
      mockData.mockProgressHook.completeProgress = mockCompleteProgress;
      setupHooks(mockData);

      await act(async () => {
        render(<MapPage />);
      });
      
      await waitFor(() => {
        expect(mockStartProgress).toHaveBeenCalled();
        expect(mockFetchSeats).toHaveBeenCalledWith('/api/seats/map', '2025-06-04');
        expect(mockCompleteProgress).toHaveBeenCalledWith('async-timer-id');
      });
    });
  });

  describe('プログレス状態の管理', () => {
    it('プログレス開始時にタイマーIDが返される', async () => {
      const customTimerId = 'custom-timer-id';
      const mockStartProgress = jest.fn(() => customTimerId);
      const mockCompleteProgress = jest.fn();
      
      mockData.mockProgressHook.startProgress = mockStartProgress;
      mockData.mockProgressHook.completeProgress = mockCompleteProgress;
      setupHooks(mockData);
      
      await act(async () => {
        render(<MapPage />);
      });
      
      await waitFor(() => {
        expect(mockStartProgress).toHaveBeenCalled();
        expect(mockCompleteProgress).toHaveBeenCalledWith(customTimerId);
      });
    });

    it('異なるプログレス値が正しく表示される', () => {
      mockData.mockProgressHook.isLoading = true;
      mockData.mockProgressHook.progress = 75;
      setupHooks(mockData);

      render(<MapPage />);
      
      const progressLoader = screen.getByTestId('progress-loader');
      expect(progressLoader).toHaveAttribute('data-progress', '75');
      expect(progressLoader).toHaveTextContent('Progress: 75%');
    });
  });
});
