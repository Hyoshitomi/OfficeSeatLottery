/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import MapImgPage from '@/app/(with-sidebar)/map-img/page';

// 必要なモックのみ設定
jest.mock('next-auth/react');
jest.mock('sonner');

jest.mock('date-fns', () => ({
  format: jest.fn(),
}));

jest.mock('@/components/sidebar/site-header', () => ({
  SiteHeader: jest.fn(({ title }) => <div data-testid="site-header">{title}</div>),
}));

jest.mock('@/components/common/admin-guard', () => ({
  AdminGuard: jest.fn(({ children }) => <div data-testid="admin-guard">{children}</div>),
}));

jest.mock('@/components/common/date-selector', () => ({
  DateSelector: jest.fn(({ onConfirm }) => (
    <div data-testid="date-selector">
      <button data-testid="confirm-button" onClick={onConfirm}>
        確認
      </button>
    </div>
  )),
}));

jest.mock('@/components/common/progress-loader', () => ({
  ProgressLoader: jest.fn(() => <div data-testid="progress-loader">Loading...</div>),
}));

jest.mock('@/components/seat/seat-canvas', () => {
  return jest.fn(() => <div data-testid="seat-canvas">Seat Canvas</div>);
});

jest.mock('@/components/sidebar/right-sidebar-img', () => {
  return jest.fn(({ onMakeImg }) => (
    <div data-testid="sidebar-right">
      <button data-testid="make-image-button" onClick={onMakeImg}>
        画像生成
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

jest.mock('@/hooks/use-date', () => ({
  useDate: jest.fn(),
}));

describe('MapImgPage', () => {
  const { format } = require('date-fns');
  const { useProgress } = require('@/hooks/use-progress');
  const { useSeats } = require('@/hooks/use-seat');
  const { useImage } = require('@/hooks/use-image');
  const { useDate } = require('@/hooks/use-date');

  const defaultMocks = {
    progress: {
      isLoading: false,
      progress: 0,
      startProgress: jest.fn(() => 'timer-id'),
      completeProgress: jest.fn(),
    },
    seats: {
      boxes: [],
      imgSize: { width: 800, height: 600 },
      fetchSeats: jest.fn().mockResolvedValue(),
      exitSeat: jest.fn(),
      updateBox: jest.fn(),
      handleImgLoad: jest.fn(),
    },
    image: {
      previewImage: '/mock-image.png',
      fileInputRef: { current: null },
      getAbsoluteUrl: jest.fn((url) => `http://localhost:3000${url}`),
    },
    date: {
      selectedDate: new Date('2025-06-04'),
      setSelectedDate: jest.fn(),
      getDateString: jest.fn(() => '2025-06-04'),
      setToday: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    useSession.mockReturnValue({
      data: { user: { adminFlag: true } },
    });
    
    format.mockReturnValue('2025年06月04日');
    
    // デフォルトモックの設定
    useProgress.mockReturnValue(defaultMocks.progress);
    useSeats.mockReturnValue(defaultMocks.seats);
    useImage.mockReturnValue(defaultMocks.image);
    useDate.mockReturnValue(defaultMocks.date);
    
    global.fetch = jest.fn();
  });

  describe('基本レンダリング', () => {
    it('AdminGuardでラップされたコンポーネントが正しくレンダリングされる', () => {
      render(<MapImgPage />);
      
      expect(screen.getByTestId('admin-guard')).toBeInTheDocument();
      expect(screen.getByTestId('site-header')).toBeInTheDocument();
    });

    it('初期状態では日付選択画面が表示される', () => {
      render(<MapImgPage />);
      
      expect(screen.getByTestId('date-selector')).toBeInTheDocument();
      expect(screen.queryByTestId('seat-canvas')).not.toBeInTheDocument();
      expect(screen.queryByTestId('sidebar-right')).not.toBeInTheDocument();
    });
  });

  describe('状態遷移', () => {
    it('確認ボタンクリック後、ローディング状態が表示される', () => {
      useProgress.mockReturnValue({
        ...defaultMocks.progress,
        isLoading: true,
        progress: 50,
      });

      render(<MapImgPage />);
      
      const confirmButton = screen.getByTestId('confirm-button');
      fireEvent.click(confirmButton);
      
      expect(screen.getByTestId('progress-loader')).toBeInTheDocument();
      expect(screen.queryByTestId('date-selector')).not.toBeInTheDocument();
    });
  });

  describe('SiteHeaderのタイトル表示', () => {
    it('selectedDateがある場合、フォーマットされた日付がタイトルに表示される', () => {
      render(<MapImgPage />);
      
      expect(screen.getByTestId('site-header')).toHaveTextContent('2025年06月04日の座席図');
    });

    it('selectedDateがない場合、デフォルトタイトルが表示される', () => {
      useDate.mockReturnValue({
        ...defaultMocks.date,
        selectedDate: null,
      });

      render(<MapImgPage />);
      
      expect(screen.getByTestId('site-header')).toHaveTextContent('座席図');
    });
  });
});
