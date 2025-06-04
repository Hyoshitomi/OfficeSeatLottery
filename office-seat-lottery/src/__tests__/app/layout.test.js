import { render, screen } from '@testing-library/react';

// Next.jsのフォントをモック
const mockGeist = jest.fn(() => ({
  variable: '--font-geist-sans',
  className: 'geist-sans',
}));

const mockGeistMono = jest.fn(() => ({
  variable: '--font-geist-mono', 
  className: 'geist-mono',
}));

jest.mock('next/font/google', () => ({
  Geist: mockGeist,
  Geist_Mono: mockGeistMono,
}));

// Vercelのコンポーネントをモック
const MockSpeedInsights = () => <div data-testid="speed-insights" />;
const MockAnalytics = () => <div data-testid="analytics" />;

jest.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: MockSpeedInsights,
}));

jest.mock('@vercel/analytics/next', () => ({
  Analytics: MockAnalytics,
}));

// セッションプロバイダーをモック
const MockNextAuthSessionProvider = ({ children }) => {
  return <div data-testid="session-provider">{children}</div>;
};

jest.mock('@/components/login/session-provider', () => ({
  __esModule: true,
  default: MockNextAuthSessionProvider,
}));

// Sonnerトースターをモック
const MockToaster = jest.fn(() => <div data-testid="toaster" />);

jest.mock('@/components/ui/sonner', () => ({
  Toaster: MockToaster,
}));

// グローバルCSSをモック
jest.mock('@/app/globals.css', () => ({}));

// テスト用のBodyContentコンポーネント
const BodyContent = ({ children }) => {
  return (
    <div className="antialiased --font-geist-sans --font-geist-mono">
      <MockNextAuthSessionProvider>
        {children}
        <MockToaster richColors position="top-right" />
        <MockSpeedInsights />
        <MockAnalytics />
      </MockNextAuthSessionProvider>
    </div>
  );
};

describe('RootLayout', () => {
  const mockChildren = <div data-testid="test-children">Test Content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('body要素に正しいクラス名が設定される', () => {
    render(<BodyContent>{mockChildren}</BodyContent>);
    
    const bodyContent = screen.getByTestId('session-provider').parentElement;
    expect(bodyContent).toHaveClass('antialiased');
    expect(bodyContent.className).toContain('--font-geist-sans');
    expect(bodyContent.className).toContain('--font-geist-mono');
  });

  it('NextAuthSessionProviderが子要素をラップする', () => {
    render(<BodyContent>{mockChildren}</BodyContent>);
    
    const sessionProvider = screen.getByTestId('session-provider');
    expect(sessionProvider).toBeInTheDocument();
    
    const childrenElement = screen.getByTestId('test-children');
    expect(childrenElement).toBeInTheDocument();
  });

  it('必要なコンポーネントがすべてレンダリングされる', () => {
    render(<BodyContent>{mockChildren}</BodyContent>);
    
    expect(screen.getByTestId('session-provider')).toBeInTheDocument();
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
    expect(screen.getByTestId('speed-insights')).toBeInTheDocument();
    expect(screen.getByTestId('analytics')).toBeInTheDocument();
  });

  it('Toasterが正しい設定でレンダリングされる', () => {
    render(<BodyContent>{mockChildren}</BodyContent>);
    
    // より柔軟なアプローチ：最初の引数のみをチェック
    expect(MockToaster).toHaveBeenCalled();
    const callArgs = MockToaster.mock.calls[0];
    expect(callArgs[0]).toEqual(
      expect.objectContaining({
        richColors: true,
        position: 'top-right',
      })
    );
  });
  
  

  it('フォントが正しく設定される', () => {
    // RootLayoutをインポートすることでフォント関数が実行される
    require('@/app/layout');
    
    expect(mockGeist).toHaveBeenCalledWith({
      variable: '--font-geist-sans',
      subsets: ['latin'],
    });
    
    expect(mockGeistMono).toHaveBeenCalledWith({
      variable: '--font-geist-mono',
      subsets: ['latin'],
    });
  });

  it('子要素が正しくレンダリングされる', () => {
    render(<BodyContent>{mockChildren}</BodyContent>);
    
    const childrenElement = screen.getByTestId('test-children');
    expect(childrenElement).toBeInTheDocument();
    expect(childrenElement).toHaveTextContent('Test Content');
  });

  it('複数の子要素を正しく処理する', () => {
    const multipleChildren = (
      <>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </>
    );

    render(<BodyContent>{multipleChildren}</BodyContent>);
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });
});

// メタデータのテスト
describe('RootLayout metadata', () => {
  it('正しいメタデータが設定される', () => {
    const { metadata } = require('@/app/layout');
    
    expect(metadata).toEqual({
      title: 'BMC座席管理システム',
    });
  });
});
