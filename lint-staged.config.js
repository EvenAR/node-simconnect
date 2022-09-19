module.exports = {
    '**/*.ts': () => 'tsc --noEmit',
    '**/*.(ts|js)': (filenames) => [
        `eslint --fix ${filenames.join(' ')}`,
        `prettier --write ${filenames.join(' ')}`,
    ],
    '**/*.(md|json)': (filenames) => `prettier --write ${filenames.join(' ')}`,
};
