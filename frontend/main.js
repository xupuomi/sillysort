const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'SILLYsort',
        width: 1200,
        height: 800,
        resizable: false
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



app.on('window-all-closed', () => {
    if(!isMac){
        app.quit()
    }
})

const ipc = require('electron').ipcRenderer; 

function goToSortWindow(){ 
    console.log("HERE");
    ipc.send('openSortWindow');   
}

function createSortWindow() { 
    sortWindow = new BrowserWindow({ 
        width: 1000, 
        height: 700, 
        modal: true, 
        show: false, 
        parent: mainWindow, // Make sure to add parent window here 

        // Make sure to add webPreferences with below configuration 
        webPreferences: { 
        nodeIntegration: true, 
        contextIsolation: false, 
        enableRemoteModule: true, 
        }, 
    }); 

    // sort window loads settings.html file 
    sortWindow.loadFile("../endpage.html"); 

    sortWindow.once("ready-to-show", () => { 
        sortWindow.show(); 
    }); 
}

ipcMain.on("openSortWindow", (event, arg) => { 
    console.log("HERE");
    createSortWindow(); 
}); 