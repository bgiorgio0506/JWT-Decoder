//bring in electron and jsonwebtoken
const {app,BrowserWindow,ipcMain} = require('electron')
const jwt = require('jsonwebtoken')

//listening for the event
// receive message from decode.html
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log( arg )
  event.sender.send('asynchronous-reply',arg)
  })
