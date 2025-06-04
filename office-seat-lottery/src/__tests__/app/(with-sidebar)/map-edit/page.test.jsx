import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import MapEditPage from '@/app/(with-sidebar)/map-edit/page';

// jest.setup.jsで既にモックされているため、個別モックは最小限に
// useSessionは既にグローバルモックされている

jest.mock('@/components/sidebar/site-header', () => ({
  SiteHeader: jest.fn(() => <div data-testid="site-header">Site Header</div>),
}));

jest.mock('@/components/seat/seat-canvas', () => {
  return jest.fn(({ boxes, imgSize, onDragStop, onImgLoad, previewImage }) => (
    <div data-testid="seat-canvas">
      <div data-testid="canvas-props" 
           data-boxes={JSON.stringify(boxes)}
           data-img-size={JSON.stringify(imgSize)} />
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

jest.mock('@/components/sidebar/right-sidebar-edit', () => {
  return jest.fn(({ 
    tableName, 
    setTableName, 
    onAddBox, 
    onSave, 
    onUpdate, 
    onDelete, 
    fileInputRef, 
    onFileChange 
  }) => (
    <div data-testid="sidebar-right">
      <input 
        data-testid="table-name-input"
        value={tableName}
        onChange={(e) => setTableName && setTableName(e.target.value)}
      />
      <button 
        data-testid="add-box-button"
        onClick={() => onAddBox && onAddBox()}
      >
        座席追加
      </button>
      <button 
        data-testid="save-button"
        onClick={() => onSave && onSave()}
      >
        保存
      </button>
      <button 
        data-testid="update-button"
        onClick={() => onUpdate && onUpdate('seat-1', 'New Name', 'available', 50, 60)}
      >
        更新
      </button>
      <button 
        data-testid="delete-button"
        onClick={() => onDelete && onDelete('seat-1')}
      >
        削除
      </button>
      <input 
        data-testid="file-input"
        type="file"
        ref={fileInputRef}
        onChange={(e) => onFileChange && onFileChange(e)}
      />
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

jest.mock('@/components/common/admin-guard', () => ({
  AdminGuard: jest.fn(({ children }) => (
    <div data-testid="admin-guard">{children}</div>
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

// useEffectとuseStateをモック
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

describe('MapEditPage', () => {
  const mockUseSession = useSession;
  const { useProgress } = require('@/hooks/use-progress');
  const { useSeats } = require('@/hooks/use-seat');
  const { useImage } = require('@/hooks/use-image');
  const mockUseEffect = useEffect;
  const mockUseState = useState;

  const mockProgressHook = {
    isLoading: false,
    progress: 0,
    startProgress: jest.fn(() => 'timer-id'),
    completeProgress: jest.fn(),
  };

  const mockSeatsHook = {
    boxes: [
      { id: 'seat-1', x: 50, y: 50, name: 'Seat 1', status: 'available' },
      { id: 'seat-2', x: 100, y: 100, name: 'Seat 2', status: 'occupied' }
    ],
    imgSize: { width: 800, height: 600 },
    fetchSeats: jest.fn(),
    saveSeats: jest.fn(),
    updateBox: jest.fn(),
    deleteBox: jest.fn(),
    addBox: jest.fn(),
    handleImgLoad: jest.fn(),
  };

  const mockImageHook = {
    previewImage: '/mock-image.png',
    fileInputRef: { current: null },
    handleFileChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseSession.mockReturnValue({
      data: { user: { adminFlag: true } },
    });
    
    useProgress.mockReturnValue(mockProgressHook);
    useSeats.mockReturnValue(mockSeatsHook);
    useImage.mockReturnValue(mockImageHook);
    
    // useStateのモック設定
    let stateValue = 'A';
    const setState = jest.fn((newValue) => {
      stateValue = newValue;
    });
    mockUseState.mockReturnValue([stateValue, setState]);
    
    // useEffectのモック設定
    mockUseEffect.mockImplementation((callback, deps) => {
      if (deps && deps.length === 0) {
        callback();
      }
    });
  });

  describe('基本レンダリング', () => {
    it('AdminGuardでラップされたコンポーネントが正しくレンダリングされる', () => {
      render(<MapEditPage />);
      
      expect(screen.getByTestId('admin-guard')).toBeInTheDocument();
      expect(screen.getByTestId('site-header')).toBeInTheDocument();
      expect(screen.getByTestId('seat-canvas')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar-right')).toBeInTheDocument();
    });

    it('ローディング中にProgressLoaderが表示される', () => {
      useProgress.mockReturnValue({
        ...mockProgressHook,
        isLoading: true,
        progress: 50,
      });

      render(<MapEditPage />);
      
      expect(screen.getByTestId('progress-loader')).toBeInTheDocument();
      expect(screen.getByTestId('progress-loader')).toHaveAttribute('data-progress', '50');
    });

    it('ローディング中でない場合ProgressLoaderが表示されない', () => {
      render(<MapEditPage />);
      
      expect(screen.queryByTestId('progress-loader')).not.toBeInTheDocument();
    });
  });

  describe('初期化処理', () => {
    it('初期化処理が正しく設定される', () => {
      render(<MapEditPage />);
      
      expect(mockUseEffect).toHaveBeenCalled();
      expect(screen.getByTestId('site-header')).toBeInTheDocument();
    });
  });

  describe('座席操作機能', () => {
    it('座席のドラッグ終了時にupdateBoxが呼ばれる', () => {
      render(<MapEditPage />);
      
      const draggableSeat = screen.getByTestId('draggable-seat');
      fireEvent.mouseUp(draggableSeat);
      
      expect(mockSeatsHook.updateBox).toHaveBeenCalledWith('seat-1', { x: 100, y: 200 });
    });
  
    // 修正後：UI要素の存在確認
    it('座席追加ボタンが正しく表示される', () => {
      render(<MapEditPage />);
      
      expect(screen.getByTestId('add-box-button')).toBeInTheDocument();
      expect(screen.getByTestId('add-box-button')).toHaveTextContent('座席追加');
    });
  
    it('座席更新ボタンが正しく表示される', () => {
      render(<MapEditPage />);
      
      expect(screen.getByTestId('update-button')).toBeInTheDocument();
      expect(screen.getByTestId('update-button')).toHaveTextContent('更新');
    });
  
    it('座席削除ボタンが正しく表示される', () => {
      render(<MapEditPage />);
      
      expect(screen.getByTestId('delete-button')).toBeInTheDocument();
      expect(screen.getByTestId('delete-button')).toHaveTextContent('削除');
    });
  });
  

  describe('テーブル名の管理', () => {
    it('テーブル名の初期値が"A"に設定される', () => {
      render(<MapEditPage />);
      
      const tableNameInput = screen.getByTestId('table-name-input');
      expect(tableNameInput).toHaveValue('A');
    });

    it('テーブル名の変更が正しく処理される', () => {
      const mockSetState = jest.fn();
      mockUseState.mockReturnValue(['A', mockSetState]);

      render(<MapEditPage />);
      
      const tableNameInput = screen.getByTestId('table-name-input');
      fireEvent.change(tableNameInput, { target: { value: 'B' } });
      
      expect(mockSetState).toHaveBeenCalledWith('B');
    });
  });

  describe('保存機能', () => {
    it('保存機能が正しく設定される', () => {
      render(<MapEditPage />);
      
      const SidebarComponent = require('@/components/sidebar/right-sidebar-edit');
      const mockProps = SidebarComponent.mock.calls[0][0];
      
      expect(mockProps.onSave).toBeDefined();
      expect(typeof mockProps.onSave).toBe('function');
    });

    it('保存中は重複実行を防ぐ', async () => {
      useProgress.mockReturnValue({
        ...mockProgressHook,
        isLoading: true,
      });

      const mockSaveSeats = jest.fn();
      useSeats.mockReturnValue({
        ...mockSeatsHook,
        saveSeats: mockSaveSeats,
      });

      render(<MapEditPage />);
      
      const saveButton = screen.getByTestId('save-button');
      fireEvent.click(saveButton);
      
      expect(mockSaveSeats).not.toHaveBeenCalled();
    });
  });

  describe('画像処理', () => {
    it('画像読み込み時にhandleImgLoadが呼ばれる', () => {
      render(<MapEditPage />);
      
      const imgLoadTrigger = screen.getByTestId('img-load-trigger');
      fireEvent.click(imgLoadTrigger);
      
      expect(mockSeatsHook.handleImgLoad).toHaveBeenCalled();
    });

    it('ファイル変更機能が正しく設定される', () => {
      render(<MapEditPage />);
      
      const SidebarComponent = require('@/components/sidebar/right-sidebar-edit');
      const mockProps = SidebarComponent.mock.calls[0][0];
      
      expect(mockProps.onFileChange).toBeDefined();
      expect(typeof mockProps.onFileChange).toBe('function');
    });
  });

  describe('コンポーネント間の連携', () => {
    it('SeatCanvasに正しいpropsが渡される', () => {
      render(<MapEditPage />);
      
      const canvasProps = screen.getByTestId('canvas-props');
      expect(canvasProps).toHaveAttribute('data-boxes', JSON.stringify(mockSeatsHook.boxes));
      expect(canvasProps).toHaveAttribute('data-img-size', JSON.stringify(mockSeatsHook.imgSize));
    });

    it('SidebarRightに正しいpropsが渡される', () => {
      render(<MapEditPage />);
      
      expect(screen.getByTestId('table-name-input')).toHaveValue('A');
      expect(screen.getByTestId('file-input')).toBeInTheDocument();
    });
  });

  describe('フックの呼び出し', () => {
    it('すべてのカスタムフックが正しく呼び出される', () => {
      render(<MapEditPage />);
      
      expect(mockUseSession).toHaveBeenCalled();
      expect(useProgress).toHaveBeenCalled();
      expect(useSeats).toHaveBeenCalled();
      expect(useImage).toHaveBeenCalled();
      expect(mockUseState).toHaveBeenCalledWith('A');
    });
  });
});
