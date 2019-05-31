const {ipcMain, dialog} = require('electron')
//error throwing module
//listening for error event to be throw
ipcMain.on('error-generic', (event, arg) =>{
  console.log(`Error: ${arg}`)
  dialog.showErrorBox('An Error Accured',arg)
})

//info Handling
ipcMain.on('info-generic', (event, arg) =>{
  console.log(`Info: ${arg}`)
  let message ={
    type: 'info',
    title:'Information',
    message: arg,
    buttons:['Yes', 'No']
  }
  dialog.showMessageBox(message,(index)=>{
    event.sender.send('info-answer',index)
  })
})
