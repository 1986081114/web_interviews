/* 柯里化是函数式编程的概念： 只传递给函数一部分参数调用， 让他返回一个函数处理剩下的参数 */
/* 主要思路就是判断当前传入的参数个数是否大于原函数所需的个数，  如果是执行函数， 如果小于，返回一个函数 */
/* 
currying: 柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
  柯里化的作用
   
      延迟执行
      参数复用
      提前返回
      参数复用：拿上面 f这个函数举例，只要传入一个参数 z，执行，计算结果就是 1 + 2 + z 的结果，1 和 2 这两个参数就直接可以复用了。
     提前返回 和 延迟执行 也很好理解，因为每次调用函数时，它只接受一部分参数，并返回一个函数（提前返回），直到(延迟执行)传递所有参数为止。

    缺点： 
        性能低
        创建数组去存放调用的参数，
        1、因为使用柯里化的时候使用了闭包，最大的缺点最主要的就是闭包所有的缺点，内存得不到释放等
        获取argument对象比直接获取对象要慢
*/

function curry  (fn, ...args) {
    // 函数的参数个数可以直接通过函数数的.length属性来访问
    return args.length >= fn.length // 这个判断很关键！！！
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    ? fn(...args)
    /**
     * 传入的参数小于原始函数fn的参数个数时
     * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
    */
    : (..._args) => curry(fn, ...args, ..._args);
}


function add1(x, y, z) {
    return x + y + z;
}
const add = curry(add1);
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));
function multiFn(a, b, c) {
    return a * b * c;
}
var multi = curry(multiFn);
console.log(multi(2)(3)(4));
console.log(multi(2, 3, 4));
console.log(multi(2)(3, 4));
console.log(multi(2, 3)(4));