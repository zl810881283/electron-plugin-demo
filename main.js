const { app, BrowserWindow, webContents, ipcMain } = require('electron')
const actions = require('./actions')
const { createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk').default

const { reducer, initDate } = require('./reduer')

let windows

function createWindow() {

  windows = new Array(1).fill({ width: 800, height: 600 }).map(i => new BrowserWindow(i))

  windows.forEach(i => {
    i.loadFile('index.html')
    i.webContents.openDevTools()
    i.on('close', () => {
      windows = windows.filter(t => t != i)
    })
  })

}
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit()
})

function notifyChildren(data) {
  const time = new Date()
  const code = `update(${JSON.stringify({ data, date: +new Date(), array: new Array(100 * 1024).fill(0) })})`
  console.log(new Date() - time)
  windows.forEach(win => {
    win.webContents.executeJavaScript(code)
  })
}

let store = createStore(reducer, initDate, applyMiddleware(thunk))



store.subscribe(() => {
  notifyChildren(store.getState())
})
ipcMain.on('action', (event, name, ...args) => {
  store.dispatch(actions[name](...args))
})
