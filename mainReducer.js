const initDate = exports.initDate = { count: 0 }

exports.handlers = {
  ["MAIN_ADD_ONE"](state, action) {
    return { ...state, count: state.count + 1 }
  },
  ["MAIN_ADD"](state, action) {
    return { ...state, count: state.count + action.count }
  }
}