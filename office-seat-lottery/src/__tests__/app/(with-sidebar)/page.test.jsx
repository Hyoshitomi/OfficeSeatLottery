import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';

import Home from '@/app/(with-sidebar)/page';

// 各種フックとコンポーネントをモック
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('@/components/sidebar/site-header', () => ({
  SiteHeader: jest.fn(() => <div data-testid="site-header">Site Header</div>),
}));

jest.mock('@/components/ui/card', () => ({
  Card: jest.fn(({ children }) => <div data-testid="card">{children}</div>),
  CardContent: jest.fn(({ children }) => <div data-testid="card-content">{children}</div>),
  CardHeader: jest.fn(({ children }) => <div data-testid="card-header">{children}</div>),
  CardTitle: jest.fn(({ children }) => <div data-testid="card-title">{children}</div>),
}));

jest.mock('@/components/common/progress-loader', () => ({
  ProgressLoader: jest.fn(({ progress }) => (
    <div data-testid="progress-loader" data-progress={progress}>
      Progress: {progress}%
    </div>
  )),
}));

jest.mock('@/components/lottery/employee-selector', () => ({
  EmployeeSelector: jest.fn(({ onSelectionChange }) => (
    <div 
      data-testid="employee-selector"
      onClick={() => onSelectionChange && onSelectionChange(['emp1', 'emp2'])}
    >
      Employee Selector
    </div>
  )),
}));

jest.mock('@/components/lottery/lottery-button', () => ({
  LotteryButton: jest.fn(({ onLottery, disabled }) => (
    <button 
      data-testid="lottery-button"
      onClick={onLottery}
      disabled={disabled}
    >
      抽選実行
    </button>
  )),
}));

jest.mock('@/components/lottery/lottery-result', () => ({
  LotteryResult: jest.fn(({ result }) => (
    <div data-testid="lottery-result" data-result={result}>
      Result: {result}
    </div>
  )),
}));

jest.mock('@/hooks/use-progress', () => ({
  useProgress: jest.fn(),
}));

jest.mock('@/hooks/use-employees', () => ({
  useEmployees: jest.fn(),
}));

jest.mock('@/hooks/use-lottery', () => ({
  useLottery: jest.fn(),
}));

describe('Home', () => {
  const mockUseSession = useSession;
  const { useProgress } = require('@/hooks/use-progress');
  const { useEmployees } = require('@/hooks/use-employees');
  const { useLottery } = require('@/hooks/use-lottery');
  const { LotteryButton } = require('@/components/lottery/lottery-button');

  let mockProgressHook;
  let mockEmployeesHook;
  let mockLotteryHook;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockProgressHook = {
      isLoading: false,
      progress: 0,
      startProgress: jest.fn(() => 'timer-id'),
      completeProgress: jest.fn(),
    };

    mockEmployeesHook = {
      employeeList: [{ id: 1, name: 'Employee 1' }],
      selectedEmployees: ['emp1'], // デフォルトで1つ選択状態にする
      setSelectedEmployees: jest.fn(),
      isAdmin: true,
    };

    mockLotteryHook = {
      result: null,
      executeLottery: jest.fn(),
    };
    
    mockUseSession.mockReturnValue({
      data: { user: { id: 1, name: 'Test User' } },
    });
    
    useProgress.mockReturnValue(mockProgressHook);
    useEmployees.mockReturnValue(mockEmployeesHook);
    useLottery.mockReturnValue(mockLotteryHook);
  });

  it('基本的なUI要素が正しくレンダリングされる', () => {
    render(<Home />);
    
    expect(screen.getByTestId('site-header')).toBeInTheDocument();
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(screen.getByTestId('employee-selector')).toBeInTheDocument();
    expect(screen.getByTestId('lottery-button')).toBeInTheDocument();
    expect(screen.getByTestId('lottery-result')).toBeInTheDocument();
  });

  it('ローディング中にProgressLoaderが表示される', () => {
    useProgress.mockReturnValue({
      ...mockProgressHook,
      isLoading: true,
      progress: 50,
    });

    render(<Home />);
    
    expect(screen.getByTestId('progress-loader')).toBeInTheDocument();
    expect(screen.getByTestId('progress-loader')).toHaveAttribute('data-progress', '50');
  });

  it('ローディング中でない場合ProgressLoaderが表示されない', () => {
    render(<Home />);
    
    expect(screen.queryByTestId('progress-loader')).not.toBeInTheDocument();
  });

  it('セッションがない場合も正常に動作する', () => {
    mockUseSession.mockReturnValue({ data: null });
    
    render(<Home />);
    
    expect(screen.getByTestId('site-header')).toBeInTheDocument();
    expect(useEmployees).toHaveBeenCalledWith(undefined);
  });

  it('抽選ボタンクリック時にhandleLotteryが実行される', async () => {
    const mockExecuteLottery = jest.fn().mockResolvedValue();
    const testProgressHook = {
      isLoading: false,
      progress: 0,
      startProgress: jest.fn(() => 'timer-id'),
      completeProgress: jest.fn(),
    };
    
    useProgress.mockReturnValue(testProgressHook);
    useLottery.mockReturnValue({
      ...mockLotteryHook,
      executeLottery: mockExecuteLottery,
    });

    render(<Home />);
    
    const lotteryButton = screen.getByTestId('lottery-button');
    expect(lotteryButton).not.toBeDisabled();
    
    fireEvent.click(lotteryButton);

    await waitFor(() => {
      expect(testProgressHook.startProgress).toHaveBeenCalled();
    }, { timeout: 3000 });
    
    await waitFor(() => {
      expect(mockExecuteLottery).toHaveBeenCalledWith(['emp1']);
    }, { timeout: 3000 });
    
    await waitFor(() => {
      expect(testProgressHook.completeProgress).toHaveBeenCalledWith('timer-id');
    }, { timeout: 3000 });
  });

