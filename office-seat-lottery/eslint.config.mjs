import { dirname } from 'path';
import { fileURLToPath } from 'url';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintPluginNext from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  // Next.js + import系 + Prettier
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ignores: ['**/.next/**/*'],
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
      '@next/next': eslintPluginNext,
    },
    rules: {
      // Next.js推奨ルール
      ...eslintPluginNext.configs.recommended.rules,
      // import系
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      // unused-imports
      'unused-imports/no-unused-imports': 'error',
      // Prettier（必要に応じて）
      ...prettierConfig.rules,
    },
  },
];
