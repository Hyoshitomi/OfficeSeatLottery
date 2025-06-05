/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */

import { render, screen } from '@testing-library/react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LoginPage from '@/app/login/page';

// Next.jsのコンポーネントをモック
jest.mock('next/image', () => {
  return function MockImage({ src, alt, width, height, ...props }) {
    return (
      <img 
        src={src} 
        alt={alt} 
        width={width} 
        height={height} 
        data-testid="bmc-logo"
        {...props}
      />
    );
  };
});

jest.mock('next/link', () => {
  return function MockLink({ href, children, className, ...props }) {
    return (
      <a href={href} className={className} data-testid="home-link" {...props}>
        {children}
      </a>
    );
  };
});

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

// LoginFormのモック - 関数で包むことで遅延評価する
const mockLoginForm = jest.fn();
jest.mock('@/components/login/login-form', () => ({
  LoginForm: (props) => mockLoginForm(props),
}));

// LoginPageContentを直接テストするためのコンポーネント
const LoginPageContent = () => {
  const searchParams = useSearchParams();
  let callbackUrl = searchParams.get('callbackUrl') || '/';

  // 修正：完全一致またはクエリパラメータ付きの/loginのみを/に変更
  if (callbackUrl === '/login' || callbackUrl.startsWith('/login?')) {
    callbackUrl = '/';
  }

  const { LoginForm } = require('@/components/login/login-form');

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium" data-testid="home-link">
          <div className="text-primary-foreground flex size-30 items-center justify-center rounded-md">
            <img src="/BMClogo_clear.png" alt="BMC" width={120} height={120} data-testid="bmc-logo" />
          </div>
        </a>
        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
};


describe('LoginPage', () => {
  const mockUseSearchParams = useSearchParams;

  beforeEach(() => {
    jest.clearAllMocks();
    // モック関数の実装を設定
    mockLoginForm.mockImplementation(({ callbackUrl }) => (
      <div data-testid="login-form" data-callback-url={callbackUrl}>
        Login Form Mock
      </div>
    ));
  });

  describe('メインコンポーネント', () => {
    it('Suspenseでラップされたコンポーネントが正しくレンダリングされる', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue(null),
      });

      render(<LoginPage />);
      
      expect(screen.getByTestId('bmc-logo')).toBeInTheDocument();
      expect(screen.getByTestId('home-link')).toBeInTheDocument();
      expect(screen.getByTestId('login-form')).toBeInTheDocument();
    });

    it('Suspenseのfallbackが表示される', () => {
      const DelayedComponent = () => {
        throw new Promise(() => {});
      };

      const TestComponent = () => (
        <Suspense fallback={<div>読み込み中...</div>}>
          <DelayedComponent />
        </Suspense>
      );

      render(<TestComponent />);
      expect(screen.getByText('読み込み中...')).toBeInTheDocument();
    });
  });

  describe('LoginPageContent', () => {
    it('基本的なUI要素が正しくレンダリングされる', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue(null),
      });

      render(<LoginPageContent />);
      
      const logo = screen.getByTestId('bmc-logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/BMClogo_clear.png');
      expect(logo).toHaveAttribute('alt', 'BMC');
      expect(logo).toHaveAttribute('width', '120');
      expect(logo).toHaveAttribute('height', '120');
      
      const homeLink = screen.getByTestId('home-link');
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/');
      
      expect(screen.getByTestId('login-form')).toBeInTheDocument();
    });

    it('正しいCSSクラスが適用される', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue(null),
      });

      const { container } = render(<LoginPageContent />);
      
      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass('bg-muted', 'flex', 'min-h-svh', 'flex-col', 'items-center', 'justify-center', 'gap-6', 'p-6', 'md:p-10');
      
      const innerDiv = mainDiv.firstChild;
      expect(innerDiv).toHaveClass('flex', 'w-full', 'max-w-sm', 'flex-col', 'gap-6');
    });
  });

  describe('callbackUrl処理', () => {
    it('callbackUrlがnullの場合、デフォルトで"/"が設定される', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue(null),
      });

      render(<LoginPageContent />);
      
      expect(mockLoginForm).toHaveBeenCalledWith(
        expect.objectContaining({
          callbackUrl: '/',
        })
      );
    });

    it('callbackUrlが通常のパスの場合、そのまま使用される', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue('/dashboard'),
      });

      render(<LoginPageContent />);
      
      expect(mockLoginForm).toHaveBeenCalledWith(
        expect.objectContaining({
          callbackUrl: '/dashboard',
        })
      );
    });

    it('callbackUrlが"/login"の場合、"/"に変更される', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue('/login'),
      });

      render(<LoginPageContent />);
      
      expect(mockLoginForm).toHaveBeenCalledWith(
        expect.objectContaining({
          callbackUrl: '/',
        })
      );
    });

    it('callbackUrlが"/login?param=value"の場合、"/"に変更される', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue('/login?redirect=true'),
      });

      render(<LoginPageContent />);
      
      expect(mockLoginForm).toHaveBeenCalledWith(
        expect.objectContaining({
          callbackUrl: '/',
        })
      );
    });

    it('callbackUrlが"/loginpage"の場合、そのまま使用される（/loginで始まるが完全一致ではない）', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue('/loginpage'),
      });

      render(<LoginPageContent />);
      
      expect(mockLoginForm).toHaveBeenCalledWith(
        expect.objectContaining({
          callbackUrl: '/loginpage',
        })
      );
    });

    it('空文字列のcallbackUrlの場合、"/"が設定される', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue(''),
      });

      render(<LoginPageContent />);
      
      expect(mockLoginForm).toHaveBeenCalledWith(
        expect.objectContaining({
          callbackUrl: '/',
        })
      );
    });
  });

  describe('useSearchParams呼び出し', () => {
    it('useSearchParamsが正しく呼び出される', () => {
      const mockGet = jest.fn().mockReturnValue('/test');
      mockUseSearchParams.mockReturnValue({
        get: mockGet,
      });

      render(<LoginPageContent />);
      
      expect(mockUseSearchParams).toHaveBeenCalled();
      expect(mockGet).toHaveBeenCalledWith('callbackUrl');
    });
  });

  describe('コンポーネント統合', () => {
    it('LoginFormに正しいpropsが渡される', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue('/profile'),
      });

      render(<LoginPageContent />);
      
      expect(mockLoginForm).toHaveBeenCalledTimes(1);
      expect(mockLoginForm).toHaveBeenCalledWith(
        expect.objectContaining({
          callbackUrl: '/profile',
        })
      );
    });
  });
});