//   it('抽選実行中にエラーが発生してもcompleteProgressが呼ばれる', async () => {
//     // 修正：mockImplementationを使用してエラーを制御
//     const mockExecuteLottery = jest.fn().mockImplementation(async () => {
//       throw 'Test error'; // 文字列エラーを使用
//     });
    
//     const testProgressHook = {
//       isLoading: false,
//       progress: 0,
//       startProgress: jest.fn(() => 'timer-id'),
//       completeProgress: jest.fn(),
//     };
    
//     useProgress.mockReturnValue(testProgressHook);
//     useLottery.mockReturnValue({
//       ...mockLotteryHook,
//       executeLottery: mockExecuteLottery,
//     });
  
//     render(<Home />);
    
//     const lotteryButton = screen.getByTestId('lottery-button');
    
//     // エラーを無視してテストを実行
//     const originalConsoleError = console.error;
//     console.error = jest.fn();
    
//     fireEvent.click(lotteryButton);
  
//     await waitFor(() => {
//       expect(testProgressHook.startProgress).toHaveBeenCalled();
//     }, { timeout: 3000 });
    
//     await waitFor(() => {
//       expect(mockExecuteLottery).toHaveBeenCalledWith(['emp1']);
//     }, { timeout: 3000 });
    
//     await waitFor(() => {
//       expect(testProgressHook.completeProgress).toHaveBeenCalledWith('timer-id');
//     }, { timeout: 3000 });
    
//     // console.errorを復元
//     console.error = originalConsoleError;
//   });
          
  it('選択された従業員が抽選に渡される', async () => {
    const selectedEmployees = ['emp1', 'emp2'];
    const mockExecuteLottery = jest.fn().mockResolvedValue();
    const testProgressHook = {
      isLoading: false,
      progress: 0,
      startProgress: jest.fn(() => 'timer-id'),
      completeProgress: jest.fn(),
    };
    
    useEmployees.mockReturnValue({
      ...mockEmployeesHook,
      selectedEmployees,
    });
    
    useProgress.mockReturnValue(testProgressHook);
    useLottery.mockReturnValue({
      ...mockLotteryHook,
      executeLottery: mockExecuteLottery,
    });

    render(<Home />);
    
    const lotteryButton = screen.getByTestId('lottery-button');
    fireEvent.click(lotteryButton);

    await waitFor(() => {
      expect(mockExecuteLottery).toHaveBeenCalledWith(selectedEmployees);
    }, { timeout: 3000 });
  });

  it('抽選結果が正しく表示される', () => {
    const result = 'Winner: Employee 1';
    useLottery.mockReturnValue({
      ...mockLotteryHook,
      result,
    });

    render(<Home />);
    
    const lotteryResult = screen.getByTestId('lottery-result');
    expect(lotteryResult).toHaveAttribute('data-result', result);
  });

  it('各フックが正しい引数で呼び出される', () => {
    const mockUser = { id: 1, name: 'Test User' };
    mockUseSession.mockReturnValue({
      data: { user: mockUser },
    });

    render(<Home />);
    
    expect(useEmployees).toHaveBeenCalledWith(mockUser);
    expect(useProgress).toHaveBeenCalled();
    expect(useLottery).toHaveBeenCalled();
  });

  it('従業員が選択されていない場合は抽選ボタンが無効化される', () => {
    useEmployees.mockReturnValue({
      ...mockEmployeesHook,
      selectedEmployees: [], // 空の配列
    });

    render(<Home />);
    
    expect(LotteryButton).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: true,
        isLoading: false,
      }),
      undefined
    );
  });

  it('従業員が選択されている場合は抽選ボタンが有効化される', () => {
    useEmployees.mockReturnValue({
      ...mockEmployeesHook,
      selectedEmployees: ['emp1'], // 1つ選択
    });

    render(<Home />);
    
    expect(LotteryButton).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: false,
        isLoading: false,
      }),
      undefined
    );
  });

  it('ローディング中は適切なpropsが渡される', () => {
    useProgress.mockReturnValue({
      ...mockProgressHook,
      isLoading: true,
    });

    render(<Home />);
    
    expect(LotteryButton).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: false, // selectedEmployees.length > 0なのでfalse
        isLoading: true,
      }),
      undefined
    );
  });
});
