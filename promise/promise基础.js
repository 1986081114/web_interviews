/* 
  promise 是异步编程的一种解决方案, promise是一个对象从中可以获取异步操作的消息，它提供各种统一
    api，各种异步操作可以用同样的方法进行处理。
    promise对象主要有两个特点：
       对象的状态不受外界影响，只有异步操作的结果可以决定当前是那个状态，其余任何操作都无法改变这个状态
       这也是promise名称的由来， 承诺，表示其他手段无法改变

       一旦状态改变，就不会在变了，promise状态的改变只有两种： 从pednging到 成功 或 从等待到失败。
       如果改变已经发生，只要添加回调函数就能获取到结果，这与事件是不同的，事件的特点是，如果你错过了他，再去监听他，是的不到结果的。

    缺点：
       无法取消promise，一旦创建就会执行，无法中途取消
       不设置回调函数，内部抛出错误，不会反应到外部
       当处于pengding状态时，无法得知进展到了哪一步（刚开始还要要完成）
*/

/*
 promise有三种状态， 等待状态pending， 执行状态fulfilled，拒绝状态rejected，一旦promise被resolve或reject
 不能再迁移至其余状态。
 promise 主要有 发布-订阅， 观察者模式
 优点：
    1.支持链式操作，解决回调地狱
    2.可以指定回调函数的方式，更加灵活
*/
/* 
promise凭什么解决了回调地狱问题：
   1.回调函数的延迟绑定，链式调用
   2.值通过返回值穿透传出
  也就是then的链式调用，可以把很深的内容传出来。解决多层嵌套问题。
   3.错误冒泡 .cache
   前面的错误会一直传递下去直到cache

错误冒泡机制：也是异常穿透
一旦其中有一个PENDING状态的 Promise 出现错误后状态必然会变为失败, 然后执行 onRejected函数，而这个 onRejected 执行又会抛错，
把新的 Promise 状态变为失败，新的 Promise 状态变为失败后又会执行onRejected......就这样一直抛下去，
直到用catch 捕获到这个错误，才停止往下抛。这就是 Promise 的错误冒泡机制。

*/

/* 
链式调用：
  then中新创建的promise状态变为fullfilled的节点是在上一个promsie的回调执行完毕的时候， 也就是说， 当一个promise的状态被fulfilled之后
  就会执行其回调函数，而回调函数返回结果会被当作value返回给下一个promise（then中产生的），同时下一个promsie状态也会改变（resolve，或reject）
  然后再去执行其回调， 以此类推， 就是链式调用

  将传给 then 的函数和新 promise 的 resolve 一起 push 到前一个 promise 的 callbacks 数组中，达到承前启后的效果
承前：当前一个 promise 完成后，调用其 resolve 变更状态，在这个 resolve 里会依次调用 callbacks 里的回调，这样就执行了 then 里的方法了
启后：上一步中，当 then 里的方法执行完成后，返回一个结果，如果这个结果是个简单的值，就直接调用新 promise 的 resolve，让其状态变更，
这又会依次调用新 promise 的 callbacks 数组里的方法，循环往复。。如果返回的结果是个 promise，则需要等它完成之后再触发新 promise 的 resolve，
所以可以在其结果的 then 里调用新 promise 的 resolve
*/

/* 

promise为什么引入微任务：
  就是处理回调的问题，有三种方法：
     1.使用同步回调，直到异步回调执行完在进行之后的任务
     2.使用异步回调， 把回调任务放在宏任务队尾
     3.使用异步回调，把回调函数放在当前宏任务的最后面

    优劣对比：
      第一种很显然是不可取的。因为同步任务会阻塞后面的任务。而且也无法实现延迟绑定了
      如果采用第二种方法， 那么执行回调（resolve/reject）时机是在所有宏任务之后。如果现有
      任务非常长， 回调时时不能执行，造成应用卡顿
      所以为了解决如上问题，考虑到延迟绑定， promise采用第三种，引入微任务，把reject/resolve放在当前宏任务队尾。
      这样可以解决：
        采用异步回调代替同步回调解决浪费cpu性能问题
        放在当前宏任务最后执行， 解决回调实时性问题。
    
   
*/

// promise异常穿透： 前一个p1的状态决定后一个p2的状态
//    当使用promise then链式调用，可以在最后指定失败的回调
//    前面任何操作出现了异常，都会传递到最后失败的回调中进行处理；
//    let p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('第一种err');
//     }, 2000)
// })
// p.then(res => {
//     console.log(111); //2s后不会输出111
// }).then(res => {
//     console.log(222); //2s后不会输出222
// }).catch(err => {
//     console.log(err) //最终直接走这里哈
// })
// 之所以会走这里是因为，是setTimeout抛出了一个错误的异常；所以不会走then;而是直接走catch;
// 之所以是走catch;根据Promise的异常穿透
// 异常穿透前提是之前的then没有reject回到函数


