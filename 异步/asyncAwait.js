/* 
  异步的发展：
      1.回调函数（callback）
        优点，解决同步问题
        缺点： 只要一个任务耗时过长，后面任务必须排队等待， 
                回调地狱， 不能用try cache捕获错误， 不能return
    2.promise
        优点：解决了回调地狱问题，链式调用， 
        缺点： 无法取消promise， 错误需要回调函数获取，处于等待状态pending无法判断进展到那一步（刚开始还是要结束）
        
    3.Generator
         优点：可以控制函数执行
    4.async/await(生成器的语法糖)
         优点：
            内置执行器： generator函数的执行必须依赖执行器， 而async自带执行器， 调用方法和普通函数一样。
            更好的语义： async和await相比于 * yield 更加的语义化
            更好的适用性： yield命令后只能是chunk函数，或者promise对象， 而async函数命令后面可以是promise， 或者原始类型的值，
            返回的是promise 返回promise 比generator返回iterator方便多，可以执行then
         缺点： await将异步代码改造成同步代码，如果多个异步操作没有依赖性而是用await会导致性能降低
*/
/* 
promise和async/await
   async：真正的穿行的同步写法， 代码阅读容易， 对于田间判断和其余流程语句比较友好， 可以直接写在判断条件里。
   async缺点： 无法处理promise。reject问题， 需要借助 try...cache..
              使用await可能会导致性能问题， 因为await会阻塞代码，或许之后的异步代码并不依赖前者， 但仍需等待
              try..cache内的变量无法传递给下一个try，promise的then/cache内部定义的变量，可以通过then链式参数传递下去

  promise缺点： 一旦执行，无法中途取消， 链式调用then中间不能跳出来。
                如果不设置回调函数， promise内部抛出的错误，不会反映到外部。 
                promise内部如何运行，检测很难， 处于pending状态， 无法得知目前进展到哪一阶段。

*/

/* 
 await如何用同步实现异步：做了什么？
    当await code 时候被js转换成一个promise
    async function test() {
        console.log(100)
        let x = await 200
        console.log(x)
        console.log(200)
        }
        console.log(0)
        test()
        console.log(300)

  await 100;
被js引擎转换成
  let promise = new Promise((resolve,reject) => {
   resolve(100);
})
这里调用resolve， 进入微任务队列， 然后js引擎暂停当前协程的运行， 把线程执行权交给父协程，父协程对await返回的promise
调用then，来监听promise状态的改变，在之后检查到这个微任务时
        promise.then(value => {
        // 1. 将线程的执行权交给test协程
        // 2. 把 value 值传递给 test 协程
        })
     现在执行权到了test协程手上，test 接收到父协程传来的200, 赋值给 a 

总结一下，async/await利用协程和Promise实现了同步方式编写异步代码的效果

*/
/* 
async 是一个通过异步执行并隐式返回 Promise 作为结果的函数。
async/await 本质上依然是基于Promise，但在使用上更加简便符合自然习惯。
- async函数内部同步执行。await之间相当于.then。
- async函数外部的调用异步执行。
- 需要try/catch await应对promise reject的情况。
*/

/* generator实现async await */
/* 
  如果一个函数加上async返回promise，可以把 async 看成将函数返回值使用 Promise.resolve() 包裹了下。
   其实async/await看起来，像极了generator（生成器），只是生成器它不能自动迭代，只能手动触发。
   第一次调用 next()传入的值不会被使用，因为这一次调用是为了开始执行生成器函数：
   function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

let g = gen();

g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.next() // { value: 3, done: true }
*/

function getNum(num){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num+1)
        }, 1000)
    })
  }
  
  //自动执行器，如果一个Generator函数没有执行完，则递归调用
  function asyncFun(generator){
    const iterator = generator()
    const next = (data) =>{
       let {value, done} = iterator.next(data)
       if(done) return 
       value.then(data =>{
         next(data)
       })
    }
    next()
  }
  
  // 所需要执行的Generator函数，内部的数据在执行完成一步的promise之后，再调用下一步
  var func = function* (){
  var f1 = yield getNum(1);
  var f2 = yield getNum(f1);
  console.log(f2) ;
  };
  asyncFun(func);
