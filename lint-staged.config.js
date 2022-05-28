module.exports = {
    '**/*.ts': () => 'yarn tsc --noEmit',
    '**/*.(ts|js)': (filenames) => [
        `yarn eslint --fix ${filenames.join(' ')}`,
        `yarn prettier --write ${filenames.join(' ')}`,
    ],
    '**/*.(md|json)': (filenames) =>
        `yarn prettier --write ${filenames.join(' ')}`,
};
