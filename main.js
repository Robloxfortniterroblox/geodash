const { autoUpdater } = require("electron-updater")
const { app, BrowserWindow } = require('electron')
const path = require('path')

// 1. LIVE RELOAD (Add this for optimization)
try {
  require('electron-reloader')(module)
} catch (_) {}

function createWindow () {
  const win = new BrowserWindow({
    // Start hidden so the user doesn't see it resize
    show: false, 
    
    // OPTION A: Fullscreen (Game Mode - No borders/taskbar)
    // fullscreen: true, 
    
    // OPTION B: Standard Maximized Window (Remove comments to use)
    width: 1280,
    height: 720,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    autoHideMenuBar: true
  })

  // Load the file
  win.loadFile('index.html')

  // 2. MAXIMIZE COMMAND
  // If you are NOT using 'fullscreen: true', uncomment the line below:
  win.maximize()

  // Show the window only after it is fully loaded and maximized
  win.once('ready-to-show', () => {
    win.show()
    win.once('ready-to-show', () => {
    win.show()
    autoUpdater.checkForUpdatesAndNotify() // <--- Checks for update on startup
  })
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
  // You can show a dialog here saying "Downloading update..."
  console.log('Update available')
})

autoUpdater.on('update-downloaded', () => {
  // Silent install and restart
  autoUpdater.quitAndInstall()
})