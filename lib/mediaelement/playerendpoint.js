const MediaElement = require('./mediaelement')

class PlayerEndpoint extends MediaElement {
  play () {
    return this.client.playPlayerEndpoint(this)
  }
}

module.exports = PlayerEndpoint
