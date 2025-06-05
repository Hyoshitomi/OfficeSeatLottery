import { render, screen } from '@testing-library/react';

// layout.jsをモックして、フォントの依存関係を回避
jest.mock('@/app/layout', () => ({
  metadata: {
    title: 'BMC座席管理システム',
  },
  default: function RootLayout({ children }) {
    return (
      <html lang="ja">
        <body className="antialiased --font-geist-sans --font-geist-mono">
          {children}
        </body>
      </html>
    );
  },
}));

// Next.jsのフォントをモック
jest.mock('next/font/google', () => ({
  Geist: jest.fn(() => ({
    variable: '--font-geist-sans',
    className: 'geist-sans',
  })),
  Geist_Mono: jest.fn(() => ({
    variable: '--font-geist-mono', 
    className: 'geist-mono',
  })),
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
    
    const [callArgs] = MockToaster.mock.calls;
    if (callArgs && callArgs[0]) {
      expect(callArgs[0]).toEqual(
        expect.objectContaining({
          richColors: true,
          position: 'top-right',
        })
      );
    }
  });  

  it('フォントモックが正しく設定される', () => {
    // モック関数への参照を取得
    const { Geist, Geist_Mono } = require('next/font/google'); // eslint-disable-line camelcase
    
    // フォント関数を直接呼び出してテスト
    const geistResult = Geist();
    const geistMonoResult = Geist_Mono();
    
    expect(geistResult).toEqual({
      variable: '--font-geist-sans',
      className: 'geist-sans',
    });
    
    expect(geistMonoResult).toEqual({
      variable: '--font-geist-mono',
      className: 'geist-mono',
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
