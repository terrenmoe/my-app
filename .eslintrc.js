'use strict';

// The complete configuration hierarchy, from highest precedence
// to lowest precedence:
//    1 Inline configuration
//        1 /*eslint-disable*/ and /*eslint-enable*/
//        2 /*global*/
//        3 /*eslint*/
//        4 /*eslint-env*/
//    2 Command line options (or CLIEngine equivalents):
//        1 --global
//        2 --rule
//        3 --env
//        4 -c, --config
//    3 Project-level configuration:
//        1 .eslintrc.* or package.json file in same directory as
//          linted file
//        2 Continue searching for .eslintrc and package.json
//          files in ancestor directories (parent has highest
//          precedence, then grandparent, etc.), up to and
//          including the root directory or until a config with
//          "root": true is found.
//    4 In the absence of any configuration from (1) through (3),
//    fall back to a personal default configuration in
//    ~/.eslintrc.

module.exports = {
  extends: ['airbnb','react-app'],
  parser: 'babel-eslint',
  root: true,
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'script',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    ['shared-node-browser']: true,
  },
  overrides: [
    {
      files: ['*.jsx'],
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    {
      files: ['*.mjs'],
      parserOptions: { sourceType: 'module' },
      env: { node: true },
      rules: {
        'no-restricted-globals': ['error', 'require'],
      },
    },

    {
      files: ['*.cjs'],
      parserOptions: { sourceType: 'module' },
      env: { commonjs: true },
    },

    {
      files: ['*.web.js'],
      env: { browser: true },
    },
  ],
  rules: {
    'strict': ['error', 'global'],
    'no-bitwise': 'off',
    'no-iterator': 'off',
    'global-require': 'off',
    'quote-props': ['error', 'consistent-as-needed'],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'curly': ['error', 'all'],
    'no-param-reassign': 'off',
    'arrow-parens': ['error', 'always'],
    'no-multi-assign': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'object-curly-newline': 'off',
    'prefer-const': ['error', { destructuring: 'all' }],
    'class-methods-use-this': 'off',
    'operator-linebreak': ['error', 'after'],
    'implicit-arrow-linebreak': 'off',
    'react/no-this-in-sfc': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    // 'react/no-unused-prop-types': '',
  },
  globals: {
    WebAssembly: "readonly",
    BigInt: "readonly",
    BigInt64Array: "readonly",
    BigUint64Array: "readonly",
    URL: "readonly",
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    queueMicrotask: "readonly",
  },
};
