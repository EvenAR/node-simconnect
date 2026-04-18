const { accessSync, constants, existsSync } = require('node:fs');
const { join } = require('node:path');
const { install } = require('husky');

function canWriteGitConfig() {
    try {
        accessSync(join(process.cwd(), '.git', 'config'), constants.W_OK);
        return true;
    } catch {
        return false;
    }
}

if (!existsSync(join(process.cwd(), '.git'))) {
    console.log('husky - skipping install (.git not found)');
    process.exit(0);
}

if (!canWriteGitConfig()) {
    console.log('husky - skipping install (.git/config is not writable)');
    process.exit(0);
}

install();
