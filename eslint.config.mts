import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "dist/**",
      "generated/**",
      "docs/**",
      "samples/**",
      "jest.config.js",
      "lint-staged.config.js",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierRecommended,
  {
    files: ["src/**/*.ts", "tests/**/*.ts", "utils/**/*.ts"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },
    rules: {
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "no-bitwise": "off",
      "no-underscore-dangle": "off",
      "no-plusplus": "off",
      "default-case": "warn",
      "no-inline-comments": "off",
    },
  },
]);
