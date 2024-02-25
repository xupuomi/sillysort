import * as fs from 'fs';
import * as path from 'path';
import { generateJson } from './llm_grouper.js';

var commands = []

// fs.readFile("/Users/kaustubhkhulbe/Documents/2024/CS/SillySort/backend/data.json", function (error, content) {
//     var data = JSON.parse(content);
//     // console.log(data);
//     const absolutePath = "User/....";
//     allCommands(data, "", absolutePath);
//     console.log(commands)
// });

generateOutput("/Users/kaustubhkhulbe/Downloads");

async function generateOutput(filePath) {
    const json = readDir(filePath);
    var res = await generateJson(json);
    allCommands(res, "", filePath);
    console.log(commands);
}

function readDir(dir) {
    // console.log("Started.");
    const files = readFilesSync(dir);
    var fileNameObj = {}
    for (const [key, value] of Object.entries(files)) {
        fileNameObj[value['name']] = {
            "filepath": value['filepath'],
        }
            
    }

    return fileNameObj
}
function readFilesSync(dir) {
    const files = [];
  
    fs.readdirSync(dir).forEach(filename => {
      const name = path.parse(filename).name;
      const ext = path.parse(filename).ext;
      const filepath = path.resolve(dir, filename);
      const stat = fs.statSync(filepath);
      const isFile = stat.isFile();
  
      files.push({ filepath, name, ext, stat });
    });
  
    files.sort((a, b) => {
      // natural sort alphanumeric strings
      // https://stackoverflow.com/a/38641281
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });
  
    return files;
  }

function allCommands(data, curr_path, absolutePath) {
    // console.log(data)
    for (const [key, value] of Object.entries(data)) {
        if (!Array.isArray(value)) {
            // console.log(key + ",fsd " + value)
            allCommands(value, curr_path + "/" + key, absolutePath)
        }
        else addCommands(key, value, curr_path, absolutePath)
    }
}

function addCommands(name, data, curr_path, absolutePath) {
    commands.push(`mkdir -p ${curr_path}/${name}`)
    for (var i = 0; i < data.length; i++) {
        commands.push(`mv ${absolutePath}/${data[i]} ${absolutePath}/${curr_path}/${name}/${data[i]}`)
    }
}

// function deleteCommands(data, curr_path) {
//     for (var i = 0; i < data.length; i++) {
//         commands.push(`rm -rf ${data[i]}`)
//     }
// }

function printCommands() {
    for (var i = 0; i < commands.length; i++) {
        console.log(`[COMMAND ${i}]: ` + commands[i])
    }
}