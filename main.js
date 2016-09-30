const {remote} = require('electron')
const {Menu, MenuItem} = remote

const menu = new Menu()
menu.append(new MenuItem({label: 'Patient Registration', click() { }}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: 'Sonography Report', type: 'checkbox', checked: true}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
}, false)