/*
异步编程：
   fs文件操作
   数据库操作
   ajax
   settimeout
*/
/* 
 promise 指定回调（指定then）和改变状态执行顺序
   当是同步任务，先改变状体在执行回调
   当是异步任务，先执行回调，在改变状态
   
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
console.log(a) //a是一个promise fulldied
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
    这个promise状态由then里面函数决定，即使在reject执行，reject return 返回的值非promise，返回的promise1状态都是fulfilled ， 如果返回
    异常， peomise1就是reject状态， 如果返回的是promise，此promise状态决定promise1的状态
         let p = new Promise((resolve, reject) => {
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
/* promise值穿透 解释：.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。 */

Promise.resolve(1)
  .then(function () { return 2 })
  .then(function () { return Promise.resolve(3) })
  .then(console.log) //2


/* 链式调用的顺序：*/
/* 
外部代码必须等待return执行完，promise状态变更后，外面的then才能执行,也就是外面的then 要等回家2执行结束， 接受的值
也是要回家2传递的
*/
new Promise((resolve, reject) => {
  console.log('妈妈要做饭');
  resolve();
}).then(() => {
  console.log('要买菜');
  return new Promise((resolve, reject) => {
    console.log('去菜市场');
    resolve();
  }).then(() => {
    console.log('买食物');
  }).then(() => {
    console.log('回家');
  }).then(() => {
    console.log('回家2');
    return 5
  })
}).then((r) => {
  console.log('做菜', r);//5
}).then((r) => {
  console.log('做菜2', r); //undfined
})


/* promise交替执行
 先注册先执行，外部第二个then依赖于第一个then，所以没有直接注册，进入等待。
 当内部第一个then执行完，相当于外部第一个then执行完， 所以执行外部第二个then
  外部的then需要等待外部的第一个then执行完
  我们可以发现，内外 then 是交替执行，然后交替注册的。所以才会出现输出内外交替内容。
*/

new Promise((resolve, reject) => {
  console.log('妈妈要做饭');
  resolve();
}).then(() => {
  console.log('要买菜');
  new Promise((resolve, reject) => {
    console.log('去菜市场');
    resolve();
  }).then(() => {
    console.log('买食物');
  }).then(() => {
    console.log('回家');
  }).then(() => {
    console.log('回家2');
  })
}).then(() => {
  console.log('做菜');
}).then(() => {
  console.log('做菜2');
})


new Promise(resolve => {
  resolve()
}).then(() => {
  return new Promise(r => {
    console.log('1-1');
    r()
  }).then(() => {
    console.log('1-1 p1')
  })
}).then(() => {
  console.log('1-2')
})

new Promise(resolve => {
  resolve(2);
}).then(() => {
  console.log('2-1');
}).then(() => {
  console.log('2-2');
}).then(() => {
  console.log('2-3');
})


/* 这个就不是链式调用了，属于同步执行
链式调用的注册是前后依赖的 比如上面的外部的第二个 then 的注册，是需要外部的第一个的 then 的执行完成。
变量定义的方式，注册都是同步的 比如这里的 p.then 和 var p = new Promise 都是同步执行的。
 
*/
new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
}).then(() => {
  console.log("外部第一个then");
  let p = new Promise((resolve, reject) => {
    console.log("内部promise");
    resolve();
  })
  p.then(() => {
    console.log("内部第一个then");
  })
  p.then(() => {
    console.log("内部第二个then");
  });
})
  .then(() => {
    console.log("外部第二个then");
  });

/* 
 
 
*/
let p = new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
p.then(() => {
  console.log("外部第一个then");
  new Promise((resolve, reject) => {
    console.log("内部promise");
    resolve();
  })
    .then(() => {
      console.log("内部第一个then");
    })
    .then(() => {
      console.log("内部第二个then");
    });
})
p.then(() => {
  console.log("外部第二个then");
});



/*  */
new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
      .then(() => {
        console.log("内部第一个then");
      })
      .then(() => {
        console.log("内部第二个then");
      });
    return new Promise((resolve, reject) => {
      console.log("内部promise2");
      resolve();
    })
      .then(() => {
        console.log("内部第一个then2");
      })
      .then(() => {
        console.log("内部第二个then2");
      });
  })
  .then(() => {
    console.log("外部第二个then");
  });


/*  */
new Promise((resolve, reject) => {
  console.log('外部promise');
  resolve();
})
  .then(() => {
    console.log('外部第一个then');
    new Promise((resolve, reject) => {
      console.log('内部promise');
      resolve();
    })
      .then(() => {
        console.log('内部第一个then');
        return Promise.resolve();
      })
      .then(() => {
        console.log('内部第二个then');
      })
  })
  .then(() => {
    console.log('外部第二个then');
  })
  .then(() => {
    console.log('外部第三个then');
  })

