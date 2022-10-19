/* 
requestIdleCallback（callback， option） 将处理任务在浏览器空闲时候，
   callback回调函数：函数会接收到一个名为 Deadline 的参数，
     deadline 有两个参数
       timeRemaining(): 当前帧还剩下多少时间
       didTimeout: 是否超时
   option是一个对象： {timeout ： 事件}

一般在一帧内包括：
  用户交互
  js执行
  requestAnimationframe的调用
  布局计算
  重绘等
但如果一帧内执行的任务不多， 有了空闲时间，这段空闲事件恰好可以执行requestIdleCallback的回调


Q1: requestIdleCallback 会在每一次帧结束时执行吗？

A1: 只会在帧末尾有空闲时间时会执行，不应该期望每一次帧结束都会执行requestIdleCallback。


什么操作不适合放到 requestIdleCallback 的callback中。 更新DOM，以及Promise的回调（会使帧超时）

如果浏览器一直繁忙怎么办？
  还提供了一个可选的第二个参数，让用户设定超时执行时间(单位是毫秒)。如果设置了这个超时时间，当超过这个时间时，
  浏览器就不会考虑是否存在空闲时间，而主动去执行回调。
*/