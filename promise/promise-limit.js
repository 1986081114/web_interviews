/*  promise控制并发
如果有巨量的图⽚需要展示在⻚⾯, 除了懒加载这种⽅式, 还有什么好的⽅法限制其同⼀时间加
载的数量? */

/**
 * 关键点
 * 1. new promise 一经创建，立即执行
 * 2. 使用 Promise.resolve().then 可以把任务加到微任务队列，防止立即执行迭代方法
 * 3. 微任务处理过程中，产生的新的微任务，会在同一事件循环内，追加到微任务队列里
 * 4. 使用 race 在某个任务完成时，继续添加任务，保持任务按照最大并发数进行执行
 * 5. 任务完成后，需要从 doingTasks 中移出
 */

function limitLoader(urls, handler, limit) {
    const sequence = [].concat(urls);
    let promises = [];
    //获取在限制数量下的promises队列，z注意由于使用splice这里sequence已经不包括使用过的urls
    promises = sequence.splice(0, limit).map((url, index) => {
        return handler(url).then(() => {
            return index;
        })
    });
    /* //最快完成的promise，移除promises队列，加入下一个新的promise请求 */
    let p = Promise.race(promises);
    //遍历剩下没有请求的url
    for (let i = 0; i < sequence.length; i++) {
        //这里的res就是index ，根据index确定promises队列里那个请求已经结束，加入新的url请求
        //p每次都表示最快完成的promise 链式调用
        p = p.then((res) => {
            promises[res] = handler(sequence[i]).then(() => {
                return res
            })
            return Promise.race(promises);
        })
    }
}

function loadImg(url) {
    return new Promise((resolve, reject) => {
        console.log('-------' + url.info + '  start');
        setTimeout(() => {
            console.log(url.info + '  ok');
            resolve()
        }, url.time);
    })
}

const urls = [
    {
        info: 'link1',
        time: 3000
    },
    {
        info: 'link2',
        time: 2000
    },
    {
        info: 'link3',
        time: 5000
    },
    {
        info: 'link4',
        time: 1000
    },
    {
        info: 'link5',
        time: 1200
    },
    {
        info: 'link6',
        time: 2000
    },
    {
        info: 'link7',
        time: 800
    },
]

limitLoader(urls, loadImg, 3)