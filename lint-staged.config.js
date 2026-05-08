module.exports = {
    '**/*.{ts}': [
        'eslint --fix',
        'prettier --write',
        () => 'tsc --noEmit', // Run type checking
    ],
    '**/*.{js,json,md,yml,yaml}': ['prettier --write'],
};
