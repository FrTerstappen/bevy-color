import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";
import packageJson from "eslint-plugin-package-json";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tsParser from "@typescript-eslint/parser";

export default tseslint.config(
    globalIgnores(["dist/**/*"], "Ignore build directory"),
    eslint.configs.recommended,
    eslintConfigPrettier,
    {
        extends: [eslintPluginUnicorn.configs.recommended],
        rules: {
            "unicorn/numeric-separators-style": [
                "error",
                {
                    onlyIfContainsSeparator: true,
                },
            ],
            "unicorn/no-zero-fractions": "off",
            "unicorn/filename-case": [
                "error",
                {
                    case: "camelCase",
                },
            ],
        },
    },
    {
        files: ["**/package.json"],
        extends: [packageJson.configs.recommended],
        languageOptions: {
            parserOptions: {
                extraFileExtensions: [".json"],
            },
        },
    },
    {
        files: ["**/*.ts"],
        extends: [
            tseslint.configs.eslintRecommended,
            tseslint.configs.strictTypeChecked,
            tseslint.configs.stylisticTypeChecked,
        ],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
            parser: tsParser,
            ecmaVersion: 2022,
            sourceType: "module",
        },
        rules: {
            "@typescript-eslint/naming-convention": [
                "warn",
                {
                    selector: "import",
                    format: ["camelCase", "PascalCase"],
                },
            ],
        },
    },
    {
        rules: {
            curly: "warn",
            eqeqeq: "warn",
            "no-throw-literal": "warn",
            semi: "warn",
        },
    }
);
