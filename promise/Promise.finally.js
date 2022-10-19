/* finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，
     都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。

 例如请求数据，无论成功失败，都要调用的函数
*/

Promise.prototype.finally = function(callback){
    this.then(value =>{
        return Promise.resolve(callback()).then(() =>{
            return value
        })
    },
     error => {
         return Promise.resolve(callback()).then(() =>{
             throw error;
         })
     })
}

