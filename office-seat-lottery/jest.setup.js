import '@testing-library/jest-dom'

// グローバルfetchのモック
global.fetch = jest.fn();

// モックの設定
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/test-path',
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue(null),
    toString: jest.fn().mockReturnValue(''),
  }),
}))

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(),
}))

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    info: jest.fn(),
  },
}))

// グローバルなエラーハンドリング
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};

// 未処理のPromise rejectionを処理
process.on('unhandledRejection', (reason) => {
  if (typeof reason === 'string' && reason.includes('Test error')) {
    return;
  }
  console.error('Unhandled Rejection:', reason);
});

// 各テスト前にモックをクリア
beforeEach(() => {
  jest.clearAllMocks();
  if (global.fetch) {
    global.fetch.mockClear();
  }
});

// グローバルタイムアウトの設定
jest.setTimeout(30000);
