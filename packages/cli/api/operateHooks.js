const { AsyncSeriesHook } = require('tapable')

module.exports = class OperateHooks {
  constructor () {
    this.hooksMap = {}
    this.hooksTapList = []

    this.tapHook = this.tapHook.bind(this)
    this.bindHooks = this.bindHooks.bind(this)
    this.createHook = this.createHook.bind(this)
  }

  createHook (nameSpace) {
    this.hooksMap[nameSpace] = new AsyncSeriesHook()
  }

  tapHook (hookName, eventName, cb) {
    this.hooksTapList.push({ hookName, eventName, cb })
  }

  bindHooks () {
    this.hooksTapList.forEach(hook => {
      const { hookName, eventName, cb } = hook
      this.hooksMap[hookName].tapPromise(eventName, async () => {
        await cb()
      })
    })
  }
}
