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
let p = new Promise((resolve, reject) => {
    resolve(56)
})
p.then(
    (data) => {
        return new Promise((resolve, reject) => {
            resolve(60)
        })
    },
    (res) => {
        console.log(res)
    }
).then(value => {
    console.log(value) //56
}).then(value => {
    console.log(value)//undefined
})

因为then返回的promise状态由then回调函数的返回值决定，
倒数第二个then返回一个成功的promise， 但是并没有返回值， 也就是undefined
Promise {<fulfilled>: undefined}
__proto__: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: undefined

*/