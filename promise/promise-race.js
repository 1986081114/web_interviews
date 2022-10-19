/* 
promise.race: 返回一个promise，它将与第一个传递的 promise 相同的完成方式被完成。
   它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个完成的方式是两个中的哪个。如果传的迭代是空的，
     则返回的 promise 将永远等待。

     promise.race 不是只执行一个promise，而是只返回最快的promise的结果。
*/

const race = function (promises) {

  return new Promise(function (resolve, reject) {
    promises.forEach(promise => {
      promise.then(resolve, reject)
    })

  })

}

/* const p1 = new Promise(function (resolve) { setTimeout(resolve, 200, 1) })

const p2 = new Promise(function (resolve) { setTimeout(resolve, 100, 2) })

race([p1, p2]).then(function (res) { console.log(res) }) // 2 */


/* 
  promiserace,犹如遍历数组需要时间，当settimeout事件过小时。数组顺序可能会影响promise的执行顺序
*/
const p3 = new Promise(function (resolve) { setTimeout(resolve, 0.0002, 1) })

const p4 = new Promise(function (resolve) { setTimeout(resolve, 0.0001, 2) })

race([p3, p4]).then(function (res) { console.log(res) }) // 1