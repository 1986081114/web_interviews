/*
 promise有三种状态， 等待状态pending， 执行状态fulfilled，拒绝状态rejected，一旦promise被resolve或reject
 不能再迁移至其余状态。
 promise 主要有 发布-订阅， 观察者模式
 优点：
    1.支持链式操作，解决回调地狱
    2.可以指定回调函数的方式，更加灵活
*/
/*
异步编程：
   fs文件操作
   数据库操作
   ajax
   settimeout
*/
/*
let p = new Promise((resolve, reject) => {
    resolve(56)
})
let a = p.then(
    (data) => {
        console.log(data)
    },
    (res) => {
        console.log(res)
    }
)
console.log(a) //a是一个promise
*/
/*
 Promise构造函数：Promise（excutor）{}
   1.excutor函数：执行器，
   2.resolve函数，内部定义成功时调用的函数
   3.reject函数， 内部定义失败时调用的函数
.then(onResolve, onReject) => {}
    onresolve成功回调函数
    onreject失败回调函数
 说明： 指定用于得到成功value的成功回调函数和用于失败的失败回调函数，返回一个新的promise1
    这个promise状态由then里面函数决定，即使在reject执行，rejectreturn 返回的值非promise，返回的promise1状态都是fulfilled ， 如果返回
    异常， peomise1就是reject状态， 如果返回的是promise，此promise状态决定promise1的状态
      llet p = new Promise((resolve, reject) => {
    reject(56)
            })
            let a = p.then(
                (data) => {
                    console.log(data)
                },
                (res) => {
                   return 56
                }
            )
            console.log(a) //a是一个promise
.cache（onReject）
   失败的回调函数
*/
/*
resolve（）
 let p = Promise.resolve(参数)
 //如果传入的参数为非promise对象， 返回的结果为成功的promise
 传入的是promise，则参数的结果决定了resolve、的结果

 reject()
  promise.reject无论传什么都是失败的
*/
/*
修改promise状态
   1.resolve（） pending=》fulfilled
   2.reject pending =》 reject
   3.抛出错误
      throw‘出问题了’ reject
*/
/*
promise异常穿透：
   当使用promise then链式调用，可以在最后指定失败的回调
   前面任何操作出现了异常，都会传递到最后失败的回调中进行处理；
   let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('第一种err');
    }, 2000)
})
p.then(res => {
    console.log(111); //2s后不会输出111
}).then(res => {
    console.log(222); //2s后不会输出222
}).catch(err => {
    console.log(err) //最终直接走这里哈
})
之所以会走这里是因为，是setTimeout抛出了一个错误的异常；所以不会走then;而是直接走catch;
之所以是走catch;根据Promise的异常穿透
异常穿透前提是之前的then没有reject回到函数

*/
/*
中断promise链式调用
   有且只有一种 就是返回一个pending状态的promise
   因为返回一个pending状态的promise相当于promise状态没有改变， then的回调函数都不能执行
   let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok');
    }, 2000)
})
p.then(res => {
    console.log(111)
    // 有且只有一种方式去中断Promise；让Promise的状态是padding
    return new Promise(() => {})
}).then(res => {
    console.log(222);
}).catch(err => {
    console.log(err)
})


*/