const Pong = require('./helpers/pong')
const WSChannel = require('./ws/wschannel')
const MessageFactory = require('./message/messagefactory')
const MediaElement = require('./mediaelement/mediaelement')
const ResponseAdapter = require('./message/responseadapter')
const MediaPipeline = require('./mediaelement/mediapipeline')
const WebRTCEndpoint = require('./mediaelement/webrtcendpoint')
const PlayerEndpoint = require('./mediaelement/playerendpoint')

class KCN {
  constructor (wsAddress) {
    this.messageFactory = new MessageFactory()
    this.ws = new WSChannel(wsAddress)
    this.responseAdapter = new ResponseAdapter()
    this.birthDate = Date.now()
  }

  async ping () {
    let message = this.messageFactory.createPing()
    let result = await this.ws.send(message)
    return new Pong(result.id, result.result.value)
  }

  async createPipeline () {
    let message = this.messageFactory.createPipeline()
    let result = await this.ws.send(message)
    let pipelineId = this.responseAdapter.createPipelineSuccess(result)
    return new MediaPipeline(pipelineId, this)
  }

  async releaseElement (element) {
    let message = this.messageFactory.releaseElement(element.id)
    let result = await this.ws.send(message)
    return true
  }

  async connectSourceToSink (source, sink) {
    let message = this.messageFactory.connectSourceToSink(source.id, sink.id)
    let result = await this.ws.send(message)
    let connectSourceToSinkMessageResult = this.responseAdapter.connectSourceToSink(result)
    if (connectSourceToSinkMessageResult.success) {
      return true
    } else {
      throw connectSourceToSinkMessageResult.result
    }
  }

  async createPlayerEndpoint (mediaPipeline, filePath) {
    let message = this.messageFactory.createPlayerEndpoint(mediaPipeline.id, filePath)
    let result = await this.ws.send(message)
    let playerEndpointId = this.responseAdapter.createPlayerEndpointSuccess(result)
    return new PlayerEndpoint(playerEndpointId, this)
  }

  async createWebRTCEndpoint (mediaPipeline) {
    let message = this.messageFactory.createWebRTCEndpoint(mediaPipeline.id)
    let result = await this.ws.send(message)
    let webRTCEndpointId = this.responseAdapter.createWebRTCEndpointSuccess(result)
    return new WebRTCEndpoint(webRTCEndpointId, this)
  }

  async processOfferWebRTCEndpoint (offer, endpoint) {
    let message = this.messageFactory.processOfferWebRTCEndpoint(offer, endpoint.id)
    let result = await this.ws.send(message)
    let processOfferMessageResult = this.responseAdapter.processOfferWebRTCEndpoint(result)
    if (processOfferMessageResult.success) {
      let processOfferSuccess = this.responseAdapter.processOfferSuccess(result)
      return processOfferSuccess
    } else {
      throw processOfferMessageResult.result
    }
  }

  async processAnswerWebRTCEndpoint (answer, endpoint) {
    let message = this.messageFactory.processAnswerWebRTCEndpoint(answer, endpoint.id)
    let result = await this.ws.send(message)
    let processAnswerMessageResult = this.responseAdapter.processAnswerWebRTCEndpoint(result)
    if (processAnswerMessageResult.success) {
      let processAnswerSuccess = this.responseAdapter.processAnswerSuccess(result)
      return processAnswerSuccess
    } else {
      throw processAnswerMessageResult.result
    }
  }

  async generateOfferWebRTCEndpoint (endpoint) {
    let message = this.messageFactory.generateOfferWebRTCEndpoint(endpoint.id)
    let result = await this.ws.send(message)
    let generateOfferMessageResult = this.responseAdapter.generateOfferWebRTCEndpoint(result)
    if (generateOfferMessageResult.success) {
      let processOfferSuccess = this.responseAdapter.generateOfferSuccess(result)
      return processOfferSuccess
    } else {
      throw generateOfferMessageResult.result
    }
  }

  async playPlayerEndpoint (player) {
    let message = this.messageFactory.playPlayerEndpoint(player.id)
    let result = this.ws.send(message)
    let playMessageResult = this.responseAdapter.playPlayerEndpoint(result)
    if (playMessageResult.success) {
      return true
    } else {
      throw playMessageResult.result
    }
  }

  async addIceCandidate (webRTCEndpoint, iceCandidate) {
    let message = this.messageFactory.addIceCandidate(webRTCEndpoint.id, iceCandidate)
    let result = await this.ws.send(message)
    return true
  }

  async gatherIceCandidates (webRTCEndpoint) {
    let message = this.messageFactory.gatherIceCandidates(webRTCEndpoint.id)
    let result = await this.ws.send(message)
    return true
  }

  async registerIceCandidateFound (webRTCEndpoint, callback) {
    let message = this.messageFactory.registerIceCandidateFound(webRTCEndpoint.id)
    this.ws.on(webRTCEndpoint.id, 'IceCandidateFound', (candidate) => callback(candidate.data.candidate))
    let result = await this.ws.send(message)
    return true
  }

  async registerConnectionStateChanged (webRTCEndpoint, callback) {
    let message = this.messageFactory.registerConnectionStateChanged(webRTCEndpoint.id)
    this.ws.on(webRTCEndpoint.id, 'ConnectionStateChanged', (state) => {
      callback({
        state: state.data.newState
      })
    })
    let result = await this.ws.send(message)
    return true
  }

  async setMinVideoSendBandwidth (webRTCEndpoint, bitrate) {
    let message = this.messageFactory.setMinVideoSendBandwidth(webRTCEndpoint.id, bitrate)
    let result = await this.ws.send(message)
    return result
  }

  async setMaxVideoSendBandwidth (webRTCEndpoint, bitrate) {
    let message = this.messageFactory.setMaxVideoSendBandwidth(webRTCEndpoint.id, bitrate)
    let result = await this.ws.send(message)
    return result
  }

  async setMinVideoRecvBandwidth (webRTCEndpoint, bitrate) {
    let message = this.messageFactory.setMinVideoRecvBandwidth(webRTCEndpoint.id, bitrate)
    let result = await this.ws.send(message)
    return result
  }

  async setMaxVideoRecvBandwidth (webRTCEndpoint, bitrate) {
    let message = this.messageFactory.setMaxVideoRecvBandwidth(webRTCEndpoint.id, bitrate)
    let result = await this.ws.send(message)
    return result
  }

  heartBeat (callback = null, interval = 6000) {
    this.heartBeatCallback = callback
    this.heartBeatHandle = setInterval(async () => {
      let pong = await this.ping()
      if (pong.response === 'pong') {
        if (this.heartBeatCallback) { this.heartBeatCallback(null, 'ok') }
      } else {
        if (this.heartBeatCallback) { this.heartBeatCallback('error', 'failed') }
      }
    }, interval)
  }

  disableHeartBeat () {
    clearInterval(this.heartBeatHandle)
  }

  get upTime () {
    return Date.now() - this.birthDate
  }
}

module.exports = {
  KCN,
  MessageFactory,
  ResponseAdapter,
  WSChannel,
  MediaPipeline,
  MediaElement,
  WebRTCEndpoint,
  PlayerEndpoint
}
