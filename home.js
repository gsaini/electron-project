var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow = null;
app.on('ready', function(){
mainWindow = new BrowserWindow({fullscreen: true})//,frame:false
mainWindow.loadURL(`file://${__dirname}/index.html`)
// mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function() {
    mainWindow = null
  })
mainWindow.setMenu(null);
const {Menu} = require('electron')

const template = [
  {
    label: 'Master',
    submenu: [
      {
        label: 'Patient Registration',
        accelerator:'CmdOrCtrl+P'
      },
      {
        label: 'Reffrial Doctor Registration',
        accelerator:'CmdOrCtrl+D'
      },
      {
        type: 'separator'
      },
      {
        label: 'Ultrasound Dr Registration',
        accelerator:'CmdOrCtrl+U'
      },
      {
        label: 'Hospital Registration',
        accelerator:'CmdOrCtrl+H'
      }
    ]
  },
  {
    label: 'Transection',
    submenu: [
      {
        label: 'Generate F Form Report',
        accelerator: 'CmdOrCtrl+F+R'
      },
      {
        label: 'Sonography Report',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+S' : 'Ctrl+Shift+S'
      },
        {
          label:'Fill F Form onLine',
          accelerator:'CmdOrCtrl+F+O',
                  click () { require('electron').shell.openExternal('http://pcpndt.raj.nic.in')}
        }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        }
      },
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      /*{
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click (item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
      },*/
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('http://pcpndt.raj.nic.in') }
      }
    ]
  }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
})
