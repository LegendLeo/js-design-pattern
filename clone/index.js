
    function cloneLoop(obj) {
      function getType(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1)
      }
      let root = getType(obj) === 'Array' ? [] : {}

      // 声明栈
      let loopList = [
        {
          parent: root,
          key: null,
          data: obj,
        },
      ]

      while (loopList.length) {
        const node = loopList.pop()
        const { parent, key, data } = node

        // 初始化赋值目标
        let res = parent
        if (key) {
          res = parent[key] = getType(data) === 'Array' ? [] : {}
        }

        for (let key in data) {
          if (typeof data[key] === 'object') {
            loopList.push({
              parent: res,
              key,
              data: data[key],
            })
          } else {
            res[key] = data[key]
          }
        }
      }

      return root
    }

    function cloneForce(obj) {
      function getType(params) {
        return Object.prototype.toString.call(obj).slice(8, -1)
      }

      let root = getType(obj) === 'Array' ? [] : {}
      let uniqueList = []

      let loopList = [
        {
          parent: root,
          key: null,
          data: obj,
        },
      ]
      while (loopList.length) {
        const node = loopList.pop()
        let { parent, key, data } = node

        let res = parent
        if (key) {
          res = parent[key] = getType(data) === 'Array' ? [] : {}
          // 判断唯一性，目的是兼容循环引用
          // 寻找数据是否已经拷贝过
          let uniqueData = uniqueList.find(item => item.data === data)
          console.log(uniqueData)
          // 拷贝过则直接引用原来数据
          if (uniqueData) {
            parent[key] = uniqueData.target
            break
          }
          // 没有拷贝过，则进行拷贝操作
          uniqueList.push({
            data,
            target: res,
          })
        }

        for (let k in data) {
          if (typeof data[k] === 'object') {
            loopList.push({
              parent: res,
              key: k,
              data: data[k],
            })
          } else {
            res[k] = data[k]
          }
        }
      }

      return root
    }

    let obj = { a: { b: 1 } }
    obj.a.b = obj.a
    console.log(obj)
    let obj1 = cloneForce(obj)
    console.info(obj1)