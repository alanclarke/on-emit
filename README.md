[![Travis CI](https://travis-ci.org/alanclarke/on-emit.svg?branch=master)](https://travis-ci.org/alanclarke/on-emit)
[![devDependency Status](https://david-dm.org/alanclarke/on-emit/dev-status.svg)](https://david-dm.org/alanclarke/on-emit#info=devDependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# On Emit
Simple, fast, event emitter with a minimal but rich API

- Tiny
- 100% test coverage
- rich API
- performant
- zero dependencies


## Installation
```js
npm install on-emit
```

## Usage
```js
var create = require('on-emit')
var emitter = create()

var dispose = emitter.on('a', log)
emitter.emit('a', { data: true }) // logs

dispose() // removes specific listener
emitter.off() // removes all listeners
emitter.off('a') // removes all listeners for 'a' namespaced events
emitter.off('a', log) // removes all listeners for 'a' namespaced events with 'log' handler

emitter.on('*', log) // logs all events

function log (type, data) {
  console.log(type, data)
}
```
