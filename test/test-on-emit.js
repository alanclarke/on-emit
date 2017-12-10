/* globals describe beforeEach afterEach it */
var sinon = require('sinon')
var expect = require('chai').expect
var create = require('../index')

describe('on-emit', function () {
  var emitter, first, second

  beforeEach(function () {
    first = sinon.stub()
    second = sinon.stub()
    emitter = create()
  })

  afterEach(function () {
    first.reset()
    second.reset()
    emitter.off()
  })

  describe('on', function () {
    it('should do nothing if there are no listeners', function () {
      emitter.emit()
      emitter.emit('blah')
      emitter.emit('blah', {})
    })
    it('should call namespace listeners if there are any', function () {
      emitter.on('blah', first)
      emitter.on('blah', second)
      emitter.emit('blah', { a: 1 })
      expect(first.calledOnce).to.eql(true)
      expect(first.calledWith('blah', { a: 1 })).to.eql(true)
      expect(second.calledOnce).to.eql(true)
      expect(second.calledWith('blah', { a: 1 })).to.eql(true)
    })
    it('should return an unsubscribe function', function () {
      emitter.on('blah', first)()
      emitter.on('blah', second)
      emitter.emit('blah', { a: 1 })
      expect(first.called).to.eql(false)
      expect(second.calledOnce).to.eql(true)
      expect(second.calledWith('blah', { a: 1 })).to.eql(true)
    })
    it('should not call listeners listening to a different namespace', function () {
      emitter.on('other', first)
      emitter.on('other', second)
      emitter.emit('blah', { a: 1 })
      expect(first.called).to.eql(false)
      expect(second.called).to.eql(false)
    })
    it('should call listener as many times as they are listening', function () {
      emitter.on('blah', first)
      emitter.on('blah', first)
      emitter.emit('blah', { a: 1 })
      expect(first.calledTwice).to.eql(true)
    })
    it('should always call wildcard listeners', function () {
      emitter.on('*', first)
      emitter.on('*', second)
      emitter.emit('blah', { a: 1 })
      expect(first.calledOnce).to.eql(true)
      expect(first.calledWith('blah', { a: 1 })).to.eql(true)
      expect(second.calledOnce).to.eql(true)
      expect(second.calledWith('blah', { a: 1 })).to.eql(true)
    })
  })

  describe('off', function () {
    it('should unsubscribe everything', function () {
      emitter.on('blah', first)
      emitter.on('other', second)
      emitter.off()
      emitter.emit('blah', { a: 1 })
      emitter.emit('other', { a: 1 })
      expect(first.called).to.eql(false)
      expect(second.called).to.eql(false)
    })
    it('should unsubscribe by namespace', function () {
      emitter.on('blah', first)
      emitter.on('other', second)
      emitter.off('blah')
      emitter.emit('blah', { a: 1 })
      emitter.emit('other', { a: 1 })
      expect(first.called).to.eql(false)
      expect(second.calledOnce).to.eql(true)
    })
    it('should be unsubscribable by type handler', function () {
      emitter.on('blah', first)
      emitter.on('blah', second)
      emitter.off('blah', first)
      emitter.emit('blah', { a: 1 })
      expect(first.called).to.eql(false)
      expect(second.calledOnce).to.eql(true)
    })
    it('should be unsubscribable by type handler', function () {
      emitter.on('blah', first)
      emitter.on('blah', second)
      emitter.off('blah', second)
      emitter.emit('blah', { a: 1 })
      expect(first.calledOnce).to.eql(true)
      expect(second.called).to.eql(false)
    })
    it('should not throw if type does not exist', function () {
      emitter.off('blah', first)
    })
    it('should only remove as many unsubscribe handlers as were unsubscribed', function () {
      emitter.on('blah', first)
      emitter.on('blah', first)()
      emitter.emit('blah', { a: 1 })
      expect(first.calledOnce).to.eql(true)
    })
    it('should remove all handlers specified to off', function () {
      emitter.on('blah', first)
      emitter.on('blah', first)
      emitter.off('blah', first)
      emitter.emit('blah', { a: 1 })
      expect(first.called).to.eql(false)
    })
  })
})
