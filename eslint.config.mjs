import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    eslintConfigPrettier,
    {
        ignores: [
            ".next/**",
            "dist/**",
            "node_modules/**",
            "docker-entrypoint.js",
            "src/libs/types/next-auth.d.ts",
        ],
    },
];

export default eslintConfig;
