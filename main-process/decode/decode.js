//bring in electron and jsonwebtoken
const {ipcMain,dialog} = require('electron')
const jwt = require('jsonwebtoken')

//listening for the event
// receive message from decode.html
ipcMain.on('asynchronous-message', (event, arg) => {
  var token = arg

  //try to decode all the token if not amen lets throw a main process error
    let decoded = jwt.decode(token,{complete:true})
    console.log(decoded)
    //check on the output
    if(decoded === null){
      event.sender.send('unexpected-token')
    }else{
      event.sender.send('asynchronous-reply',decoded)
  }
})
//error case
ipcMain.on('error-generic', (event, arg) =>{
  console.log(`Error: ${arg}`)
  dialog.showErrorBox('An Error Accured',arg)
})
