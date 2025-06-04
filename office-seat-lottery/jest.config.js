const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost:3000'
  },
  
  // パフォーマンスとワーカー設定
  maxWorkers: '50%',
  workerIdleMemoryLimit: '512MB',
  testTimeout: 30000,
  
  // エラーハンドリングの設定
  errorOnDeprecated: false,
  silent: false,
  verbose: false,
  
  // モジュール解決設定（修正箇所）
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/generated/(.*)$': '<rootDir>/src/generated/$1', // 追加
  },
  moduleDirectories: ['node_modules', '<rootDir>', 'src'], // 'src'を追加
  
  // テスト対象とパスの設定
  testPathIgnorePatterns: [
    '<rootDir>/.next/', 
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/build/'
  ],
  
  // ファイル変更監視の最適化
  watchPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/build/'
  ],
  
  // カバレッジ設定
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/src/middleware.js',
    '<rootDir>/src/components/ui/',
    '<rootDir>/src/components/login/session-provider.jsx',
    '<rootDir>/src/hooks/use-mobile.js',
    '<rootDir>/src/lib/utils.js',
    '<rootDir>/src/generated/',
  ],
  
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/middleware.js',
    '!src/components/ui/**',
    '!src/components/login/session-provider.jsx',
    '!src/hooks/use-mobile.js',
    '!src/lib/utils.js',
    '!src/generated/**',
  ],
  
  // キャッシュ設定
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',
  
  // 変換設定の最適化
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@testing-library))'
  ],
  
  // メモリリーク対策
  clearMocks: true,
  restoreMocks: true,
  
  // CI環境での設定
  ...(process.env.CI && {
    maxWorkers: 1,
    runInBand: true,
  }),
}

module.exports = createJestConfig(customJestConfig)
