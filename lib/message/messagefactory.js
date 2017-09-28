const uuid = require('uuid').v4
const WSMessage = require('./wsmessage')

class MessageFactory {
  createPing () {
    var message = this.newMessage('ping')
    message.params = {
      interval: 1000
    }
    return message
  }

  createPipeline () {
    var message = this.newMessage('create')
    message.params = {
      type: 'MediaPipeline',
      constructorParams: {}
    }
    return message
  }

  releaseElement (elementId) {
    var message = this.newMessage('release')
    message.params = {
      object: elementId
    }
    return message
  }

  addIceCandidate (webRTCEndpointId, candidate) {
    var message = this.newMessage('invoke')
    message.params = {
      operation: 'addIceCandidate',
      object: webRTCEndpointId,
      operationParams: {
        'candidate': candidate
      }
    }
    return message
  }

  createPlayerEndpoint (pipelineId, filePath) {
    var message = this.newMessage('create')
    message.params = {
      type: 'PlayerEndpoint',
      constructorParams: {
        mediaPipeline: pipelineId,
        uri: filePath
      }
    }
    return message
  }

  createWebRTCEndpoint (pipelineId) {
    var message = this.newMessage('create')
    message.params = {
      type: 'WebRtcEndpoint',
      constructorParams: {
        mediaPipeline: pipelineId
      }
    }
    return message
  }

  playPlayerEndpoint (playerId) {
    var message = this.newMessage('invoke')
    message.params = {
      operation: 'play',
      object: playerId,
      constructorParams: {}
    }
    return message
  }

  processOfferWebRTCEndpoint (offer, endpointId) {
    var message = this.newMessage('invoke')
    message.params = {
      operation: 'processOffer',
      object: endpointId,
      operationParams: {
        'offer': offer
      }
    }
    return message
  }

  processAnswerWebRTCEndpoint (answer, endpointId) {
    var message = this.newMessage('invoke')
    message.params = {
      operation: 'processAnswer',
      object: endpointId,
      operationParams: {
        'answer': answer
      }
    }
    return message
  }

  generateOfferWebRTCEndpoint (endpointId) {
    var message = this.newMessage('invoke')
    message.params = {
      operation: 'generateOffer',
      object: endpointId
    }
    return message
  }

  registerIceCandidateFound (webRTCEndpointId) {
    var message = this.newMessage('subscribe')
    message.params = {
      type: 'IceCandidateFound',
      object: webRTCEndpointId
    }
    return message
  }

  registerConnectionStateChanged (webRTCEndpointId) {
    var message = this.newMessage('subscribe')
    message.params = {
      type: 'ConnectionStateChanged',
      object: webRTCEndpointId
    }
    return message
  }

  gatherIceCandidates (webRTCEndpointId) {
    var message = this.newMessage('invoke')
    message.params = {
      operation: 'gatherCandidates',
      object: webRTCEndpointId
    }
    return message
  }

  connectSourceToSink (sourceId, sinkId) {
    var message = this.newMessage('invoke')
    message.params = {
      operation: 'connect',
      object: sourceId,
      operationParams: {
        'sink': sinkId
      }
    }
    return message
  }

  setMinVideoSendBandwidth (sourceId, bitrate) {
    var message = this.newMessage('invoke')
    message.params = {
      operation: 'setMinVideoSendBandwidth',
      object: sourceId,
      operationParams: {
        'minVideoSendBandwidth': bitrate
      }
    }
    return message
  }

  setMaxVideoSendBandwidth (sourceId, bitrate) {
    var message = this.newMessage('invoke')
    message.params = {
      operation: 'setMaxVideoSendBandwidth',
      object: sourceId,
      operationParams: {
        'maxVideoSendBandwidth': bitrate
      }
    }
    return message
  }

  setMinVideoRecvBandwidth (sourceId, bitrate) {
    var message = this.newMessage('invoke')
    message.params = {
      operation: 'setMinVideoRecvBandwidth',
      object: sourceId,
      operationParams: {
        'minVideoRecvBandwidth': bitrate
      }
    }
    return message
  }

  setMaxVideoRecvBandwidth (sourceId, bitrate) {
    var message = this.newMessage('invoke')
    message.params = {
      operation: 'setMaxVideoRecvBandwidth',
      object: sourceId,
      operationParams: {
        'maxVideoRecvBandwidth': bitrate
      }
    }
    return message
  }

  newMessage (method) {
    let message = new WSMessage()
    message.method = method
    message.id = uuid()
    return message
  }
}

module.exports = MessageFactory
