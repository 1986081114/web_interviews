/* finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。
这避免了同样的语句需要在then()和catch()中各写一次的情况
 例如请求数据，无论成功失败，都要调用的函数
*/

//callback回调函数，无论成功，失败都要调用，
Promise.prototype.finally = function (callback) {
    //constructor指向创建当前对象的构造函数
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    )
}