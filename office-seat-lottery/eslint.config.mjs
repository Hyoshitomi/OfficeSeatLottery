// Next.js用ESLintプラグインのインポート
import eslintPluginNext from '@next/eslint-plugin-next';
// Prettierとの競合を避けるための設定
import prettierConfig from 'eslint-config-prettier';
// import文の順序や依存関係をチェックするプラグイン
import eslintPluginImport from 'eslint-plugin-import';
// 未使用のimport文を検出・削除するプラグイン
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
// React特有のルールを提供するプラグイン
import eslintPluginReact from 'eslint-plugin-react';
// TypeScript ESLintプラグインとパーサーのインポート
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

// ESLint設定をエクスポート（配列形式の新しいFlat Config）
export default [
  {
    // リンティング対象から除外するファイル・ディレクトリ
    ignores: [
      'coverage/**',        // テストカバレッジファイル
      '**/node_modules/**', // 依存関係パッケージ
      '**/.next/**',        // Next.jsビルド出力
      'src/components/ui/**', // UIライブラリコンポーネント
      'src/generated/**',   // 自動生成ファイル
      '**/*.d.ts',         // TypeScript型定義ファイル
    ],
  },
  {
    // リンティング対象ファイルの指定（JavaScriptとJSXのみ）
    files: ['src/**/*.{js,jsx}'],
    
    // 使用するESLintプラグインの登録
    plugins: {
      '@next/next': eslintPluginNext,           // Next.js特有のルール
      import: eslintPluginImport,               // import/export関連ルール
      'unused-imports': eslintPluginUnusedImports, // 未使用import検出
      react: eslintPluginReact,                 // React特有のルール
    },
    
    // JavaScript言語設定
    languageOptions: {
      ecmaVersion: 2022,    // ECMAScript 2022の機能を使用
      sourceType: 'module', // ES Modulesを使用
      parserOptions: {
        ecmaVersion: 2022,  // パーサーのECMAScriptバージョン
        sourceType: 'module', // モジュール形式の指定
        ecmaFeatures: {
          jsx: true,        // JSX構文を有効化
        },
      },
    },
    
    // React設定
    settings: {
      react: {
        version: 'detect',  // Reactバージョンの自動検出
      },
    },
    
    // 具体的なリンティングルールの設定
    rules: {
      // === 改行・空白・タブ統一ルール ===
      'no-trailing-spaces': 'error',              // 行末の余分な空白を禁止
      'no-irregular-whitespace': 'error',         // 不正な空白文字の使用を禁止
      'no-whitespace-before-property': 'error',   // プロパティアクセス前の空白を禁止
      'linebreak-style': ['error', 'unix'],       // Unix形式の改行（LF）を強制
      'indent': ['error', 2],                     // 2スペースインデントを強制
      'eol-last': 'error',                        // ファイル末尾に改行を強制
      'no-multiple-empty-lines': ['error', {      // 連続する空行を制限
        max: 2,                                   // 最大2行まで
        maxEOF: 1,                               // ファイル末尾は1行まで
        maxBOF: 0                                // ファイル先頭は0行
      }],
      'comma-dangle': ['error', 'always-multiline'], // 複数行での末尾カンマを強制
      'semi': ['error', 'always'],                // セミコロンを強制
      'quotes': ['error', 'single'],              // シングルクォートを強制
      
      // === React関連のルール ===
      'react/jsx-uses-react': 'error',     // JSX使用時のReact変数検出
      'react/jsx-uses-vars': 'error',      // JSX内で使用される変数の検出
      'react/react-in-jsx-scope': 'off',   // React 17+ではReactインポート不要
      'react/jsx-pascal-case': 'error',    // コンポーネント名はPascalCaseを強制
      'react/jsx-no-useless-fragment': 'error', // 不要なReact.Fragmentの禁止
      'react/jsx-no-duplicate-props': 'error',  // JSXプロパティの重複禁止
      'react/jsx-no-undef': 'error',       // 未定義コンポーネントの使用禁止
      'react/no-danger': 'warn',           // dangerouslySetInnerHTMLの使用警告
      'react/no-array-index-key': 'warn',  // 配列インデックスをkeyとする使用の警告
      
      // === 未使用変数・import関連のルール ===
      'unused-imports/no-unused-imports': 'error', // 未使用importの検出・エラー化
      'unused-imports/no-unused-vars': [   // 未使用変数の検出設定
        'error',
        {
          varsIgnorePattern: '^_',         // アンダースコア始まりの変数は無視
          argsIgnorePattern: '^_',         // アンダースコア始まりの引数は無視
          caughtErrorsIgnorePattern: '^_'  // アンダースコア始まりのcatchエラーは無視
        }
      ],
      'no-unused-vars': 'off',             // 標準の未使用変数チェックを無効化
      
      // === import/export関連の詳細ルール ===
      'import/order': [                    // import文の順序を制御
        'error',
        {
          groups: [                        // importグループの順序定義
            'builtin',                     // Node.js組み込みモジュール
            'external',                    // 外部パッケージ
            'internal',                    // 内部モジュール
            'parent',                      // 親ディレクトリ
            'sibling',                     // 同階層ファイル
            'index'                        // インデックスファイル
          ],
          'newlines-between': 'always',    // グループ間に空行を強制
          alphabetize: {                   // アルファベット順ソート
            order: 'asc',                  // 昇順
            caseInsensitive: true          // 大文字小文字を区別しない
          }
        }
      ],
      'import/no-duplicates': 'error',     // 重複importの禁止
      'import/no-cycle': 'error',          // 循環依存の禁止
      'import/no-self-import': 'error',    // 自己importの禁止
      
      // === コード品質向上ルール ===
      'consistent-return': 'error',        // 一貫したreturn文の使用を強制
      'default-case': 'error',             // switch文でdefaultケースを強制
      'eqeqeq': ['error', 'always'],       // 厳密等価演算子（===）の使用を強制
      'no-else-return': 'error',           // 不要なelse文の禁止
      'no-empty': 'error',                 // 空のブロック文の禁止
      'no-dupe-keys': 'error',             // オブジェクトキーの重複禁止
      'no-unreachable': 'error',           // 到達不可能なコードの禁止
      'no-redeclare': 'error',             // 変数の再宣言禁止
      'no-useless-constructor': 'error',   // 不要なコンストラクタの禁止
      
      // === モダンJavaScript推奨ルール ===
      'prefer-const': 'error',             // 再代入されない変数にはconstを使用
      'prefer-arrow-callback': 'error',    // アロー関数の使用を推奨
      'prefer-template': 'error',          // テンプレートリテラルの使用を推奨
      'object-shorthand': 'error',         // オブジェクトの短縮記法を推奨
      'prefer-destructuring': ['error', {  // 分割代入の使用を推奨
        array: true,                       // 配列の分割代入
        object: true                       // オブジェクトの分割代入
      }, {
        enforceForRenamedProperties: false // リネーム時は強制しない
      }],
      
      // === 命名規則ルール ===
      'camelcase': ['error', { properties: 'never' }], // キャメルケースを強制（プロパティ除く）
      
      // === コード複雑度制御ルール ===
      'complexity': ['error', { max: 10 }], // 循環的複雑度を10以下に制限
      'max-depth': ['error', 4],           // ネストレベルを4以下に制限
      'max-params': ['error', 4],          // 関数パラメータ数を4以下に制限
      'max-lines-per-function': ['error', { // 関数の行数制限
        max: 200,                           // 関数ごとの最大行数
        skipBlankLines: true,              // 空行はカウントしない
        skipComments: true                 // コメント行はカウントしない
      }],
      
      // === デバッグ・本番環境対応ルール ===
      'no-console': 'warn',                // console文の使用を警告
      'no-debugger': 'error',              // debugger文の使用を禁止
      'no-alert': 'error',                 // alert文の使用を禁止
      
      // === 外部プラグインルールの適用 ===
      ...eslintPluginNext.configs.recommended.rules, // Next.js推奨ルールを適用
      ...prettierConfig.rules,             // Prettierとの競合回避ルールを適用
    },
  },
  // TypeScriptファイル用の設定
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json', // parserServicesに必要
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      '@next/next': eslintPluginNext,
      import: eslintPluginImport,
      'unused-imports': eslintPluginUnusedImports,
      react: eslintPluginReact,
    },
    settings: {
      react: {
        version: 'detect',  // Reactバージョンの自動検出
      },
    },
    rules: {
      // 既存のJavaScriptルールを継承
      ...eslintPluginNext.configs.recommended.rules,
      ...prettierConfig.rules,
      
      // === TypeScript用改行・空白・タブ統一ルール ===
      'no-trailing-spaces': 'error',
      'no-irregular-whitespace': 'error',
      'no-whitespace-before-property': 'error',
      'linebreak-style': ['error', 'unix'],
      '@typescript-eslint/indent': ['error', 2], // TypeScript用インデント
      'indent': 'off', // TypeScript版を使用するため無効化
      'eol-last': 'error',
      'no-multiple-empty-lines': ['error', {
        max: 2,
        maxEOF: 1,
        maxBOF: 0
      }],
      'comma-dangle': ['error', 'always-multiline'],
      '@typescript-eslint/semi': ['error', 'always'], // TypeScript用セミコロン
      'semi': 'off', // TypeScript版を使用するため無効化
      'quotes': ['error', 'single'],
      
      // TypeScript特有の空白ルール
      '@typescript-eslint/type-annotation-spacing': 'error', // 型注釈の空白
      '@typescript-eslint/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      }],
      
      // TypeScript特有の命名規則
      '@typescript-eslint/naming-convention': [
        'error',
        // デフォルト: camelCase
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // 変数: camelCase、UPPER_CASE、PascalCase（React コンポーネント用）
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        // 関数: camelCase、PascalCase（React コンポーネント用）
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        // 型・インターフェース・クラス: PascalCase
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        // 定数: UPPER_CASE
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
        },
        // プロパティ: 柔軟に（APIレスポンス対応）
        {
          selector: 'property',
          format: ['camelCase', 'snake_case', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        // インポート: 制限なし（外部ライブラリ対応）
        {
          selector: 'import',
          format: null,
        },
      ],
      
      // TypeScript用の他のルール
      '@typescript-eslint/no-unused-vars': ['error', {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],
      'no-unused-vars': 'off', // TypeScript版を使用するため無効化
    },
  },
];
