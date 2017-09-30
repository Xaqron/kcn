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
    return this.operationResult(response)
  }

  processOfferWebRTCEndpoint (response) {
    return this.operationResult(response)
  }

  processAnswerWebRTCEndpoint (response) {
    return this.operationResult(response)
  }

  generateOfferWebRTCEndpoint (response) {
    return this.operationResult(response)
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
    return this.operationResult(response)
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

  // Use this method if you need to keep track of sessions.
  getResult (response) {
    return {
      value: response.result.value,
      sessionId: response.result.sessionId
    }
  }

  operationResult (response) {
    if (typeof response.error === 'undefined') {
      return {'success': true, 'result': response.result}
    } else {
      return {'success': false, 'result': response}
    }
  }
}

module.exports = ResponseAdapter
