/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

// THIS IS A MODIFIED VERSION OF
// https://github.com/pablolizardo/next-list/blob/main/index.js

// this will script that will generate a list of frontend pages

const FILE_PATTERNS = {
    PAGE: "page.tsx",
};

const appDirectory = fs.existsSync(path.join(process.cwd(), "app"))
    ? path.join(process.cwd(), "app")
    : fs.existsSync(path.join(process.cwd(), "src/app"))
      ? path.join(process.cwd(), "src/app")
      : null;

if (!appDirectory) {
    console.error('🚫 This tool only works with projects using an "app" directory.');
    process.exit(1);
}

const fileContentsCache = new Map();
// let currentFilePath = null;
let currentFileContent = null;

function setCurrentFile(filePath) {
    currentFilePath = filePath;
    currentFileContent = fileContentsCache.has(filePath)
        ? fileContentsCache.get(filePath)
        : fs.readFileSync(filePath, "utf8");
    fileContentsCache.set(filePath, currentFileContent);
}

function extractExportedFunction() {
    const match =
        currentFileContent.match(/export default (?:async\s+)?function\s+(\w+)/) ||
        currentFileContent.match(/export default (\w+)/);

    return match ? match[1] : null;
}

// this will output a json file array of object type
// { function: functionName, route: route }[]
function listRoutes(dir = appDirectory, baseRoute = "") {
    let routes = [];
    try {
        fs.readdirSync(dir, { withFileTypes: true }).forEach((dirent) => {
            const fullPath = path.join(dir, dirent.name);
            if (dirent.isDirectory() && !dirent.name.startsWith("_")) {
                routes = routes.concat(listRoutes(fullPath, `${baseRoute}/${dirent.name}`));
            } else if (dirent.isFile() && dirent.name === FILE_PATTERNS.PAGE) {
                setCurrentFile(fullPath);

                // with grouped routes
                const route = `${baseRoute}/`.replace(/\/+/g, "/");

                // without grouped routes
                // const route = `${baseRoute}/`
                //     .replace(/\((.*?)\)/g, "") // remove (group) segments
                //     .replace(/\/+/g, "/"); // normalize slashes

                const functionName = extractExportedFunction() || "default";
                routes.push({ url: route, name: functionName });
            }
        });
    } catch (error) {
        console.error(`❌ Error reading ${dir}:`, error.message);
    }

    // remove dynamic routes
    routes = routes.filter((route) => !route.url.match(/\[(.*?)\]/g));

    return routes;
}

module.exports = listRoutes;
