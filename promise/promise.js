/* https://www.bilibili.com/video/BV1GA411x7z1?p=27&spm_id_from=pageDriver */
/* https://blog.csdn.net/luo1831251387/article/details/115643059 */
//构造函数
function myPromise(executor) {
    this.promiseState = 'pending'
    this.promiseResult = null;
    //保存then里面的回调函数
    this.callabcks = [];
    const self = this //这里保存this是因为额在resolve里面this是全局window
    //resolve和reject主要是修改状态和设置结束值,如果是异步还要执行then的回调


    function resolve(data) {
        //状态只能更改一次判断
        if (self.promiseState !== 'pending') return
        self.promiseState = 'fulfilled'
        self.promiseResult = data
        setTimeout(() => {
            self.callabcks.forEach(item => {
                item.onResolved(data)
            })

        });
    }

    function reject(data) {
        if (self.promiseState !== 'pending') return
        self.promiseState = 'rejected'
        self.promiseResult = data
        setTimeout(() => {
            self.callabcks.forEach(item => {
                item.onRejected(data)
            })
        });

    }
    //同步调用执行器
    //try是为了可以抛出异常
    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

//添加then方法
myPromise.prototype.then = function (onResolved, onRejected) {
    const self = this;
    if (typeof onResolved !== 'function') {
        onResolved = value => value;
    }
    if (typeof onRejected !== 'function') {
        onRejected = reason => {
            throw reason
        }
    }
    return new myPromise((resolve, reject) => {
        //封装重复的部分
        function callback(type) {
            try {
                //将结果值传入
                let result = type(self.promiseResult);
                //判断
                if (result instanceof Promise) {
                    //如果是Promise对象
                    result.then(v => {
                        resolve(v);
                    }, r => {
                        reject(r);
                    })
                } else {
                    //结果对象状态为【成功】
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }
        }
        
        if (this.promiseState === 'fulfilled') {
            setTimeout(() => {
                callback(onResolved)
            });


        }
        if (this.promiseState === 'rejected') {
            setTimeout(() => {
                callback(onRejected);
            });

        }
        //promise执行异步的时候当运行到then，时候， 异步还没有运行，所以promiseState = ‘pending
        //所以要想调用then里面的回调函数，需要在promise里的resolve运行回调
        if (this.promiseState === 'pending') {
            //保存回调函数
            this.callabcks.push({
                onResolved: function () {
                    callback(onResolved);
                },
                onRejected: function () {
                    callback(onRejected);
                }
            })
        }
    })

}

myPromise.prototype.cache = function (onRejected) {
    return this.then(undefined, onRejected);
}
//添加resolve方法
//返回一个成功或者失败的promise
myPromise.resolve = function (value) {
    //返回promise对象
    return new myPromise((resolve, reject) => {
        if (value instanceof myPromise) {
            value.then(v => {
                resolve(v);
            }, r => {
                reject(r);
            })
        } else {
            resolve(value);
        }
    })
}
//添加reject方法,无论传入什么都是失败的
myPromise.reject = function (reason) {
    return new myPromise((resolve, reject) => {
        reject(reason);
    });
}

const p = myPromise.resolve(56)




// 三个常量用于表示状态
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
    const that = this
    this.state = PENDING

    // value 变量用于保存 resolve 或者 reject 中传入的值
    this.value = null

    // 用于保存 then 中的回调，因为当执行完 Promise 时状态可能还是等待中，这时候应该把 then 中的回调保存起来用于状态改变时使用
    that.resolvedCallbacks = []
    that.rejectedCallbacks = []


    function resolve(value) {
         // 首先两个函数都得判断当前状态是否为等待中
        if(that.state === PENDING) {
            that.state = RESOLVED
            that.value = value

            // 遍历回调数组并执行
            that.resolvedCallbacks.map(cb=>cb(that.value))
        }
    }
    function reject(value) {
        if(that.state === PENDING) {
            that.state = REJECTED
            that.value = value
            that.rejectedCallbacks.map(cb=>cb(that.value))
        }
    }

    // 完成以上两个函数以后，我们就该实现如何执行 Promise 中传入的函数了
    try {
        fn(resolve,reject)
    }cach(e){
        reject(e)
    }
}

// 最后我们来实现较为复杂的 then 函数
MyPromise.prototype.then = function(onFulfilled,onRejected){
  const that = this

  // 判断两个参数是否为函数类型，因为这两个参数是可选参数
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v=>v
  onRejected = typeof onRejected === 'function' ? onRejected : e=>throw e

  // 当状态不是等待态时，就去执行相对应的函数。如果状态是等待态的话，就往回调函数中 push 函数
  if(this.state === PENDING) {
      this.resolvedCallbacks.push(onFulfilled)
      this.rejectedCallbacks.push(onRejected)
  }
  if(this.state === RESOLVED) {
      onFulfilled(that.value)
  }
  if(this.state === REJECTED) {
      onRejected(that.value)
  }
}
