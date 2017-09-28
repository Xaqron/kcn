class MiniMQ {
  constructor () {
    this.queue = []
    this.closeQueue()
    this.handlerFunction = (el, prm, resolve, reject) => {}
  }

  openQueue () {
    while (this.queue.length !== 0) {
      let currentEl = this.queue.shift()
      this.handlerFunction(currentEl.el, currentEl.prm, currentEl.resolveInstance, currentEl.rejectInstance)
    }
    this.isQueueOpen = true
  }

  closeQueue () {
    this.isQueueOpen = false
  }

  addElement (el) {
    let resolveInstance
    let rejectInstance
    let prm = new Promise((resolve, reject) => {
      resolveInstance = resolve
      rejectInstance = reject
    })
    if (this.isQueueOpen) {
      this.handlerFunction(el, prm, resolveInstance, rejectInstance)
    } else {
      this.queue.push({
        el: el,
        prm: prm,
        resolveInstance: resolveInstance,
        rejectInstance: rejectInstance
      })
    }
    return prm
  }
}

module.exports = MiniMQ
