const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { app, BrowserWindow } = require('electron');
const exec = require('child_process').exec;

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

const { kill_me_now } = require('/Users/kaustubhkhulbe/Documents/2024/CS/SillySort/backend/grouper.cjs');
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

    // cp.execFile('node', path.join(__dirname, '../backend/test.js'));
    // console.log("HERE");
    const child = exec('node ../backend/generate_commands.js',
        (error, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
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


ipcMain.on("sort", (event, arg) => { 
    console.log("HERE2");
    // createSortWindow(); 
    // kill_me_now.kill_me_now();
    kill_me_now();
}); 