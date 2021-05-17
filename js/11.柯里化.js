/* 
currying: 柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
  柯里化的作用
      闭包
      延迟执行
      参数复用
    缺点： 
        性能低
        创建数组去存放调用的参数，
        创建闭包堆内存有影响，
        获取argument对象比直接获取对象要慢
*/


//参数复用

/* function check(reg, txt) {
    return reg.test(txt)
}
check(/\d+/g, 'test')//false
check(/[a-z]/g, 'test')//true

//currying
function curryingCheck(reg) {
    return function(txt) {
        return reg.test(txt)

    }
}
var hasNumber = curryingCheck(/\d+/g)
var hasLetter = curryingCheck(/[a-z]/g);

hasNumber('test1');
hasNumber('tessddf');
hasLetter('21252') */
function curry(fn, args) {
    // 获取函数需要的参数长度
    let length = fn.length;
    args = args || [];

    return function () {
        let subArgs = args.concat(Array.prototype.slice.call(arguments));

        // 判断参数的长度是否已经满足函数所需参数的长度
        if (subArgs.length >= length) {
            // 如果满足，执行函数
            return fn.apply(this, subArgs);
        } else {
            // 如果不满足，递归返回科里化的函数，等待参数的传入
            return curry.call(this, fn, subArgs);
        }
    };
}
function multiFn(a, b, c) {
    return a * b * c;
}
var multi = curry(multiFn);
console.log(multi(2)(3)(4));
console.log(multi(2, 3, 4));
console.log(multi(2)(3, 4));
console.log(multi(2, 3)(4));



