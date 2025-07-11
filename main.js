const { app, BrowserWindow } = require('electron')
const { initMain: initAudioLoopback } = require('electron-audio-loopback');
const path = require('node:path')
const dotenv = require('dotenv');

dotenv.config();

initAudioLoopback();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 650,
    height: 600,
    title: 'Mic & Speaker Streamer',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false
    }
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})