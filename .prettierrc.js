module.exports = {
    tabWidth: 4,
    printWidth: 100,
    endOfLine: "lf",
    arrowParens: "avoid",
    trailingComma: "es5",
    semi: true,
    useTabs: false,
    singleQuote: false,
    bracketSpacing: true,
    overrides: [
        {
            files: "*.json",
            options: {
                tabWidth: 2,
            },
        },
    ],
};
