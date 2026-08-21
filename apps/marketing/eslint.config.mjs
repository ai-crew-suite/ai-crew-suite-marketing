import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // eslint-config-next sets react.version to "detect", but
  // eslint-plugin-react@7.37.x detects it via context.getFilename(), an API
  // removed in ESLint 10. Pin the version explicitly to skip detection until
  // an ESLint 10-compatible eslint-plugin-react release is available.
  {
    settings: {
      react: {
        version: "19.2",
      },
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
