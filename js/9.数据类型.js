/*
 数据类型 ：
    六种原始类型：string，number，undefined， symbol，boolean， BigInt，
     严格来讲 null叫跟根原始类型
    引用类型：
    Object,
    内置对象类型：
      内置对象就是对象的子类型，  object， array， function， map，set，weakmap，weakset

    检测：
      typeof  检测所有的基本数据类型 除了null null会返回object的原理是因为，不同的对象在底层都是二进制的， 在js中二进制前三位为0的话就会判为object，
              null的二进制表示全为0
        typeof nill = Object，
        typeof function = function(注意是function不是Function，是缩写，每个Onject构造器都是由Object构造器派生)
        typeof判断 new生成的都是Object
        typeof(999999n) 返回 bignit
          typeof NaN = number

  判断 null：
     null === null
     Object.prototype.__proto__ == null


    Object.prorotype.toString.call可以检测所有类型，
    . 通过interface来判断一个对象是否是某个构造函数的实例
    console.log(Object.prototype.toString.call("jerry"));//[object String]
console.log(Object.prototype.toString.call(12));//[object Number]
console.log(Object.prototype.toString.call(true));//[object Boolean]
console.log(Object.prototype.toString.call(undefined));//[object Undefined]
console.log(Object.prototype.toString.call(null));//[object Null]
console.log(Object.prototype.toString.call({name: "jerry"}));//[object Object]
console.log(Object.prototype.toString.call(function(){}));//[object Function]
console.log(Object.prototype.toString.call([]));//[object Array]
console.log(Object.prototype.toString.call(new Date));//[object Date]

     constructor：
     constructor 是 Object 类型的原型属性，它能够返回当前对象的构造器（类型函数）。利用该属性，可以检测复合型数据的类型，如对象、数组和函数等。
     （ array.constructor === Array ）Null 和 Undefined 没有 constructor 方法，不能通过其判断，
       constructor 是不安全的，constructor 指向是可以被改变的
       对于对象、数组等复杂类型可以使用Object对象的constructor属性进行检测,但undefined和null特殊值不能够使用constructor
                          var o={}; alert(o.constructor == Object);  //true

             var a=[];alert(o.constructor==Array); //true


     Instanceof 的使用规则是： instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性
                                          实例是否属于某种类型。

                   1.左侧必须是对象
                   let num = 1
            num instanceof Number // false

            num = new Number(1)
            num instanceof Number // true


            let arr = []
            arr instanceof Array // true
            arr instanceof Object // true
            Array.isArray(arr) // true

            2.但是上面那个问题，当然，基础类型也会有这个问题，就是与Object对比。没办法，Object在原型链的上层，所以都会返回true，如下：

            (new Number(1)) instanceof Object // true

            3.但function特殊
             function A() {}
            let a = new A()
            a instanceof Function // false
            a instanceof Object // true
            A instanceof Function // true
            这里要注意，function A() {}相当于let A; A = function() {}，然后分析：

            a是new出来，所以是经过构造，因此已经是对象，不再是函数，所以false。

            a是经过构造的对象，返回ture没问题。

      Object.is与===q  区别：
          Object在严格等于的条件下修复了一些特殊问题：
                  console.log(Object.is(+0,-0)) //false
                  console.log(+0 === -0) //true

                  console.log(Object.is(+NaN, -NaN))//true
                  console.log(+NaN === -NaN)//false

                  
                  console.log(Object.is(NaN, NaN))//true
                  console.log(NaN == NaN)//false
                  NAN表示9007199254740990（2^53-2 ）个特殊字符的合集，即这么多个特殊值被占用表示NAN，
                  所以Nan并不是一个值而是一群值，所以并不相同

                  function is(x, y) {
                     if (x === y) {
                        //运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
                        return x !== 0 || y !== 0 || 1 / x === 1 / y;
                     } else {
                        //NaN===NaN是false,这是不对的，我们在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
                        //两个都是NaN的时候返回true
                        return x !== x && y !== y;
                     }
                     
                  }


*/
/*
Bigint和Number区别：
    number类型的数字有精度限制，数值的精度只能到53个二进制位，大于这个范围就无法精确表示。
    Bigint没有位数限制， 任何位数的整数都可以精确表示，，但是只能表示整数， 为了与number区分，bigint类型的数据必须添加后缀n。
    bigint可以使用负号， 但不能使用+， number不能与bigint混用。
*/
/*
基础类型和引用类型的区别:
    1. 声明时不同的内存分配：
          基础类型存储在栈中，值也存储在变量访问的位置；
             这是因为原始类型占据的空间是固定的， 所以将他们存储在较小的内存空间栈中， 方便迅速查找值
          引用类型： 引用地址存储在栈中， 值存储在堆内， 也就是说存储在变量的值是一个指针， 指向对象的内存地址
              这是因为引用值大小会改变， 不能放在栈内，会降低变量的查找速度， 相反把地址放在栈内， 地址大小固定， 对变量性能没有影响。

    2. 复制变量时的不同：
       基础类型，再将一个变量赋值给另一个变量， 会将原始值的副本赋值给新变量， 此后这两个变量完全独立，不会影响
       引用类型： 会把内存地址赋值给新的变量， 两个变量都指向堆内的同一个对象，会互相影响
    3.：参数传递不同：
         基础类型， 只是把变量值传给参数， 之后这个参数和变量互不影响
         引用类型，把内存地址传给参数， 这也是为什么函数内对参数修改会影响外边变量的原因。
    4.访问机制：
       基础类型可以直接访问，
       引用类型需要得到这个对象在堆内存的地址，然后按照这个地址获取值，也就是按引用访问。
    5.基础类型的值是不会改变的，基础类型一般也不会添加属性和方法。类型比较也是值得比较
       引用类型值可以变化，可以添加属性和方法， 比较是指针地址的比较

       闭包变量是存在堆内存中的。
*/
/* 
为什么有的编程要求void 0 代替undefined：  void 运算符计算给定的表达式并返回undefined
   console.log(void 任意 === undefined) // true 
   console.log(void (console.log('test console')));
   // test console
   // undefined
   写成void 0 没有副作用

   Undefined类型表示未定义，它的类型只有一个值就是undefined，任何变量在赋值前都是Undefined类型，值为undefined，
   但是js代码中的undefined是一个变量而非一个关键字（这也是js公认错误之一）所以为了避免无意中的篡改，建议使用void0 获取undefied。
   因为undefined有可能会被赋值，undefined是一个变量，并不是一个关键字，不存在赋值报错的情况，全局的undefined被赋值总是会失败，
   但是如果我们在对象的属性上创建了一个名为undefined的属性，那么情况就不同了

            var testUndefined = function(){
         var obj = {}
         var undefined = 'underscore'
         var window = {
            'undefined': 'bb'
         }
         console.log(window) //{'undefined': 'bb'}
         console.log(undefined) //underscore
         console.log(window.undefined) //bb
         console.log(obj.name === undefined) // false
         console.log(obj.name === window.undefined) // false
         console.log(obj.name === (void 0)) // true
         }

 
*/




