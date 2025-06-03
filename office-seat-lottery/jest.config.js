const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost:3000'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  
  // カバレッジ対象から除外するパターンを追加
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/src/components/ui/',
    '<rootDir>/src/components/login/session-provider.jsx',
    '<rootDir>/src/hooks/use-mobile.js',
    '<rootDir>/src/lib/utils.js',
    '<rootDir>/src/generated/',
  ],
  
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/components/ui/**',        // UIコンポーネントを除外
    '!src/components/login/session-provider.jsx',
    '!src/hooks/use-mobile.js',
    '!src/lib/utils.js',
    '!src/generated/**',            // 生成されたファイルを除外
  ],
}


module.exports = createJestConfig(customJestConfig)
