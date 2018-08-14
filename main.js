const { app, BrowserWindow, ipcMain } = require('electron')
const path=  require('path')
const fs = require('fs-extra')
const { createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk').default
const createReducer = require('./createReducer')

function getAllPlugins() {
  const pluginsPath = path.resolve(__dirname, "./plugins")
  const fileList = fs.readdirSync(pluginsPath)
  return fileList.map(i => {
    const config = require(path.resolve(pluginsPath, i, 'plugin'))
    return {
      ...config,
      actions: path.resolve(pluginsPath,i, config.actions),
      entry: path.resolve(pluginsPath,i, config.entry),
      reducer: path.resolve(pluginsPath,i, config.reducer)
    }
  })
}
function combineActions(configs) {
  return configs.map(i => require(i.actions)).reduce((prev, curr) => ({ ...prev, ...curr }), require("./mainActions"))
}


function combineInitDataAndHandlers(configs) {
  return configs.map(i => require(i.reducer)).reduce((prev, curr) => ({
    initDate: { ...prev.initDate, ...curr.initDate },
    handlers: { ...prev.handlers, ...curr.handlers }
  }), require("./mainReducer"))
}

 function main() {
  let windows=[]
  const configs = getAllPlugins()
  const actions = combineActions(configs)
  const { initDate, handlers } = combineInitDataAndHandlers(configs)

  let store = createStore(createReducer(initDate, handlers), initDate, applyMiddleware(thunk))

  ipcMain.on('action', (event, name, ...args) => {
    store.dispatch(actions[name](...args))
  })

  function onReady() {
    windows = new Array(3).fill({ width: 800, height: 600 }).map(i => new BrowserWindow(i))
    windows.forEach(i => {
      i.loadFile('index.html')
      i.webContents.openDevTools()
      i.on('close', () => {
        windows = windows.filter(t => t != i)
      })
    })

    function notifyChildren(data) {
      const time = new Date()
      const code = `update(${JSON.stringify({ data, date: +new Date(), array: new Array(100 * 1024).fill(0) })})`
      console.log(`序列化时间： ${new Date() - time}`)
      windows.forEach(win => {
        win.webContents.executeJavaScript(code)
      })
    }
  
    store.subscribe(() => {
      notifyChildren(store.getState())
    })
  }
  app.on('ready', onReady)
  // Quit when all windows are closed.
  app.on('window-all-closed', function () {
    app.quit()
  })
}

main();