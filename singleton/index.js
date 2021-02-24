fetch('/singleton/index.html').then(async res => {
  const html = await res.text()
  const temp = document.createElement('div')
  temp.innerHTML = html
  document.body.appendChild(temp)
  let index = 1
  document.querySelector('#open').addEventListener('click', () => {
    const modal = Modal.getInstance(`第${index}个弹窗`)
    modal.style.display = 'block'
    index++
  })
  document.querySelector('#close').addEventListener('click', () => {
    document.querySelector('#modal').style.display = 'none'
  })
})

class Modal {
  constructor() {
    this.modal = null
  }
  static getInstance(msg) {
    if (Modal.modal) {
      Modal.modal.innerHTML = msg
      return Modal.modal
    } else {
      Modal.modal = document.createElement('div')
      Modal.modal.id = 'modal'
      Modal.modal.innerHTML = msg
      Modal.modal.draggable = true
      Modal.modal.style.display = 'none'
      Modal.modal.ondragend = e => {
        console.log(e)
        let { x, y } = e
        Modal.modal.style.left = x + 'px'
        Modal.modal.style.top = y + 'px'
      }
      document.body.appendChild(Modal.modal)
      return Modal.modal
    }
  }
}
