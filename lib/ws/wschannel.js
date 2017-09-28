const MiniMQ = require('./minimq')
const RWS = require('reconnecting-websocket')
const Html5WebSocket = require('html5-websocket')

class WSChannel {
  constructor (wsAddress, timeOut = 30000) {
    this.messageListeners = {}
    this.eventListeners = {}

    this.queue = new MiniMQ()
    this.queue.handlerFunction = (el, prm, resolve, reject) => {
      try {
        this.ws.send(JSON.stringify(el))
        this.messageListeners[el.id] = {resolve: resolve, reject: reject}
      } catch (e) {
        reject(e)
      }
      setTimeout(() => {
        reject('timeoutError')
        delete this.messageListeners[el.id]
      }, timeOut)
    }
    this.ws = new RWS(wsAddress, undefined, { constructor: Html5WebSocket })
    this.ws.onopen = () => {
      this.queue.openQueue()
    }
    this.ws.onclose = () => {
      this.queue.closeQueue()
    }
    this.ws.onmessage = (result) => {
      let data = JSON.parse(result.data)
      // normal responses
      if (data.method !== 'onEvent' && typeof data.error === 'undefined') {
        let id = data.id
        this.messageListeners[id]['resolve'](data)
        delete this.messageListeners[id]
      } else if (typeof data.error !== 'undefined') { // errors
        let id = data.id
        this.messageListeners[id]['reject'](data)
        delete this.messageListeners[id]
      } else { // events
        let index = data.params.value.object + '|' + data.params.value.type
        for (let i in this.eventListeners[index]) {
          this.eventListeners[index][i](data.params.value)
        }
      }
    }
  }

  on (objectId, methodName, callback) {
    let index = objectId + '|' + methodName
    if (typeof this.eventListeners[index] === 'undefined') {
      this.eventListeners[index] = []
    }
    this.eventListeners[index].push(callback)
  }

  send (data) {
    return this.queue.addElement(data)
  }
}

module.exports = WSChannel
