module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "no-console": 1,
    "comma-dangle": ["error", "always-multiline"],
    "no-async-promise-executor": 0,
    "no-misleading-character-class": 0,
    "no-useless-catch": 0,
    "require-atomic-updates": 0
  }
};
