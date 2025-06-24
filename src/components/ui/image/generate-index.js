const fs = require("fs");
const path = require("path");

//
// generate image export based on image on current folder
// node '.\src\components\ui\image\generate-index.js'
//

// Allowed image extensions
const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp", ".svg", ".img"];

const files = fs.readdirSync(__dirname); // current folder

// read all image files in the current folder
// check for valid extension and filter
const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
});

const exportedImage = imageFiles.map((file) => {
    const baseName = path.basename(file, path.extname(file));
    // convert kabab to snake_case
    const safeName = baseName.replace(/[^a-zA-Z0-9_$]/g, "_");
    return `export { default as ${safeName} } from "./${file}";`;
});

const indexContent = exportedImage.join("\n") + "\n";

fs.writeFileSync(path.join(__dirname, "index.ts"), indexContent);

console.log("index.ts generated with exports for:");
imageFiles.forEach((f) => console.log(" -", f));
