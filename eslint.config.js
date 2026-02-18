const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.extends('prettier', 'plugin:react/recommended', 'next/core-web-vitals'),
  {
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'no-unused-vars': 'off',
      'sort-imports': [
        'error',
        { ignoreCase: true, ignoreDeclarationSort: true },
      ],
      'import/order': [
        'warn',
        {
          groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
          pathGroups: [
            { pattern: 'env', group: 'internal' },
            { pattern: 'types', group: 'internal' },
            { pattern: 'components/**', group: 'internal' },
            { pattern: 'contexts/**', group: 'internal' },
            { pattern: 'hooks/**', group: 'internal' },
            { pattern: 'pages/**', group: 'internal' },
            { pattern: 'views/**', group: 'internal' },
            { pattern: 'utils/**', group: 'internal' },
            { pattern: 'public/**', group: 'internal', position: 'after' },
            { pattern: 'posts/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['internal'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];
