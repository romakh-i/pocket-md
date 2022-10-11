module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  globals: {
    React: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parser': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  plugins: ['import', 'react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'ignore',
      },
    ],
    'max-len': ['error', 120],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-explicit-any': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z][a-z]',
          match: false,
        },
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'explicit-module-boundary-types': 'off',
    'arrow-body-style': 'off',
    'import/no-unresolved': ['error', { ignore: ['.css', '.scss', '.sass'] }],
    'jsx-a11y/anchor-is-valid': 'off',
    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc' },
        'newlines-between': 'always',
        groups: ['external', 'internal', 'parent', 'index', 'sibling'],
      },
    ],
    'import/extensions': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-undef': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-fragments': ['error', 'syntax'],
    'padding-line-between-statements': 'off',
    'no-loss-of-precision': 'off',
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['const', 'let', 'export'],
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'export'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'export'],
        next: ['const', 'let', 'export'],
      },
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'if',
          'class',
          'for',
          'do',
          'while',
          'switch',
          'try',
          'default',
          'interface',
        ],
      },
      {
        blankLine: 'always',
        prev: [
          'if',
          'class',
          'for',
          'do',
          'while',
          'switch',
          'try',
          'interface',
        ],
        next: '*',
      },
      { blankLine: 'always', prev: '*', next: 'return' },
      {
        blankLine: 'never',
        prev: ['case'],
        next: ['case'],
      },
      {
        blankLine: 'always',
        prev: ['block-like'],
        next: ['case'],
      },
      {
        blankLine: 'always',
        prev: ['block-like', 'expression'],
        next: ['break'],
      },
    ],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        interfaces: {
          memberTypes: ['field', 'signature', 'method'],
          order: 'alphabetically',
        },
      },
    ],
  },
};
