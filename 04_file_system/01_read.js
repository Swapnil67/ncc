const fs = require("fs");

const content = fs.readFileSync("file.txt");

console.log("content ", content.toString());