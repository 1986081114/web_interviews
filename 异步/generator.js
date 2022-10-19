/*
generator函数是es6提供的一种异步编程解决方案实现机制时协程

语法上首先可以理解成 generator函数是一个状态机，封装了多个内部状态。
   执行generator函数会返回一个遍历器对象， 也就是说，generator函数除了状态机，还是一个遍历器对象生成函数，返回遍历器对象，
   可以依次遍历generator函数内部的每一个状态
 
形式上generator函数是哟个普通的函数， 但是有两个特征， 
      一是function关键字与函数名之间有一个*号，
       二是，函数体内部使用yield表达式， 定义不同的内部状态


 yield和return ：
    相似之处：都能返回紧跟在语句后面的那个表达式的值， 区别在于，每次遇到yield，函数暂停执行，下一次在从该位置继续向后执行， 
    而return 不具备记忆功能， 一个函数只能有一个return语句，但可以多次执行yield

*/
/* 
迭代器（iterator）：
    迭代器是一个特殊的对象，内部封装了一个next方法， 每次执行都返回 value 和done属性，value 表示当前遍历值，done 则表示遍历是否结束。
    可迭代对象：就是部署了[Symbol.iterator]属性的对象， 这个属性是个方法， 调用这个方法就能得到迭代器， 因此[symbol.iterator]被称为迭代器生成函数
   作用： 为各种数据结构提供统一的接口，方便访问
          使得数据结构成员按照某种顺序排列，
          方便for of 访问数据

   工作原理：
        创建一个指针对象， 指向数据结构的起始位置， 
        第一次调用next方法发，指针自动指向数据结构第一个成员
        接下来每一次调用next， 指针会一直往后移动， 直到最后一个成员
        每次调用next方法， 返回一个包含value和done的对象，{value: 当前成员的值,done: 布尔值}
         value表示当前成员的值，done对应的布尔值表示当前的数据的结构是否遍历结束。
         当遍历结束的时候返回的value值是undefined，done值为true


         

    let arr = [1,2,3,4]
    let iterator = arr[Symbol.iterator]()//这就生成了一个迭代器
    iterator.next()//[value:1,done:false]
    for(let item of iterator) {
       console.log(item) //[2,3,4]//注意是从12 开始的，说明是有指针指向访问位置的
    }
    class counter {
    constructor(limit){
        this.limit = limit
    }
    [Symbol.iterator]() {
        let count = 1;
        let _this = this//注意this指向
        return {
            next() {
                if(count <= _this.limit) {
                    return {value: count, done:false}
                }else{
                return {value: undefined, done:true}
                }
            }
        }
    }
}

let count = new counter(3)[Symbol.iterator]()
console.log(count.next())
        

*/

/* 
函数的暂停和恢复：
   协程： 协程是一种比线程更加轻量级的存在， 可以看作协程是跑在线程上的任务， 一个线程可以有多个协程， 但是线程上的同时只能执行一个协程。
       一个线程执行一半，可以暂停执行，将执行权交给另一个线程，等稍后在收回执行权，恢复执行， 这种 可以并行执行，交换执行权的线程称为协程。
   比如当前执行a协程， 要启动b协程， 那么就要将a协程就要将主线程的控制权交给b协程， 这就体现了a协程暂停执行，b协程回复执行

   进程： 进程是一个具有独立功能的程序在一个数据集上的一次动态执行的过程，时操作系统进行资源分配的和调度的一个独立单位， 
   线程：是程序执行过程中一个单一的顺序控制流程，是程序执行流的最小单位，
    

*/

/* 
 generator与异步：
 
   其实yield后面可以跟thunk函数，也可以跟Promise对象。
    thunk（偏函数）：的核心逻辑是接收一定的参数，生产出定制化的函数，然后使用定制化的函数去完成功能

    const readFilePromise = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if(err) {
        reject(err);
      }else {
        resolve(data);
      }
    })
  }).then(res => res);
}
const gen = function* () {
  const data1 = yield readFilePromise('001.txt')
  console.log(data1.toString())
  const data2 = yield readFilePromise('002.txt')
  console.log(data2.toString)
}

*/

/* 
generator本质：
  暂停”才是Generator的本质 ———— 只有Generator能让一段程序执行到指定的位置先暂停，然后再启动，再暂停，再启动。
  Generator也必须利用callback才能实现。，如果yield后面用的是thunk函数，那么thunk函数需要的就是一个callback参数。
  如果yield后面用的是Promise对象，promise也需要callback才能执行回调函数resolve/reject。
*/
function* helloGenerator() {
   console.log(56)
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