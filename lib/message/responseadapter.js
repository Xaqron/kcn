class ResponseAdapter {
  pingSuccess (response) {
    return this.getValue(response)
  }

  pingFailure (response) {
    return response.toString()
  }

  createPipelineSuccess (response) {
    return this.getValue(response)
  }

  createPlayerEndpointSuccess (response) {
    return this.getValue(response)
  }

  createWebRTCEndpointSuccess (response) {
    return this.getValue(response)
  }

  playPlayerEndpoint (response) {
    return this.operationError(response)
  }

  processOfferWebRTCEndpoint (response) {
    return this.operationError(response)
  }

  processAnswerWebRTCEndpoint (response) {
    return this.operationError(response)
  }

  generateOfferWebRTCEndpoint (response) {
    return this.operationError(response)
  }

  processOfferSuccess (response) {
    return this.getValue(response)
  }

  processAnswerSuccess (response) {
    return this.getValue(response)
  }

  generateOfferSuccess (response) {
    return this.getValue(response)
  }

  connectSourceToSink (response) {
    return this.operationError(response)
  }

  playPlayerEndpointFailure (reason) {
    return reason.error.message
  }

  getValue (response) {
    return response.result.value
  }

  getSessionId (response) {
    return response.result.sessionId
  }

  operationError (response) {
    if (typeof response.error === 'undefined') {
      return {'success': true, 'result': response.result}
    } else {
      return {'success': false, 'result': response}
    }
  }
}

module.exports = ResponseAdapter
