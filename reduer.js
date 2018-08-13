const initDate = exports.initDate = { count: 0 }

exports.reducer = function (state = initDate, action) {
  switch (action.type) {
    case "MAIN_ADD_ONE":
      return { ...state, count: state.count + 1 }
    case "MAIN_ADD":
      return { ...state, count: state.count + action.count }
    default:
      return { ...state }
  }
}