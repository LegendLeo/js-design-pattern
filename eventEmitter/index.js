class EventEmitter {
  constructor() {
    this.handlers = {}
  }
  on(eventName, cb) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = []
    }
    this.handlers[eventName].push(cb)
  }
  once(eventName, cb) {
    const newCb = (...args) => {
      cb(...args)
      this.off(eventName, newCb)
    }
    this.on(eventName, newCb)
  }
  off(eventName, cb) {
    if (this.handlers[eventName]) {
      const removedIndex = this.handlers[eventName].indexOf(cb)
      if (removedIndex === -1) return
      this.handlers[eventName].splice(removedIndex, 1)
    }
  }
  emit(eventName, ...args) {
    if (this.handlers[eventName]) {
      this.handlers[eventName].forEach(cb => {
        cb(...args)
      })
    }
  }
}
