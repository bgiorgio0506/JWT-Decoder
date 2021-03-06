const {ipcMain,dialog} = require('electron');
const jsonwebtoken = require('jsonwebtoken');

//listening for a message event
ipcMain.on('asynchronous-message1', (event, jwt) =>{
console.log(jwt);
  if(jwt.algorithm == null){
   jsonwebtoken.sign({
      exp:jwt.exp,
      iss:jwt.iss,
      aud:jwt.aud,
      data:jwt.payload
    },jwt.key,function (err, token) {
      //error handling 
      if(err){
        event.sender.send('error-generic','Unexpected Error while generating Token')
        console.log(err);
      }
      console.log(token);
    })
  }else {
    jsonwebtoken.sign({
      exp:jwt.exp,
      iss:jwt.iss,
      aud:jwt.aud,
      data:jwt.payload
    },jwt.key,jwt.algo,function(err,token) {
      if (err){
        console.log(err)
        event.sender.send('error-generic','Unexpected Error While Generating Token')
      }
      console.log(token);
    })
  }
})
