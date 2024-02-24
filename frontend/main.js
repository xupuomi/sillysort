const path = require('path');
const { app, BrowserWindow } = require('electron');

const isMac = process.platform === 'darwin';
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'SILLYsort',
        width: 500,
        height: 600
    });

    mainWindow.loadFile(path.join(_dirname, './renderer/index.html'));
}
app.whenReady().then(() => {
    createMainWindow();
});

app.on('window-all-closed', () => {
    if(!isMac){
        app.quit()
    }
})