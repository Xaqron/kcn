class MediaElement {
  constructor (id, client) {
    this.id = id
    this.client = client
    this.source = null
    this.sink = null
  }
  async connectToSink (target) {
    let result = await this.client.connectSourceToSink(this, target)
    this.sink = target
    return this
  }

  release () {
    return this.client.releaseElement(this)
  }
}

module.exports = MediaElement
