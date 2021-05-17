/* 
 promise.all(),传进来可能是promise数组，数组中不一定需要都是Promise对象，但是一定具有Iterator接口，
   如果不是的话，就会调用Promise.resolve将其转化为Promise对象之后再进行处理。数组包括promise或者常量，
   所有执行结束返回结果，有一个报错返回cache
 即使中间有一个promise报错，也不会影响其他的promise执行，因为promise在实例化时已经执行了(他们都是同时执行，例如一个用2秒，一个用一秒，全部完成只需要2秒)，
   看到。then。all都已经执行结束了
  如果所有的Promise对象（p1,p2,p3）都变成fullfilled状态的话，生成的Promise对象（p）也会变成fullfilled状态，
   p1,p2,p3三个Promise对象产生的结果会组成一个数组返回给传递给p的回调函数；
   如果p1,p2,p3中有一个Promise对象变为rejected状态的话，p也会变成rejected状态，
   第一个被rejected的对象的返回值会传递给p的回调函数。


   
 该Promise.allSettled()方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果。

当您有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个promise的结果时，通常使用它。

相比之下，Promise.all() 更适合彼此相互依赖或者在其中任何一个reject时立即结束。
 
   使用all时如果有reject会返回拒绝状态，如何让他返回完成状态呢？只需要给每个promise添加.catch
*/
/* 
优点：
缺点： 
   无法取消promise ，一旦创建立即执行， 中途无法取消，
   错误需要回调函数获取， 不设置回调函数， promise内部抛出错误，不会反映到外部
   当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
*/
const pro1 = new Promise((res, rej) => {
    setTimeout(() => {
        res(1)
    }, 1000);
})
const pro2 = new Promise((res, rej) => {
    setTimeout(() => {
        res(1)
    }, 2000);
})
const pro3 = new Promise((res, rej) => {
    setTimeout(() => {
        rej(3)
    }, 3000);
})

let proAll = PromiseAll([pro1, pro2, pro3])
//需要一个计数器，来确认所有 promise 对象都已经 resolved，之后返回结果。需要一个数组，按顺序记录返回promise结果
function PromiseAll(promiseArray) {
    return new Promise((resolve, reject) => {
        //1.判断是否输入的数组
        if (!Array.isArray(promiseArray)) {
            return reject(new Error('请传入数组！'));
        }
        const res = [];
        const promiseNums = promiseArray.length;
        let counter = 0;
        for (let i = 0; i < promiseNums; i++) {
            //2.判断数组内的元素是否是promise或者 常量 ，使用resolve直接转变成promise类型
            Promise.resolve(promiseArray[i]).then(value => {
                counter++;
                //3.由于每个promise运行时间不一样，使用res[i],可以确保输出顺序与输入顺序一样
                res[i] = value;
                //每个promise都成功才能返回fulfilled
                if (counter === promiseNums) {
                    resolve(res)
                }
            }).catch(e => reject(e))
        }
    })
}


/* promise封装ajax */
/* 终端promise */


