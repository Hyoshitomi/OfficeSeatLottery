import eslintPluginNext from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginReact from 'eslint-plugin-react';

export default [
  {
    ignores: [
      'coverage/**',
      '**/node_modules/**',
      '**/.next/**',
      'src/components/ui/**',
      'src/generated/**',
      '**/*.d.ts',
    ],
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': eslintPluginNext,
      import: eslintPluginImport,
      'unused-imports': eslintPluginUnusedImports,
      react: eslintPluginReact,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Reactコンポーネント検出
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      
      // 未使用import検出
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_', // アンダースコア変数を無視
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_' // 追加
        }
      ],
      
      // その他の設定
      'import/order': 'error',
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      ...eslintPluginNext.configs.recommended.rules,
      ...prettierConfig.rules,
    },
  },
];
