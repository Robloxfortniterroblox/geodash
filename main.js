const { app, BrowserWindow } = require('electron')
const { autoUpdater } = require("electron-updater")
const path = require('path')

try {
  require('electron-reloader')(module)
} catch (_) {}

function createWindow () {
  const win = new BrowserWindow({
    show: false, 
    
    width: 1280,
    height: 720,

    icon: path.join(__dirname, 'icon.ico'), 

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    autoHideMenuBar: true
  })

win.loadFile('index.html')
  win.maximize()

  win.once('ready-to-show', () => {
    win.show()
    autoUpdater.checkForUpdatesAndNotify() 
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

autoUpdater.on('update-available', () => {
  console.log('Update available')
})

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})