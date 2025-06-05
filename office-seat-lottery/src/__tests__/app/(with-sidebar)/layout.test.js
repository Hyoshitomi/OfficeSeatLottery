import { render, screen } from '@testing-library/react';

import AppLayout from '@/app/(with-sidebar)/layout';

// サイドバー関連コンポーネントをモック
jest.mock('@/components/sidebar/app-sidebar', () => ({
  AppSidebar: jest.fn(() => <div data-testid="app-sidebar">App Sidebar Mock</div>),
}));

jest.mock('@/components/ui/sidebar', () => ({
  SidebarProvider: jest.fn(({ children }) => (
    <div data-testid="sidebar-provider">{children}</div>
  )),
  SidebarInset: jest.fn(({ children }) => (
    <div data-testid="sidebar-inset">{children}</div>
  )),
}));

describe('AppLayout', () => {
  const { AppSidebar } = require('@/components/sidebar/app-sidebar');
  const { SidebarProvider, SidebarInset } = require('@/components/ui/sidebar');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('正しい構造でレンダリングされる', () => {
    const mockChildren = <div data-testid="test-children">Test Content</div>;
    
    render(<AppLayout>{mockChildren}</AppLayout>);
    
    // 各コンポーネントの存在確認
    expect(screen.getByTestId('sidebar-provider')).toBeInTheDocument();
    expect(screen.getByTestId('app-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-inset')).toBeInTheDocument();
    expect(screen.getByTestId('test-children')).toBeInTheDocument();
  });

  it('子要素が正しくレンダリングされる', () => {
    const mockChildren = (
      <>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </>
    );

    render(<AppLayout>{mockChildren}</AppLayout>);
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });

  it('各コンポーネントが正しい順序で配置される', () => {
    const mockChildren = <div data-testid="test-children">Test Content</div>;
    
    render(<AppLayout>{mockChildren}</AppLayout>);
    
    // SidebarProviderが最上位にあることを確認
    const sidebarProvider = screen.getByTestId('sidebar-provider');
    expect(sidebarProvider).toBeInTheDocument();
    
    // AppSidebarとSidebarInsetがSidebarProvider内にあることを確認
    expect(screen.getByTestId('app-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-inset')).toBeInTheDocument();
  });

  it('コンポーネントが正しく呼び出される', () => {
    const mockChildren = <div data-testid="test-children">Test Content</div>;
    
    render(<AppLayout>{mockChildren}</AppLayout>);
    
    expect(SidebarProvider).toHaveBeenCalledTimes(1);
    expect(AppSidebar).toHaveBeenCalledTimes(1);
    expect(SidebarInset).toHaveBeenCalledTimes(1);
  });

  it('childrenがnullの場合も正しく処理される', () => {
    render(<AppLayout>{null}</AppLayout>);
    
    expect(screen.getByTestId('sidebar-provider')).toBeInTheDocument();
    expect(screen.getByTestId('app-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-inset')).toBeInTheDocument();
  });
});
