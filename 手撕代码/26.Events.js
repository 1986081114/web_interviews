class EventEmitter{
  constructor (maxListeners) {
      this.events = {}
      //最大监听数
      this.maxListeners = maxListeners || Infinity
  }
  //触发事件
  emit(event, ...args) {
      const cbs = this.events[event];
      if(!cbs || cbs.length ==0) {
          console.log("不存在事件");
          return this
      }
      cbs.forEach(cb => cb.apply(this, args))
      return this
  }
  //订阅事件
  on(event, cb) {
      if(!this.events[event]) {
          this.events[event] = []
      }
      if(this.maxListeners !== Infinity && this.events[event].length >= this.maxListeners) {
          console.log(`当前事件${event}超过最大监听数了`)
          return this
      }
      this.events[event].push(cb);
      //return this是为了可以链式调用
      return this
  }
  once(event, cb) {
      const func = (...args) => {
          this.off(event,func)
          cb.apply(this, args)

      }
      this.on(event, func)
      return this
     
  }
  off(event, cb){
      if(!cb) {
          this.events[event] = null
      }else {
          this.events[event] = this.events[event].filter(item => item != cb)
      }
      return this
  }
}


const add = (a,b) => console.log(a+b)
const log = (...arg) => console.log(...arg)
const myevent = new EventEmitter(3);
//订阅事件
myevent.on('add', add);
myevent.on('log',log)
myevent.on('log',log)
myevent.on('log',log)
myevent.on('log',log)
myevent.emit('add', 1,2)
myevent.emit('log', 'hi~')
myevent.off('add')
myevent.emit('add', 1,2) 
myevent.once('once',add)
myevent.emit('once', 1,2)
myevent.emit('once', 1,2)
myevent.emit('once', 1,2)






