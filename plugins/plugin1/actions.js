let count = 0
exports.actionFromPlugin = function () {
    return { type: "ACTION_FROM_PLUGIN", payload:"this is from plugin"+count++ }
}
