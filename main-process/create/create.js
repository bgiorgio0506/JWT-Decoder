const {ipcMain,dialog} = require('electron');
const jwt = require('jsonwebtoken');

//listening for a message event
ipcMain.on('asynchronous-message', (event, key, payload, options, exp, iss) =>{
  if(options === null){
    let jsontoken = jwt.sign({exp:exp,
      iss:iss,
      data:payload
    },key)
  }else if (exp !== null && iss !== null) {
    let jsontoken = jwt.sign({
      exp:exp,
      iss:iss,
      data:payload
    },key,options)
  }
  console.log(jsontoken)
})
