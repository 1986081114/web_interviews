/*
generator函数是es6提供的一种异步编程解决方案

语法上首先可以理解成 generator函数是一个状态机，封装了多个内部状态。
   执行generator函数会返回一个遍历器对象， 也就是说，generator函数除了状态机，还是一个遍历器对象生成函数，返回遍历器对象，可以依次遍历generator函数内部的每一个状态
 
形式上generator函数是哟个普通的函数， 但是有两个特征， 一是function关键字与函数名之间有一个*号，
       二是，函数体内部使用yield表达式， 定义不同的内部状态

generator函数的调用方法与普通函数一样， 也是在函数名后面加上一对圆括号，不同的是调用generator函数后， 该函数并不执行， 返回的也不是函数运算的结果， 而是一个指向内部状态的指针对象
 generator是分段执行的，可以暂停执行，也可以恢复执行 yield表达式是暂停执行的标记，而next方法可以恢复执行。

 yield和return ：
    相似之处：都能返回紧跟在语句后面的那个表达式的值， 区别在于，每次遇到yield，函数暂停执行，下一次在从该位置继续向后执行， 
    而return 不具备记忆功能， 一个函数只能有一个return语句，但可以多次执行yield

*/

/* 
函数的暂停和恢复：
   协程： 协程是一种比线程更加轻量级的存在， 可以看作协程是跑在线程上的任务， 一个线程可以有多个协程， 但是线程上的同时只能执行一个协程。
         协程不被操作系统内核管理， 而完全是有程序管理（也就是用户在执行）这样带来的好处就是性能得到了很大的提升，不会像线程切换那样消耗资源。
   比如当前执行a协程， 要启动b协程， 那么就要将a协程就要将主线程的控制权交给b协程， 这就体现了a协程暂停执行，b协程回复执行


*/
function* helloGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
let hw = helloGenerator()
//console.log(hw) //object[generator]
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
/*
 调用generator函数，返回一个遍历器对象， 代表generator函数的内部指针， 以后每次调用遍历器对象的next方法， 就会返回一个有着value和done两个属性的对象
  value属性表示当前内部状态的值，done表示是否遍历结束
*/

/*
next（）方法参数， yield表达式本身没有参数，或者说总是返回undefied， next方法可以带一个参数，该参数就会被当作上一个yield表达式的值
                  由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}aa
a.next() // Object{value:NaN, done:true}.


var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }

*/