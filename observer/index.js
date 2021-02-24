class Publisher {
  constructor() {
    this.observer = []
    console.log('构建发布者')
  }
  add(observer) {
    this.observer.push(observer)
    console.log('新增观察者：', observer)
  }
  remove(observer) {
    const delInd = this.observer.findIndex(observer)
    if (delInd > -1) {
      this.observer.splice(delInd, 1)
    }
  }
  notify() {
    this.observer.forEach(observer => {
      observer.update(this)
    })
    console.log('已通知所有观察者')
  }
}

class Observer {
  constructor() {
    console.log('观察者创建成功')
  }
  update() {
    console.log('Observer.update invoked')
  }
}

class PrdPublisher extends Publisher {
  constructor() {
    super()
    this.prdState = null
    console.log('PrdPublisher created')
  }
  setState(state) {
    this.prdState = state
    this.notify()
    console.log('PrdPublisher.setState invoked')
  }
  getState() {
    console.log('PrdPublisher.getState invoked')
    return this.prdState
  }
}

class DevObserver extends Observer {
  constructor() {
    super()
    this.prdState = null
    console.log('DevObserver created')
  }
  update(pubisher) {
    this.prdState = pubisher.getState()
    this.work()
    console.log('DevObserver.update invoked')
  }
  work() {
    console.log('begin work')
  }
}
