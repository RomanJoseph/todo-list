import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-node';
import promisePlugin from 'eslint-plugin-promise';
import securityPlugin from 'eslint-plugin-security';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: [
      'node_modules',
      'dist',
      'src/shared/infra/http/documentation/*',
      'src/shared/helpers/filter/*',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      node: nodePlugin,
      security: securityPlugin,
      sonarjs: sonarjsPlugin,
      promise: promisePlugin,
    },
    rules: {
      // TypeScript Rules
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',

      // JavaScript/Node.js Rules
      'node/no-unsupported-features/es-syntax': 'off',
      'node/no-unpublished-import': 'off',
      'node/no-extraneous-import': 'error',

      // Import/Order Rules
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'error',

      // Security Rules
      'security/detect-object-injection': 'warn',
      'security/detect-child-process': 'error',
      'security/detect-non-literal-require': 'error',
      'security/detect-non-literal-fs-filename': 'error',
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-unsafe-regex': 'warn',

      // SonarJS Rules (Quality and Maintainability)
      'sonarjs/no-duplicate-string': 'error',
      'sonarjs/no-collapsible-if': 'error',
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/cognitive-complexity': ['warn', 15],
      'sonarjs/no-redundant-jump': 'error',

      // Promise Rules
      'promise/always-return': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-return-wrap': 'error',

      // Code Quality/Best Practices
      'no-console': 'warn',
      curly: 'error',
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-throw-literal': 'error',
      'no-return-await': 'error',
      'consistent-return': 'error',
      'no-shadow': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message:
            'for...in loops iterate over the entire prototype chain, which is usually not what you want. Use Object.keys() or Object.entries() instead.',
        },
        {
          selector: 'LabeledStatement',
          message:
            'Labels are a form of GOTO; using them makes code confusing and hard to maintain.',
        },
        {
          selector: 'WithStatement',
          message:
            '`with` is disallowed in strict mode because it makes code unpredictable and difficult to optimize.',
        },
      ],
      'no-await-in-loop': 'error',
    },
    overrides: [
      {
        files: ['**/AddAvatarUseCase.js'],
        rules: {
          'security/detect-non-literal-fs-filename': 'off',
        },
      },
    ],
  },
  // Prettier integration to enforce consistent formatting
  prettier,
];
