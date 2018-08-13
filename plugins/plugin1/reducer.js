const initDate = exports.initDate = { data: "" }

exports.reducer = function (state = initDate, action) {
  switch (action.type) {
    case "ACTION_FROM_PLUGIN":
      return { ...state, data: action.payload }
    default:
      return { ...state }
  }
}