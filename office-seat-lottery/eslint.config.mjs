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
    
    // 具体的なリンティングルールの設定
    rules: {
      // // === React関連のルール ===
      // 'react/jsx-uses-react': 'error',     // JSX使用時のReact変数検出
      // 'react/jsx-uses-vars': 'error',      // JSX内で使用される変数の検出
      // 'react/react-in-jsx-scope': 'off',   // React 17+ではReactインポート不要
      // 'react/jsx-pascal-case': 'error',    // コンポーネント名はPascalCaseを強制
      // 'react/jsx-no-useless-fragment': 'error', // 不要なReact.Fragmentの禁止
      // 'react/jsx-no-duplicate-props': 'error',  // JSXプロパティの重複禁止
      // 'react/jsx-no-undef': 'error',       // 未定義コンポーネントの使用禁止
      // 'react/no-danger': 'warn',           // dangerouslySetInnerHTMLの使用警告
      // 'react/no-array-index-key': 'warn',  // 配列インデックスをkeyとする使用の警告
      
      // // === 未使用変数・import関連のルール ===
      // 'unused-imports/no-unused-imports': 'error', // 未使用importの検出・エラー化
      // 'unused-imports/no-unused-vars': [   // 未使用変数の検出設定
      //   'error',
      //   {
      //     varsIgnorePattern: '^_',         // アンダースコア始まりの変数は無視
      //     argsIgnorePattern: '^_',         // アンダースコア始まりの引数は無視
      //     caughtErrorsIgnorePattern: '^_'  // アンダースコア始まりのcatchエラーは無視
      //   }
      // ],
      // 'no-unused-vars': 'off',             // 標準の未使用変数チェックを無効化
      
      // // === コード複雑度制御ルール ===
      // 'complexity': ['error', { max: 10 }], // 循環的複雑度を10以下に制限
      // 'max-depth': ['error', 4],           // ネストレベルを4以下に制限
      // 'max-params': ['error', 4],          // 関数パラメータ数を4以下に制限
      // 'max-lines-per-function': ['error', { // 関数の行数制限
      //   max: 50,                           // 最大50行
      //   skipBlankLines: true,              // 空行はカウントしない
      //   skipComments: true                 // コメント行はカウントしない
      // }],
      
      // // === コード品質向上ルール ===
      // 'consistent-return': 'error',        // 一貫したreturn文の使用を強制
      // 'default-case': 'error',             // switch文でdefaultケースを強制
      // 'eqeqeq': ['error', 'always'],       // 厳密等価演算子（===）の使用を強制
      // 'no-else-return': 'error',           // 不要なelse文の禁止
      // 'no-empty': 'error',                 // 空のブロック文の禁止
      // 'no-dupe-keys': 'error',             // オブジェクトキーの重複禁止
      // 'no-unreachable': 'error',           // 到達不可能なコードの禁止
      // 'no-undef': 'error',                 // 未定義変数の使用禁止
      // 'no-redeclare': 'error',             // 変数の再宣言禁止
      // 'no-useless-constructor': 'error',   // 不要なコンストラクタの禁止（修正済み）
      
      // // === モダンJavaScript推奨ルール ===
      // 'prefer-const': 'error',             // 再代入されない変数にはconstを使用
      // 'prefer-arrow-callback': 'error',    // アロー関数の使用を推奨
      // 'prefer-template': 'error',          // テンプレートリテラルの使用を推奨
      // 'object-shorthand': 'error',         // オブジェクトの短縮記法を推奨
      // 'prefer-destructuring': ['error', {  // 分割代入の使用を推奨
      //   array: true,                       // 配列の分割代入
      //   object: true                       // オブジェクトの分割代入
      // }, {
      //   enforceForRenamedProperties: false // リネーム時は強制しない
      // }],
      
      // // === 命名規則ルール ===
      // 'camelcase': ['error', { properties: 'never' }], // キャメルケースを強制（プロパティ除く）
      
      // // === デバッグ・本番環境対応ルール ===
      // 'no-console': 'warn',                // console文の使用を警告
      // 'no-debugger': 'error',              // debugger文の使用を禁止
      // 'no-alert': 'error',                 // alert文の使用を禁止
      
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
      // 'import/no-duplicates': 'error',     // 重複importの禁止
      // 'import/no-unresolved': 'error',     // 存在しないモジュールのimport禁止
      // 'import/no-cycle': 'error',          // 循環依存の禁止
      // 'import/no-self-import': 'error',    // 自己importの禁止
      
      // === 外部プラグインルールの適用 ===
      ...eslintPluginNext.configs.recommended.rules, // Next.js推奨ルールを適用
      ...prettierConfig.rules,             // Prettierとの競合回避ルールを適用
    },
  },
]
