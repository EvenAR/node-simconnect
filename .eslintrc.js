module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    env: {
        browser: false,
        node: true,
        es6: true,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.ts'],
            },
        },
    },
    plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'airbnb-typescript/base',
        'prettier',
        'plugin:prettier/recommended',
    ],
    rules: {
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                ts: 'never',
            },
        ],
        'import/prefer-default-export': 'off',
        'no-plusplus': 'off',
        'import/no-import-module-exports': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'no-bitwise': 'off',
        'no-underscore-dangle': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'no-inline-comments': 'off',
        'default-case': 'warn',
    },
};
