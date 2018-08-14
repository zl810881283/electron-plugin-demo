exports.add = function (count) {
  return { type: "MAIN_ADD", count }
}
exports.addOne = function () {
  return { type: "MAIN_ADD_ONE" }
}