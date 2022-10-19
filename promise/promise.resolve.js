/* 
 promise.resolve返回一个给定值之后的promise对象
 promise.resolve实现三个要点：
    传参一个promise，直接返回
    传参带有then方法 ， 返回的promise会跟随这个对象， 采用他的最终状态作为自己的状态
    其余情况直接返回以该值为成功状态的promise对象。
*/
Promise.resolve = (params)=>{
    if(params instanceof Promise) return params
    return new Promise((resolve, reject) => {
        if(params && params.then && typeof params.then === 'function'){
            params.then(resolve,reject)
        }else {
            resolve(params)
        }
    })
}

//promise.reject中传入的参数会作为reason原封不动的往下传
Promise.reject = function(reason){
    return new Promise((resolve,reject) =>{
        reject(reason)
    })
}