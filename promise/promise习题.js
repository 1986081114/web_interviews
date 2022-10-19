/* const promise1 = new Promise((resolve, reject) => reject());

const promise2 = promise1.then(
    null,
    function () {
        return 123;
    }
)

promise2.then(
    () => {
        console.log('promise 完成')
    },
    () => {
        console.log('promise 拒绝')
    }
) */
/*
 promise 基于当前promise状态判断，promise状态不是不变的，居于每次promise状态决定下一次promise状态
 promise1.then返回调用reject，，所以发返回 123，这是一个完成状态，所以promise调用， resolve
*/

/* 
实现红绿灯
*/
function red() {
    console.log("red")
}
function green() {
    console.log("green")
}
function yellow() {
    console.log("yellow")
}

var light = function (timmer, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            cb();
            resolve()
        }, timmer)
    })
}



var step = function () {
    Promise.resolve().then(function () {
        return light(3000, red)
    }).then(function () {
        return light(2000, green)
    }).then(function () {
        return light(1000, yellow)
    }).then(
        function () {
            step()
        }
    )
}
step()



/* 


0 个 Ajax 同时发起请求，全部返回展示结果，并且至多允许三次失败，说出设计思路

 let p1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('p1 done'))
   })
   
   let p2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('p2 done'))
   })

   let p3 = new Promise((resolve, reject) => {
    setTimeout(() => reject('p3 fail'))
   })
 
   let p4 = new Promise((resolve, reject) => {
    setTimeout(() => reject('p4 fail'))
   })
   let p5 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('p5 done'))
   })

   let p6 = new Promise((resolve, reject) => {
    setTimeout(() => reject('p6 fail'))
   })
   let p7 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('p7 done'))
   })

   let count = 0
   let wrapped = function (arr, num) {
    return arr.map(item => {
        return new Promise((resolve, reject) => {
            item.then(d => {
              resolve(d)
            }).catch(e => {
                count++
                if (count > num) {
                 reject(e)
                } else {
                 resolve(e)
                }
            })
        })
    })
}

   let arr = wrapped([p1, p2, p3, p4,p5,p6,p7],2)

   Promise.all(arr).then(res => {
    console.log(res)
   }).catch(e => {
    console.error(e)
   })*/

   //promise 返回值不能是promise本身
   const promise = Promise.resolve()
  .then(() => {
    return promise
  })
promise.catch(console.error)

