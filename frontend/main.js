const path = require('path');
const { app, BrowserWindow } = require('electron');
const exec = require('child_process').exec;

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'SILLYsort',
        width: isDev ? 1000 : 500,
        height: 600
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

app.on('window-all-closed', () => {
    if(!isMac){
        app.quit()
    }
})