const http = require('http');
const path = require('path');
const fs = require('fs');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const metadata = require('../config/metadata');
const PORT = 18080;

let mainWindow, server;

function requestHandler(req, res) {
  const file = req.url == '/' ? '/index.html' : req.url;
  const root = `${__dirname}/..`;
  const page404 = root + '/404.html';
  const filePath = `${root}${file}`;

  fs.exists(filePath, function(exists) {
    if (exists) {
      fs.readFile(filePath, function(err, contents) {
        if (!err) {
          res.end(contents);
        } else {
          // TODO - Better error handling
        }
      });
    } else {
      fs.readFile(page404, function(err, contents) {
        if(!err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(contents);
        } else {
          // TODO - Better error handling
        }
      });
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 760,
    title: metadata.title
  });

  switch (process.env.NODE_ENV) {
    case 'dev':
      mainWindow.loadURL(`http://${metadata.host}:${metadata.port}`);
      mainWindow.webContents.openDevTools();
      break;

    case 'stg':
    case 'prd':
      mainWindow.loadURL(`http://${metadata.host}:${metadata.port}`);
      break;

    default:
      server = http.createServer(requestHandler);
      server.listen(PORT, () => {
        mainWindow.loadURL(`http://localhost:${PORT}/index.html`);
      });
      break;
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null;
    server.close();
  });

  if (process.env.NODE_ENV) {
    const client = require('electron-connect').client;
    client.create(mainWindow);
  }
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
