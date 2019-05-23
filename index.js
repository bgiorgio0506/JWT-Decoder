require('update-electron-app')({
  logger: require('electron-log')
})

const path = require('path')
const glob = require('glob')
const {app,BrowserWindow}= require('electron')

const debug = /--debug/.test(process.argv[2])
if (process.mas) app.setName('JsonWebToken App')

app.setName('JsonWebToken App')
let mainWindow = null
//initialize
function initialize() {
  makeSingleInstance()

  loadFiles()

  function createWindow () {
    const windowOptions = {
      width: 1080,
      minWidth: 680,
      height: 840,
      frame: false,
      title: app.getName(),
      webPreferences: {
        nodeIntegration: true
      }
    }
    //different icon format for different platform
  /*  if (process.platform === 'linux') {
      windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
    }*/
    mainWindow = new BrowserWindow({windowOptions})
    mainWindow.loadURL(path.join('file://', __dirname,'index.html'))

    app.on('closed', () => {
      mainWindow = null
    })
}
  app.on('ready', () => {
    createWindow()
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}
//Make app a single instance
function makeSingleInstance () {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// Require each JS file in the main-process dir
function loadFiles () {
  const files = glob.sync(path.join(__dirname, 'application/**/*.js'))
  files.forEach((file) => { require(file) })
}
initialize()
