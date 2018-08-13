// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer, remote } = require('electron')

let time = new Date()
global.update = function (data) {
  console.log(data)
  console.log(new Date - data.date)
  time = new Date
}

document.getElementById("btn").addEventListener('click', () => {
  dispatchIPCAction('add', 2)
})

function dispatchIPCAction(actionCreatorName, ...args) {
  ipcRenderer.send("action", actionCreatorName, ...args)
}