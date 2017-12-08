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

  function removeHandler (type, handler, once) {
    for (var i = 0; i < handlers[type].length; i++) {
      if (handlers[type][i] === handler) {
        handlers[type].splice(i, 1)
        if (once) return
        i--
      }
    }
  }

  function emit (type, extra) {
    var i
    for (i = 0; handlers[type] && i < handlers[type].length; i++) {
      handlers[type][i](type, extra)
    }
    for (i = 0; handlers['*'] && i < handlers['*'].length; i++) {
      handlers['*'][i](type, extra)
    }
  }

  return { on: on, off: off, emit: emit }
}
