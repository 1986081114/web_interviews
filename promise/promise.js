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
                    console.log()
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

