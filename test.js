
const fs = require("fs");
const { dirname } = require("path");
let fileNames = [];
let dirNames = [];

dirNames = fs.readdirSync("./data");

for(let i = 0; i < dirNames.length; i++)
{
    let tempFiles = fs.readdirSync("./data/" + dirNames[i] + "/files");
    fileNames.push(tempFiles);
}
console.log(fileNames);