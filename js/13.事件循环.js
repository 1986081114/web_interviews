/* 
浏览器使单线程的原因：
  js是单线程的，这与特的用途有关， 最为浏览器脚本语言， js的主要用途是与用户互动，以及操作Dom， 这决定了它只能单线程，
  否则会带来很复杂的同步问题，设想若果是同步任务，某一个线程修改了某一个dom，而另一个线程同时删除这个dom。那么浏览器就无法明确一哪一个为基准。

  事件循环：
      单线程意味着事件是一个一个执行的，前一个执行的时候，后一个需要等待， 但前一个若是网络请求，可能很长时间没有回应
      很容易导致cpu浪费。执行玩同步任务再执行异步，解决了一部分等待问题。，同步任务在执行栈上执行， 
      遇到异步任务就放在任务队列里。执行栈中的任务执行完之后就执行异步队列，队列任务执行完在检查栈中是否有任务，
      如果都没有就监听，所谓循环，就是上述事情重复循环以上步骤，
 执行栈和事件队列：
       
        红任务--微任务
        一个Event Loop可以有一个或多个事件队列，但是只有一个微任务队列。
            微任务队列全部执行完会重新渲染一次
            每个宏任务执行完都会重新渲染一次
        宏任务是由宿主发起的，而微任务由JavaScript自身发起。


 浏览器把异步任务分为宏任务和微任务 ，宏任务和微任务是异步任务的两个分类。
     宏任务：  宿主发起， 后运行 会触发新一轮
            代码块
             dom操作
             用户交互（鼠标键盘）
             网络请求
             settimeout， setInterval
             setImmediate(Node.js)
             IO
             UI
    微任务： js引擎触发， 先运行， 不会触发新一轮  一般是微任务的回调函数
          promise.then/.cache
          MutationObserver
   
   
   执行顺序：
        执行同步代码，这属于宏任务
        执行栈为空，查询是否有微任务需要执行
        执行所有微任务
        微任务没有了，执行宏任务
        执行一个宏任务之后检查是否有微任务
        然后开始下一轮 Event loop，执行宏任务中的异步代码
*/

/* 
简单事件怎么执行：
    代码一行一行执行， 入栈， 执行完出栈，console。log是立即执行的

*/


/* async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start');
setTimeout(() => {
    console.log('setTimeout')
}, 0);
async1();
new Promise(function (resolve) {
    console.log('promise1');
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script2') */

/* 
  执行整体代码（宏任务），碰到settimeout 是个宏任务，放到下一个宏任务队列
  await可以理解成 他修饰的代码放在new promise{}，而之后的代码全放在。then内 ,
  当前红任务执行后执行所有的微任务，之后再开启下一轮的宏任务
*/
/* 
 事件循环 ，宏任务，微任务， 浏览器和node的事件循环不同
*/

/* 第二题---------------------------------------------------- */

/* console.log('start')
setTimeout(() => {
    console.log("children1");
    Promise.resolve().then(() => {
        console.log('childen3')
    })
}, 0);

new Promise(function (resolve, reject) {
    console.log('children4');
    setTimeout(() => {
        console.log('children5');
        resolve('children6')
    }, 0);
}).then((res) => {
    console.log('children7');
    setTimeout(() => {
        console.log(res)
    }, 0);
}) */

/* 
打印start
  遇到下一个settimeout 放到下一个洪任务里
  之后在promise 打印children4
  遇到settimeout放到下第二个宏任务，由于then需要res才能执行，所以不放在微任务队列
  此时第一轮宏任务执行完，没有微任务
  执行第二轮宏任务 打印children1 把.then放在微任务内
  执行完宏任务，之行微任务， 打印children3
  运行第三轮宏任务 打印children5 此时resolve有了结果 才能把。then放到微任务内
  之后执行 
*/

/* 第三题---------------------------------- */
const p = function () {
    return new Promise((resolve, reject) => {
        const p1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1)
            }, 0);
            resolve(2)
        })
        p1.then((res) => {
            console.log(res);
        })
        console.log(3);
        resolve(4)
    });
}
p().then((res) => {
    console.log(res);
});
console.log('end');

/*
   第一轮宏任务  在p 内，
   将p1的settimeout放到下一个宏任务， p1.then 放在微任务。
   输出.3，继续输出end 这一轮宏任务结束
   输出微任务 先输出p1.then 2  之后输出p.then 4
   由于p1.then已经输出，所以promise结束，不在运行settimeout

*/