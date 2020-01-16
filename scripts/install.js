const NOT_WINDOWS = process.platform !== "win32";
const YELLOW = '\x1b[33m%s\x1b[0m';

if (NOT_WINDOWS) {
    console.log(YELLOW, `Warning: node-simconnect does not work on ${process.platform}`);
}