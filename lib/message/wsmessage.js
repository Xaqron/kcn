class WSMessage {
  constructor () {
    this.id = null
    this.method = null
    this.jsonrpc = '2.0'
    this.params = null
  }
}

module.exports = WSMessage
