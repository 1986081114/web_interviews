/*
   函数声明：
   函数，未完成某一功能的程序指令的集合
   1.声明函数 function name（）  会变量提升
   2.函数表达式 let name = function（） 不会变量提升
   3.new Function()
*/
/*

函数类型：
    具名函数： 有具体姓名的函数
    匿名函数： function（）{}
    箭头函数： 箭头函数是匿名函数， 不能作为构造函数，奴能使用new
              不能使用arguments，取而代之是 rest
               不能绑定this，会捕获其上下文作为自己的this
               箭头函数没有prototype原型对象，没有super， 不能使用生成器，yield
               call/apply调用箭头函数，无法对this绑定，所以传入第一个值省略
*/
/*
函数调用：
    有四种调用方式，每种方式不同于this的初始化
      1.作为函数调用，this指向全局  name（）
      2.作为方法调用 this指向包含的对象
      3.作为构造函数调用 new
   4.间接调用，作为函数方法调用函数， call/apply，并且可以设置this指向，call() 和 apply()区别在于第二个参数：
      apply传入的是一个参数数组，也就是将多个参数组合成为一个数组传入，而call则作为call的参数传入（从第二个参数开始）
   function myFunction(a, b) {
    return a * b;
}：
*/

/*

箭头函数与普通函数区别：
   1.箭头函数与普通函数样式不同， 箭头函数语法更加清晰， 简介， 箭头函数时=>定义函数，普通函是function定义函数
   2.箭头函数会捕获上下文的this，在定义时就确定了，不会改变。而function体内的this指向调用时的对象
   3.箭头函数不能使用argument，用rest代替，在箭头函数访问arguments实际是访问外层执行环境的值。
   4.箭头函数不能使用yield，因为没有generator
   5.箭头函数不能作为构造函数，不能使用new，因为自己没有this，他的this其实是继承了外层执行环境的this， 且this指向不会改变， 作为构造函数this要指向新的对象
      apply，call，bind不会影响他的this，也没有prototypeof

*/
/*

/*
 立即函数： 在定义时就会立即执行
     包含两部分： 第一部分就是包围在圆括号里面的匿名函数， 这个函数拥有独立的词法作用域， 这不仅避免了外界访问匿名函数中的变量， 而且不会污染全局
     第二部分再一次使用（）创建一个立即执行函数表达式， js引擎到此将直接执行函数
     圆括号也叫做分组运算符， 两种用法： 如果表达式放在圆括号里，作用是求值， 放在行数后面作用是调用函数

     作用： 不必为函数命名， 避免了污染全局变量
     立即执行函数内部形成了单独的作用域， 可以封装一些外部无法读取的私有变量

*/
/*
将立即执行函数分配给一个变量， 不是存储函数本身，而是执行后的结果
var result = (function () {
    var name = "Barry";
    console.log(565)
    return name;
})();
// IIFE 执行后返回的结果：
result; // "Barry"

以上也可以这么写 输出结果一样
var result = function () {
    var name = "Barry";
    console.log(565)
    return name;
}();

(function (str) {console.log(str)})(world) //world

*/
/*

函数声明式 function fo（）{}会变量提升
函数表达式： var foo = function 不会变量提升
*/

/*
立即执行函数几种写法：
   （function（）{}（））
   （function（）{}）（）
   function（）{}（）会报错 但是可以在前面加上! + - ~ void new 可以运行

*/

/*


函数创建：
   函数的作用域在函数定义的时候就决定了， 因为函数内部有一个[[scope]]，保存所有父变量对象的层级链，当函数激活时，进入函数上下文，创建VO/AO后
     就将活动对象的添加到作用域链的前端

     结合着之前讲的变量对象和执行上下文栈，我们来总结一下函数执行上下文中作用域链和变量对象的创建过程：

var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();
执行过程如下：

1.checkscope 函数被创建，保存作用域链到 内部属性[[scope]]

checkscope.[[scope]] = [
    globalContext.VO
];
2.执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 函数执行上下文被压入执行上下文栈

ECStack = [
    checkscopeContext,
    globalContext
];
3.checkscope 函数并不立刻执行，开始做准备工作，第一步：复制函数[[scope]]属性创建作用域链

checkscopeContext = {
    Scope: checkscope.[[scope]],
}
4.第二步：用 arguments 创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明

checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    }，
    Scope: checkscope.[[scope]],
}
5.第三步：将活动对象压入 checkscope 作用域链顶端

checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    },
    Scope: [AO, [[Scope]]]
}
6.准备工作做完，开始执行函数，随着函数的执行，修改 AO 的属性值

checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: 'local scope'
    },
    Scope: [AO, [[Scope]]]
}
7.查找到 scope2 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出

ECStack = [
    globalContext
];
*/

