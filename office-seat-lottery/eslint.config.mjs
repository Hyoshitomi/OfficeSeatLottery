import eslintPluginNext from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ignores: [
      '**/.next/**/*',
      '**/*.d.ts', // 型定義ファイルをlint対象外に
    ],
    plugins: {
      '@next/next': eslintPluginNext,
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
      // import関連すべて無効化
      'import/order': 'off',
      'import/newline-after-import': 'off',
      'import/no-duplicates': 'off',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-unused-modules': 'off',
      'import/first': 'off',
      'import/extensions': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-cycle': 'off',
      'import/no-deprecated': 'off',
      'import/no-mutable-exports': 'off',
      'import/no-amd': 'off',
      'import/no-commonjs': 'off',
      'import/no-nodejs-modules': 'off',
      'import/prefer-default-export': 'off',
      'import/no-anonymous-default-export': 'off',
      'import/group-exports': 'off',
      'import/dynamic-import-chunkname': 'off',
      'sort-imports': 'off',
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      // Next.js関連警告も無効化したい場合
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'off',

      // PrettierやNext.jsのルール
      ...eslintPluginNext.configs.recommended.rules,
      ...prettierConfig.rules,
    },
  },
];
