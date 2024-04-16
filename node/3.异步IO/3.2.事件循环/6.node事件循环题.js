setTimeout(() => {
  console.log("setTimeout");
}, 0);

setImmediate(() => {
  console.log("setImmediate");
});

// 问题: setTimeout setImmediate执行顺序？
/* 
  node.js里面setTimeout(fn, 0)会被强制改为setTimeout(fn, 1)

  外层同步代码一次性全部执行完，遇到异步API就塞到对应的阶段
遇到setTimeout，虽然设置的是0毫秒触发，但是被node.js强制改为1毫秒，塞入times阶段
遇到setImmediate塞入check阶段
同步代码执行完毕，进入Event Loop
先进入times阶段，检查当前时间过去了1毫秒没有，如果过了1毫秒，满足setTimeout条件，执行回调，如果没过1毫秒，跳过
跳过空的阶段，进入check阶段，执行setImmediate回调
如果同步代码执行时间较长，进入Event Loop的时候1毫秒已经过了，setTimeout执行，如果1毫秒还没到，就先执行了setImmediate。

*/


  
console.log('outer');

setTimeout(() => {
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
  setImmediate(() => {
    console.log('setImmediate');
  });
}, 0);
/* 

先执行setimmediate在执行settimeout，
 处理里面的setTimeout，因为本次循环的timers正在执行，所以他的回调其实加到了下个timers阶段
 处理里面的setImmediate，将它的回调加入check阶段的队列
 */