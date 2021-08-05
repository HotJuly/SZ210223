
const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
}


export function nextTick (cb,vm) {
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
}


/*
nextTick源码重点:
  1.在主线程中,无论执行多少个nextTick,都只会开启一个then微任务
  注意:也就是说多个nextTick共用一个then微任务
  2.Vue介绍自己的视图更新是异步的
    如果响应式属性发生变化,Vue使用nextTick更新视图,更新DOM的时间点是在then微任务中
  3.Vue只所以敢说nextTick的回调函数一定会在DOM更新之后执行的原因
    就是因为更新DOM的操作,就是第一个nextTick,后续所有nextTick都会在这个nextTick之后执行
*/