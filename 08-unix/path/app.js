const fs = require("node:fs");
const path = require("node:path");
require("./file.js");

// * Node path
console.log("Working Directory: \n", process.cwd());

// * Current folder where this app.js exists
console.log("__dirname: \n", __dirname);

// * This will not work from -> node path/app.js
// const content = fs.readFileSync("./text.txt", "utf8");

// * Solution -> Use Absolute Path
// const content = fs.readFileSync(path.join(__dirname, "./text.txt"), "utf8");
// 
// * This works from -> node path/app.js
// * This works because fs module by default works on absolute path
// const content = fs.readFileSync("/Users/swapnil67/Developer/Backend_engineering/NCC/08-unix/path/text.txt", "utf8");

console.log(content);
