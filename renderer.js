// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer, remote } = require('electron')

let time
global.update = function (d) {
  // TODO: 根据数据渲染视图
  console.log(d)
  const {data} = d
  document.getElementById("add-result").innerHTML = data.count
  document.getElementById("action-from-plugin-result").innerHTML = data.dataFromPlugin
  console.log(new Date - data.date)
}

document.getElementById("add").addEventListener('click', () => {
  dispatchIPCAction('add', 2)

})
document.getElementById("action-from-plugin").addEventListener('click', () => {
  dispatchIPCAction('actionFromPlugin')
})


function dispatchIPCAction(actionCreatorName, ...args) {
  time = new Date()
  ipcRenderer.send("action", actionCreatorName, ...args)
}