const initDate = exports.initDate = { dataFromPlugin: "" }

exports.handlers = {
  ["ACTION_FROM_PLUGIN"](stata,action){
    return {...stata,dataFromPlugin:action.payload}
  }
}