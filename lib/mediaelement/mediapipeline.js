class MediaPipeline {
  constructor (id, client) {
    this.id = id
    this.client = client
    this.mediaElements = []
  }

  async createPlayerEndpoint (filePath) {
    return this.client.createPlayerEndpoint(this, filePath)
  }

  async createWebRTCEndpoint () {
    return this.client.createWebRTCEndpoint(this)
  }

  release () {
    return this.client.releaseElement(this)
  }
}

module.exports = MediaPipeline
