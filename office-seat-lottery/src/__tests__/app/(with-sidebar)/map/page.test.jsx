import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

import MapPage from '@/app/(with-sidebar)/map/page';

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

describe('MapPage', () => {
  const { useProgress } = require('@/hooks/use-progress');
  const { useSeats } = require('@/hooks/use-seat');
  const { useImage } = require('@/hooks/use-image');
  const { useDate } = require('@/hooks/use-date');

  const mockProgressHook = {
    isLoading: false,
    progress: 0,
    startProgress: jest.fn(() => 'timer-id'),
    completeProgress: jest.fn(),
  };

  const mockSeatsHook = {
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

  const mockImageHook = {
    previewImage: '/mock-image.png',
  };

  const mockDateHook = {
    getDateString: jest.fn(() => '2025-06-04'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    useProgress.mockReturnValue(mockProgressHook);
    useSeats.mockReturnValue(mockSeatsHook);
    useImage.mockReturnValue(mockImageHook);
    useDate.mockReturnValue(mockDateHook);
  });

  describe('基本レンダリング', () => {
    it('すべてのコンポーネントが正しくレンダリングされる', () => {
      render(<MapPage />);
      
      expect(screen.getByTestId('site-header')).toBeInTheDocument();
      expect(screen.getByText('座席図')).toBeInTheDocument();
      expect(screen.getByTestId('seat-canvas')).toBeInTheDocument();
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
      
      useProgress.mockReturnValue({
        ...mockProgressHook,
        startProgress: mockStartProgress,
        completeProgress: mockCompleteProgress,
      });
      
      useSeats.mockReturnValue({
        ...mockSeatsHook,
        fetchSeats: mockFetchSeats,
      });

      await act(async () => {
        render(<MapPage />);
      });
      
      await waitFor(() => {
        expect(mockStartProgress).toHaveBeenCalled();
      });
      
      await waitFor(() => {
        expect(mockFetchSeats).toHaveBeenCalledWith('/api/seats/map', '2025-06-04');
      });
      
      await waitFor(() => {
        expect(mockCompleteProgress).toHaveBeenCalledWith('test-timer-id');
      });
    });

    it('getDateStringが正しく呼び出される', async () => {
      await act(async () => {
        render(<MapPage />);
      });
      
      await waitFor(() => {
        expect(mockDateHook.getDateString).toHaveBeenCalled();
      });
    });
  });

  describe('座席ドラッグ機能', () => {
    it('座席のドラッグ終了時にupdateBoxが呼ばれる', async () => {
      render(<MapPage />);
      
      const draggableSeat = screen.getByTestId('draggable-seat');
      fireEvent.mouseUp(draggableSeat);
      
      expect(mockSeatsHook.updateBox).toHaveBeenCalledWith('seat-1', { x: 100, y: 200 });
    });
  });

  describe('コンポーネント間の連携', () => {
    it('SeatCanvasに正しいpropsが渡される', () => {
      render(<MapPage />);
      
      const canvasProps = screen.getByTestId('canvas-props');
      expect(canvasProps).toHaveAttribute('data-boxes', JSON.stringify(mockSeatsHook.boxes));
      expect(canvasProps).toHaveAttribute('data-img-size', JSON.stringify(mockSeatsHook.imgSize));
      expect(canvasProps).toHaveAttribute('data-preview-image', '/mock-image.png');
      expect(canvasProps).toHaveAttribute('data-move', 'false');
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

  describe('座席退席機能', () => {
    it('退席ボタンクリック時にexitSeatが呼ばれる', () => {
      render(<MapPage />);
      
      const exitTrigger = screen.getByTestId('exit-trigger');
      fireEvent.click(exitTrigger);
      
      expect(mockSeatsHook.exitSeat).toHaveBeenCalled();
    });
  });

  describe('フックの呼び出し', () => {
    it('すべてのカスタムフックが正しく呼び出される', () => {
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
      
      useSeats.mockReturnValue({
        ...mockSeatsHook,
        fetchSeats: mockFetchSeats,
      });
      
      useProgress.mockReturnValue({
        ...mockProgressHook,
        startProgress: mockStartProgress,
        completeProgress: mockCompleteProgress,
      });

      await act(async () => {
        render(<MapPage />);
      });
      
      await waitFor(() => {
        expect(mockStartProgress).toHaveBeenCalled();
      });
      
      await waitFor(() => {
        expect(mockFetchSeats).toHaveBeenCalledWith('/api/seats/map', '2025-06-04');
      });
      
      await waitFor(() => {
        expect(mockCompleteProgress).toHaveBeenCalledWith('async-timer-id');
      });
    });
  });

  describe('handleStop関数のテスト', () => {
    it('handleStopが正しいパラメータでupdateBoxを呼び出す', () => {
      render(<MapPage />);
      
      const draggableSeat = screen.getByTestId('draggable-seat');
      fireEvent.mouseUp(draggableSeat);
      
      expect(mockSeatsHook.updateBox).toHaveBeenCalledWith('seat-1', { x: 100, y: 200 });
      expect(mockSeatsHook.updateBox).toHaveBeenCalledTimes(1);
    });
  });

  describe('プログレス状態の管理', () => {
    it('プログレス開始時にタイマーIDが返される', async () => {
      const customTimerId = 'custom-timer-id';
      const mockStartProgress = jest.fn(() => customTimerId);
      const mockCompleteProgress = jest.fn();
      
      useProgress.mockReturnValue({
        ...mockProgressHook,
        startProgress: mockStartProgress,
        completeProgress: mockCompleteProgress,
      });
      
      await act(async () => {
        render(<MapPage />);
      });
      
      await waitFor(() => {
        expect(mockStartProgress).toHaveBeenCalled();
      });
      
      await waitFor(() => {
        expect(mockCompleteProgress).toHaveBeenCalledWith(customTimerId);
      });
    });

    it('異なるプログレス値が正しく表示される', () => {
      useProgress.mockReturnValue({
        ...mockProgressHook,
        isLoading: true,
        progress: 75,
      });

      render(<MapPage />);
      
      const progressLoader = screen.getByTestId('progress-loader');
      expect(progressLoader).toHaveAttribute('data-progress', '75');
      expect(progressLoader).toHaveTextContent('Progress: 75%');
    });
  });
});
