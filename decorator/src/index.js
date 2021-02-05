function classDecorator(target) {
  target.hasDecorator = true
}

function funcDecorator(traget, name, descriptor) {
  let originalMethod = descriptor.value
  descriptor.value = function () {
    console.log(`触发了${name}被装饰了的逻辑（先触发）`)
    return originalMethod.apply(this, arguments)
  }
  return descriptor
}

@classDecorator
class Button {
  @funcDecorator
  onClick() {
    console.log('触发了onClick的原有逻辑（后触发）')
  }
}

const button = new Button()
button.onClick()
