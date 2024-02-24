import * as fs from 'fs';
import * as path from 'path';

const filePath = "/Users/kaustubhkhulbe/Documents/2024/CS/SillySort/backend/data.json"
var commands = []
var data = JSON.parse(fs.readFileSync(filePath));
for (const [key, value] of Object.entries(data)) {
    if (key != "Delete") addCommands(key, value)
    else {
        deleteCommands(value)
    }
}

printCommands();
// readDir('/Users/kaustubhkhulbe/Downloads/')
function readDir(dir) {
    const files = readFilesSync(dir);
    var fileNameObj = {}
    for (const [key, value] of Object.entries(files)) {
        fileNameObj[value['name']] = {
            "filepath": value['filepath'],
        }
            
    }

    fs.writeFile("out.json", JSON.stringify(fileNameObj), function(err) {
        if (err) {
            console.log(err);
        }
    });
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