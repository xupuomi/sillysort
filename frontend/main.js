// import * as fs from 'fs';
// import * as path from 'path';

const fs = require('fs')
const path = require('path')
const chat_google = require("@langchain/google-genai");
const generative = require("@google/generative-ai");
const dotenv = require("dotenv")
dotenv.config();

var commands = []

// generateOutput("/Users/kaustubhkhulbe/Downloads/");

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

// console.log(process.env.GOOGLE_API_KEY);

async function generateJson(json) {
    const model = new chat_google.ChatGoogleGenerativeAI({
        modelName: "gemini-pro",
        maxOutputTokens: 4096,
        temperature: 0.01,
        apiKey: process.env.GOOGLE_API_KEY,
      });

    var data = json;
    const res = await model.invoke([
        [
          "human",
          `
          You are a file organizing agent, who organizes files based on filenames. You will be given a json of all the file names in the current directory.
    
          You will then return a file directory structure in the form of a JSON, where the keys are the names of subdirectories, and the values are arrays of filenames. Try to be specific with category names.
          
          Make sure to return only a JSON file.
          
          Filenames:
          ${JSON.stringify(json)}
          `,
        ],
      ]);
    console.log(res.content);
    let begin = 0;
    let end = 0;
    for (let i = 0; i < res.content.length; i++) {
      if (res.content[i] == "{") {
        begin = i;
        break;
      }
    }
    for (let i = res.content.length - 1; i >= 0; i--) {
      if (res.content[i] == "}") {
        end = i;
        break;
      }
    }
    console.log(res.content.substring(begin, end+1));
    return JSON.parse(res.content.substring(begin, end+1));
}


const { app, BrowserWindow, ipcMain } = require('electron');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';
// import { * } as kmn from '/Users/kaustubhkhulbe/Documents/2024/CS/SillySort/backend/grouper.js'


function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'SILLYsort',
        width: 1200,
        height: 800,
        resizable: false,
        // The lines below solved the issue
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    //Open devtools if in dev env
    if(isDev){
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));
}
app.whenReady().then(() => {
    createMainWindow();
    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0){
            createMainWindow();
        }
    });
});

let USER_DEFINED_FILE_PATH;

app.on('window-all-closed', () => {
    if(!isMac){
        app.quit()
    }
})

const ipc = require('electron').ipcRenderer; 

ipcMain.on("save", (event, arg) => { 
    console.log("SAVING");
    // createSortWindow(); 
    // kill_me_now.kill_me_now();
    // generateOutput();
    USER_DEFINED_FILE_PATH = arg;
    console.log(USER_DEFINED_FILE_PATH);
    // generateOutput("/Users/kaustubhkhulbe/Downloads/");
}); 

ipcMain.on("sort", (event, arg) => { 
    console.log("HERE2");
    // createSortWindow(); 
    // kill_me_now.kill_me_now();
    // generateOutput();
    console.log(USER_DEFINED_FILE_PATH);
    // generateOutput("/Users/kaustubhkhulbe/Downloads/");
}); 