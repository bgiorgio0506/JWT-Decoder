// all matirilize framework javascript handle with DOM
document.addEventListener('DOMContentLoaded',function () {
  var elms = document.querySelectorAll('.sidenav')
  let options = {
    edge: 'left'
  }
  let nav = M.Sidenav.init(elms,options)
  document.on('ready', () =>{
    nav.open()
  })
})
