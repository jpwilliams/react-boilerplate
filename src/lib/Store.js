import EventEmitter from 'eventemitter3'

class StoreEmitter extends EventEmitter {
  constructor () {
    super()
    this.cache = {}
  }

  emit (eventName, ...args) {
    this.cache[eventName] = args

    return super.emit(eventName, ...args)
  }

  get (eventName) {
    return this.cache[eventName]
  }

  on (eventName, callback) {
    if (this.cache.hasOwnProperty(eventName)) {
      callback(this.cache[eventName])
    }

    return super.on(eventName, callback)
  }
}

const storeEmitter = new StoreEmitter()

export default storeEmitter
