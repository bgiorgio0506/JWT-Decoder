const {ipcMain, dialog} = require('electron')
//error throwing module
//listening for error event to be throw
ipcMain.on('error-generic', (event, arg) =>{
  console.log(`Error: ${arg}`)
  dialog.showErrorBox('An Error Accured',arg)
})
