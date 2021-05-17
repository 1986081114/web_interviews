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
    4.async/await
         优点：代码清晰，解决了回调地狱问题
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

function asyncToGenerator(generatorFunc) {
    // 返回的是一个新的函数
    return function () {
        // 先调用generator函数 生成迭代器
        // 对应 var gen = testG()
        const gen = generatorFunc.apply(this, arguments)
        // 返回一个promise 因为外部是用.then的方式 或者await的方式去使用这个函数的返回值的
        // var test = asyncToGenerator(testG)
        // test().then(res => console.log(res))
        return new Promise((resolve, reject) => {
            // 内部定义一个step函数 用来一步一步的跨过yield的阻碍
            // key有next和throw两种取值，分别对应了gen的next和throw方法
            // arg参数则是用来把promise resolve出来的值交给下一个yield
            function step(key, arg) {
                let generatorResult

                // 这个方法需要包裹在try catch中
                // 如果报错了 就把promise给reject掉 外部通过.catch可以获取到错误
                try {
                    generatorResult = gen[key](arg)
                } catch (error) {
                    return reject(error)
                }

                // gen.next() 得到的结果是一个 { value, done } 的结构
                const { value, done } = generatorResult

                if (done) {
                    // 如果已经完成了 就直接resolve这个promise
                    // 这个done是在最后一次调用next后才会为true
                    // 以本文的例子来说 此时的结果是 { done: true, value: 'success' }
                    // 这个value也就是generator函数最后的返回值
                    return resolve(value)
                } else {
                    // 除了最后结束的时候外，每次调用gen.next()
                    // 其实是返回 { value: Promise, done: false } 的结构，
                    // 这里要注意的是Promise.resolve可以接受一个promise为参数
                    // 并且这个promise参数被resolve的时候，这个then才会被调用
                    return Promise.resolve(
                        // 这个value对应的是yield后面的promise
                        value
                    ).then(
                        // value这个promise被resove的时候，就会执行next
                        // 并且只要done不是true的时候 就会递归的往下解开promise
                        // 对应gen.next().value.then(value => {
                        //    gen.next(value).value.then(value2 => {
                        //       gen.next()
                        //
                        //      // 此时done为true了 整个promise被resolve了
                        //      // 最外部的test().then(res => console.log(res))的then就开始执行了
                        //    })
                        // })
                        function onResolve(val) {
                            step("next", val)
                        },
                        // 如果promise被reject了 就再次进入step函数
                        // 不同的是，这次的try catch中调用的是gen.throw(err)
                        // 那么自然就被catch到 然后把promise给reject掉啦
                        function onReject(err) {
                            step("throw", err)
                        },
                    )
                }
            }
            step("next")
        })
    }
}

