'use strict';
const electron = require('electron');

const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function isOnline(){
	return navigator.onLine;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({ 
		fullscreen: false,
		closable: true,
		fullscreenable: true,
		skipTaskbar: true 
	});

	win.loadURL(`file://${__dirname}/app/index.html`);
	//win.webContents.openDevTools(); 
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
