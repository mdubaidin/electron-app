const { app, BrowserWindow } = require('electron');
const path = require('path');

console.log('Electron Starting... ');

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        frame: true,
        // autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    window.loadURL('http://localhost:3000');

    window.once('ready-to-show', window.show);
};

// app.on('ready', () => {
//     createWindow();
// });

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
