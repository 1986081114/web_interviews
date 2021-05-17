

class Events {
  constructor() {
    this.events = new Map();
  }

  addEvent(key, fn, isOnce, ...args) {
    //是否有key事件，没有创建新的
    const value = this.events.get(key) ? this.events.get(key) : this.events.set(key, new Map()).get(key)
    //每次触发的时箭头函数
    value.set(fn, (...args1) => {
      fn(...args, ...args1)
      //如果只执行一次，执行后删除
      isOnce && this.off(key, fn)
    })
  }
  //订阅事件
  on(key, fn, ...args) {
    if (!fn) {
      console.error(`没有传入回调函数`);
      return
    }
    this.addEvent(key, fn, false, ...args)
  }
  //触发事件
  fire(key, ...args) {
    if (!this.events.get(key)) {
      console.warn(`没有 ${key} 事件`);
      return;
    }
    /* entries() 可以把一个对象的键值以数组的形式遍历出来 */
    for (let [, cb] of this.events.get(key).entries()) {
      cb(...args);
    }
  }
  //取消订阅
  off(key, fn) {
    if (this.events.get(key)) {
      this.events.get(key).delete(fn);
    }
  }
  //为指定事件注册一个单次监听器，
  once(key, fn, ...args) {
    this.addEvent(key, fn, true, ...args)
  }
}
// 请使用原生代码实现一个Events模块，可以实现自定义事件的订阅、触发、移除功能
const fn1 = (...args) => console.log('I want sleep1', ...args)
const fn2 = (...args) => console.log('I want sleep2', ...args)
const event = new Events();
event.on('sleep', fn1, 1, 2, 3);
event.on('sleep', fn2, 1, 2, 3);
event.fire('sleep', 4, 5, 6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6
event.off('sleep', fn1);
event.once('sleep', () => console.log('I want sleep'));
event.fire('sleep');
// I want sleep2 1 2 3
// I want sleep
event.fire('sleep');
// I want sleep2 1 2 3

