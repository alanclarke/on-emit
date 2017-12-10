module.exports = function createEmitter () {
  var handlers = {}

  function on (type, handler) {
    handlers[type] = handlers[type] || []
    handlers[type].push(handler)
    return function dispose () {
      removeHandler(type, handler, true)
    }
  }

  function off (type, handler, once) {
    if (handler) {
      removeHandler(type, handler)
    } else {
      if (type) {
        handlers[type] = []
      } else {
        handlers = {}
      }
    }
  }

  function removeHandler (type, handler, removeOnlyOne) {
    for (var i = 0; i < handlers[type].length; i++) {
      if (handlers[type][i] === handler) {
        handlers[type].splice(i, 1)
        if (removeOnlyOne) return
        i--
      }
    }
  }

  function emit (type) {
    var i
    for (i = 0; handlers[type] && i < handlers[type].length; i++) {
      handlers[type][i].apply(handlers[type][i], arguments)
    }
    for (i = 0; handlers['*'] && i < handlers['*'].length; i++) {
      handlers['*'][i].apply(handlers['*'][i], arguments)
    }
  }

  return { on: on, off: off, emit: emit }
}
