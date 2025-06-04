import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import AccountPage from '@/app/(with-sidebar)/account/page';

// モック設定
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock('@/components/account/profile-card', () => ({
    ProfileCard: jest.fn(({ name, employeeId, profileImage, isAdmin }) => {
      // isAdminの値を安全に処理
      const adminValue = isAdmin ? 'true' : 'false';
      
      return (
        <div data-testid="profile-card">
          <div data-testid="name-display">{name}</div>
          <div data-testid="employee-id-display">{employeeId}</div>
          <div data-testid="profile-image" data-src={profileImage}></div>
          <div data-testid="admin-flag" data-admin={adminValue}></div>
        </div>
      );
    }),
  }));
  
  
jest.mock('@/components/account/password-change-card', () => ({
  PasswordChangeCard: jest.fn(({ currentPassword, newPassword, confirmPassword, onChange, validationAttempted }) => (
    <div data-testid="password-change-card">
      <input
        data-testid="current-password-input"
        value={currentPassword}
        onChange={(e) => onChange('currentPassword', e.target.value)}
      />
      <input
        data-testid="new-password-input"
        value={newPassword}
        onChange={(e) => onChange('newPassword', e.target.value)}
      />
      <input
        data-testid="confirm-password-input"
        value={confirmPassword}
        onChange={(e) => onChange('confirmPassword', e.target.value)}
      />
      <div data-testid="validation-attempted" data-attempted={validationAttempted}></div>
    </div>
  )),
}));

jest.mock('@/components/account/progressbar', () => ({
  ProgressBar: jest.fn(({ isLoading, progress }) => (
    <div data-testid="progress-bar" data-loading={isLoading} data-progress={progress}></div>
  )),
}));

jest.mock('@/components/ui/button', () => ({
  Button: jest.fn(({ children, onClick, disabled, ...props }) => (
    <button data-testid="save-button" onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  )),
}));

jest.mock('@/hooks/use-password-validation', () => ({
  usePasswordValidation: jest.fn(),
}));

jest.mock('@/hooks/use-progress', () => ({
  useProgress: jest.fn(),
}));

describe('AccountPage', () => {
  const mockUseSession = useSession;
  const mockToast = toast;
  const { usePasswordValidation } = require('@/hooks/use-password-validation');
  const { useProgress } = require('@/hooks/use-progress');

  const mockUser = {
    lastName: '田中',
    firstName: '太郎',
    employeeNumber: 'E001',
    adminFlag: true,
  };

  const mockProgressHook = {
    isLoading: false,
    progress: 0,
    startProgress: jest.fn(() => 'timer-id'),
    completeProgress: jest.fn(),
    resetProgress: jest.fn(),
  };

  const mockValidationHook = {
    allValid: true,
    match: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    
    mockUseSession.mockReturnValue({
      data: { user: mockUser },
    });
    
    useProgress.mockReturnValue(mockProgressHook);
    usePasswordValidation.mockReturnValue(mockValidationHook);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('基本的なUI要素が正しくレンダリングされる', () => {
    render(<AccountPage />);
    
    expect(screen.getByText('マイページ')).toBeInTheDocument();
    expect(screen.getByText('プロフィール情報の確認とパスワード変更ができます')).toBeInTheDocument();
    expect(screen.getByTestId('profile-card')).toBeInTheDocument();
    expect(screen.getByTestId('password-change-card')).toBeInTheDocument();
    expect(screen.getByTestId('save-button')).toBeInTheDocument();
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });

  it('セッションがない場合、デフォルト値が表示される', () => {
    mockUseSession.mockReturnValue({ data: null });
    
    render(<AccountPage />);
    
    expect(screen.getByTestId('name-display')).toHaveTextContent('取得失敗');
    expect(screen.getByTestId('employee-id-display')).toHaveTextContent('取得失敗');
    
    // 修正：user?.adminFlagがundefinedの場合、falseとして扱われる
    expect(screen.getByTestId('admin-flag')).toHaveAttribute('data-admin', 'false');
  });
  
  it('セッションがある場合、ユーザー情報が正しく表示される', () => {
    render(<AccountPage />);
    
    expect(screen.getByTestId('name-display')).toHaveTextContent('田中 太郎');
    expect(screen.getByTestId('employee-id-display')).toHaveTextContent('E001');
    
    // 修正：adminFlagがtrueの場合
    expect(screen.getByTestId('admin-flag')).toHaveAttribute('data-admin', 'true');
  });
    
  

  it('パスワード入力フィールドが正しく動作する', () => {
    render(<AccountPage />);
    
    const currentPasswordInput = screen.getByTestId('current-password-input');
    const newPasswordInput = screen.getByTestId('new-password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    
    fireEvent.change(currentPasswordInput, { target: { value: 'currentPassword123' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword123' } });
    
    expect(currentPasswordInput).toHaveValue('currentPassword123');
    expect(newPasswordInput).toHaveValue('newPassword123');
    expect(confirmPasswordInput).toHaveValue('newPassword123');
  });

  it('パスワード変更が成功した場合、成功メッセージが表示される', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'パスワードが変更されました' }),
    });

    render(<AccountPage />);
    
    const currentPasswordInput = screen.getByTestId('current-password-input');
    const newPasswordInput = screen.getByTestId('new-password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const saveButton = screen.getByTestId('save-button');

    fireEvent.change(currentPasswordInput, { target: { value: 'currentPassword123' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword123' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: 'currentPassword123',
          newPassword: 'newPassword123',
        }),
      });
    });

    await waitFor(() => {
      expect(mockToast.success).toHaveBeenCalledWith('パスワードが変更されました');
    });
  });

  it('パスワード変更が失敗した場合、エラーメッセージが表示される', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'パスワードが間違っています' }),
    });

    render(<AccountPage />);
    
    const currentPasswordInput = screen.getByTestId('current-password-input');
    const newPasswordInput = screen.getByTestId('new-password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const saveButton = screen.getByTestId('save-button');

    fireEvent.change(currentPasswordInput, { target: { value: 'wrongPassword' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword123' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith('パスワードが間違っています');
    });
  });

  it('バリデーションエラーがある場合、エラーメッセージが表示される', async () => {
    usePasswordValidation.mockReturnValue({
      allValid: false,
      match: true,
    });

    render(<AccountPage />);
    
    const newPasswordInput = screen.getByTestId('new-password-input');
    const saveButton = screen.getByTestId('save-button');

    fireEvent.change(newPasswordInput, { target: { value: 'weak' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith('パスワードが要件を満たしていません');
    });
  });

  it('ローディング中はボタンが無効化される', () => {
    useProgress.mockReturnValue({
      ...mockProgressHook,
      isLoading: true,
    });

    render(<AccountPage />);
    
    const saveButton = screen.getByTestId('save-button');
    expect(saveButton).toBeDisabled();
  });

  it('プロフィール画像のパスが正しく設定される', () => {
    render(<AccountPage />);
    
    const profileImage = screen.getByTestId('profile-image');
    expect(profileImage).toHaveAttribute('data-src', '/avatars/E001.png');
  });
});
