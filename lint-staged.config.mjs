/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  "apps/backend/*.{js,mjs,cjs,ts,mts,cts}":
    "eslint -c apps/backend/eslint.config.mjs --max-warnings 0",
  "*": "prettier --write --ignore-unknown",
};
