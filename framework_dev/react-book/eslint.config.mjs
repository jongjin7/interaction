/** @type {import('eslint').Linter.Config[]} */
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], // 지원하는 파일 확장자 설정
        env: {
            "jest": true
        }
    },
    {
        languageOptions: {
            globals: globals.browser, // 글로벌 변수 설정
            parserOptions: {
                ecmaVersion: 2021, // 최신 ECMAScript 버전 (2021)
                sourceType: "module", // ES 모듈 사용
                ecmaFeatures: {
                    jsx: true, // JSX 문법 지원
                },
            },
        },
    },
    pluginJs.configs.recommended, // JavaScript 관련 추천 설정
    ...tseslint.configs.recommended, // TypeScript 관련 추천 설정
    pluginReact.configs.flat.recommended, // React 관련 추천 설정
];
