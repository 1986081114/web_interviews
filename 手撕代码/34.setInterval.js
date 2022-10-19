/* 
缺点：
   再重复发送一些请求的时候会使用setInterval， 但是塔塔、也有一些弊端。

   1.setInterval对自己的调用的代码对错漠不关心， 即使调用的代码出错了，也依旧会继续调用下去。
   2.setInterval无视网络延迟， 在ajax使用轮训查询中， 无论网络状况如何， 他都会去一边一边的发送请求。 
      如果网络状况不良， 即使一个请求发送出去，没有返回结果， 依旧继续发送， 导致请求堆积
   3. setInterval并不定时， 如果他调用的代码执行事件小于定时时间， 他就会跳过调用
      这是因为定时器定时不是等到回调执行完才开始定时，而是只要依次记时结束， 插入回调就开始计时， 所以当插入回调的时候队列
      前面有别的任务在执行， 这个回调肯定不会执行， 因此如果这个时候无限定时时间到了再次插入回调， 这个时候如果队列的
      第一次回调没有执行吗那么再次插入回调浏览器就默认取消（为了防止出现回调连续执行多次的情况）
   4.内存泄漏
*/
/* 
setTimeout可能被阻塞不能按时执行，“setTimeout 的最小设置延迟是 4ms”。
  如果设置settimeout时间小于0，则设置为0
   需要同时满足嵌套层级超过 5 层，timeout 小于 4ms，才会设置 4ms”
   如果不满足嵌套五层，谷歌浏览会在 0ms和1ms取大值
   
    为什么不直接设置为 0ms 呢？
    如果浏览器允许 0ms，会导致 JavaScript 引擎过度循环，也就是说如果浏览器架构是单进程的，那么可能网站很容易无响应。
    因为浏览器本身也是建立在 event loop 之上的，如果速度很慢的 JavaScript engine 通过 0ms timer 不断安排唤醒系统，
    那么 event loop 就会被阻塞

   setTimeout(() => {
  console.log(3)
}, 3);
setTimeout(() => {
  console.log(2)
}, 2);
setTimeout(() => {
  console.log(1)
}, 1);

setTimeout(() => {
  console.log(0)
}, 0);   // 1 0 2 3

 
*/

let timeMap = {}
//，并且由于 timeId 是一个 Number 类型的变量，导致同一时刻全局只能有一个 mySetInterval 的 id 存在，
//也即无法做到清除多个 mySetInterval 的计时器。
let id = 0 // 简单实现id唯一
const mySetInterval = (cb, time) => {
  let timeId = id // 将timeId赋予id
  id++ // id 自增实现唯一id
  let fn = () => {
    cb()
    timeMap[timeId] = setTimeout(() => {
      fn()
    }, time)
  }
  timeMap[timeId] = setTimeout(fn, time)
  return timeId // 返回timeId
}


const myClearInterval = (id) => {
    clearTimeout(timeMap[id]) // 通过timeMap[id]获取真正的id
    delete timeMap[id]
  }



  //id时settimeout返回来的信息
  const id = mySetInterval(() => {
    console.log(new Date())
  }, 1000)
  