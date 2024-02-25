import * as fs from 'fs';
import * as path from 'path';
import { generateJson } from './llm_grouper.js';

var commands = []

generateOutput("/Users/kaustubhkhulbe/Downloads/");

async function generateOutput(filePath) {
    const json = readDir(filePath);
    var res = await generateJson(json);
    allCommands(res);
    printCommands();
    // console.log(commands);
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

    // fs.writeFile("/frontend/out.json", JSON.stringify(fileNameObj), function(err) {
    //     if (err) {
    //         console.log(err);
    //     }
    // });
    // console.log("Started.");

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

function allCommands(data) {
    // console.log(data)
    for (const [key, value] of Object.entries(data)) {
        console.log(key + ", " + value)
        if (key != "Delete") addCommands(key, value)
        else {
            deleteCommands(value)
        }
    }
}

function addCommands(name, data) {
    commands.push(`mkdir ${name}`)
    for (var i = 0; i < data.length; i++) {
        commands.push(`mv ${data[i]} ./${name}/${data[i]}`)
    }
}

function deleteCommands(data) {
    for (var i = 0; i < data.length; i++) {
        commands.push(`rm -rf ${data[i]}`)
    }
}

function printCommands() {
    for (var i = 0; i < commands.length; i++) {
        console.log(`[COMMAND ${i}]: ` + commands[i])
    }
}