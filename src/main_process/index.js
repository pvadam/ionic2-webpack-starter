const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const client = require('electron-connect').client;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 760
  });

  switch (process.env.NODE_ENV) {
    case 'dev':
      mainWindow.loadURL('http://localhost:3000');
      mainWindow.webContents.openDevTools();
      break;

    case 'stg':
    case 'prd':
      mainWindow.loadURL(`file://${__dirname}/index.html`);
      break;
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  client.create(mainWindow);
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
