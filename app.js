var appname = "MultiPong"

const {app, BrowserWindow} = require('electron') 
const electron = require('electron');
const url = require('url') 
const path = require('path')  
const globalShortcut = electron.globalShortcut

let win  

function createWindow() { 
   win = new BrowserWindow({width: 600, height: 600, title: appname}) 
   win.loadURL(url.format ({ 
      pathname: path.join(__dirname, 'MultiPong.html'), 
      protocol: 'file:', 
      slashes: true 
   })) 

   	globalShortcut.register('CommandOrControl+R', function() {
		//console.log('CommandOrControl+R is pressed')
		win.reload()
	})
}  

app.on('ready', createWindow) 

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
    app.quit()
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})