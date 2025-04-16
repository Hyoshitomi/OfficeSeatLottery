import { dirname } from 'path';
import { fileURLToPath } from 'url';
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import tailwind from 'eslint-plugin-tailwindcss';
import eslintConfigPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  files: ["src/**/*.{js,jsx,ts,tsx}"],
  ignores: ["**/.next/**/*"],
  extends: [
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  plugins: {
    import: importPlugin,
    "unused-imports": unusedImports,
    tailwindcss: tailwind,
  },
  rules: {
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "always",
      },
    ],
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "unused-imports/no-unused-imports": "error",
    "tailwindcss/no-custom-classname": "off",
  },
  settings: {
    tailwindcss: {
      config: "tailwind.config.js",
    },
  },
};
