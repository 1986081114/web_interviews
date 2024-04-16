// https://www.srcmini.com/897.html
/* 
js里面的代码不是一行一行执行，而是一段一段执行。

执行上下文就是js代码被解析和执行时所在环境的抽象概念,是一个对象，不同环境有不同的上下文对象 一般的上下文执行环境有：
   1）全局执行上下文 1个 window
   2）函数执行上下文  可以有很多个， 只有当函数被调用才会被创建， 每当一个新的执行上下文被创建，都会按照顺序执行一系列的操作。
   3）eval函数执行上下文，eval() 函数作用：可以接受一个字符串str作为参数，并把这个参数作为脚本代码来执行。
   执行上下文的任务是保存当前环境的相关数据，供其执行使用

 特点： 单线程，只在主线程上运行， 
         按照顺序从上到下执行
        全局上下文只有一个
        函数执行上下文没有限制，函数每调用一次就会产生一个新的执行上下文
 重要属性： 
     变量对象（AO）
     作用域链（全局是作用域的头）
        作用域时变量和函数的可访问范围，
        当查找变量的时候，会从当前上下文对象中查找， 如果没有找到就到父级（词法层面的的）执行上下文去寻找， 
          一直找到全局上下文的变量对象， 也就是全局对象，这样由多个执行上下文的变量对象构成的链表就是作用域链
          作用域链保证了有权访问的变量和函数是有序的
     this
    阶段：
      进入执行上下文
      代码执行`
*/
/* 
多个执行上下文怎么管理呢？ js单线程，必须一个个执行，那么这么多的执行上下文是按照什么顺序呢？
  利用栈，执行栈（调用栈） 先进后出，
  js首次执行，会创建一个新的全局执行上下文，并推入到栈中，
  每当有函数被调用，引擎就会为该函数创建一个新的函数执行上下文然后推入栈中
  当栈顶函数执行完毕，该函数对性的执行上下文就会从执行栈中pop，
*/
/* 生命周期：
        创建阶段
        执行阶段
        销毁阶段 */
/* 
1.创建阶段:
   所以执行上下文在概念上表示如下：
  ExecutionContext = {
    ThisBinding = <this value>,
    LexicalEnvironment = { ... },
    VariableEnvironment = { ... },
 }

   1):确定this的值，也就是绑定this  
      全局执行上下文中, this指的就是全局对象, 浏览器环境指向window对象, nodejs中指向这个文件的module对象.
       函数执行上下文较为复杂, this的值取决于函数的调用方式. 具体有: 默认绑定、隐式绑定、显式绑定、new绑定、箭头函数.
   2）创建词法环境
     词法环境是一种持有标识符—变量映射的结构（这里的标识符指的是变量/函数的名字，而变量是对实际对象[包含函数类型对象]或原始数据的引用）。
     在词法环境的内部有两个组件：(1) 环境记录器和 (2) 一个外部环境的引用。
         环境记录: 存储变量和函数声明的实际位置;
         对外部环境的引用: 用于访问其外部词法环境.
    词法环境记录有两个类型： 
        全局环境: 拥有一个全局对象(window对象)及其关联的所有属性和方法(比如数组的方法splice、concat等), 
            同时也包含了用户自定义的全局变量. 但是全局hanshu环境中没有外部环境的引用, 也就是外部环境引用为null.
        函数环境: 用户在函数中自定义的变量和函数存储在环境记录中, 包含了arguments对象. 而对外部环境的引用可以是全局环境
                也可以是另一个函数环境(比如一个函数中包含了另一个函数).
    环境记录存储let const 声明的变量（一般函数也在变量环境里）
    环境记录器也有两个类型：
       *  在全局环境中，环境记录器是对象环境记录器， 用来定义出现在全局上下文中的变量和函数的关系
       * 在函数环境，环境记录器是声明式环境记录器，存储变量，函数和参数（包含 argument和函数的length）
    
    /* GlobalExectionContext = { // 全局执行上下文
        LexicalEnvironment: {   // 词法环境
            EnvironmentRecord: {   // 环境记录
                Type: "Object"       // 全局环境
                // 标识符绑定在这里
            },
            outer: <null>          // 外部环境引用
        }
    }
    FunctionExectionContext = { // 函数执行上下文
        LexicalEnvironment: {   // 词法环境
            EnvironmentRecord: {   // 环境记录
                Type: "Object",       // 函数环境
                // 标识符绑定在这里
            },
        outer: < Global or FunctionEnvironment> // 外部环境引用
        }
    }

   3）创建变量环境 ，
       变量环境其实也是一个词法环境, 因此它具有上面定义的词法环境的所有属性.
        其环境记录器持有变量声明语句在执行上下文中创建的绑定关系。
        词法环境组件和变量环境的一个不同就是前者被用来存储函数声明和变量（let 和 const）绑定，而后者只用来存储 var 变量绑定。
        区别是储存var声明的变量  =undefined， 引擎遇到函数声明greet，将其添加到变量环境中并将其值设为函数greet的引用
        全局上下文中：，代码中全局变量和函数都保存在全局上下文的变量环境中。
*/

let a = 20;
const b = 30;
var c;

function multiply(e, f) {
 var g = 20;
 return e * f * g;
}

c = multiply(20, 30);
/* 

只有遇到调用函数 multiply 时，函数执行上下文才会被创建。
GlobalExectionContext = {

  ThisBinding: <Global Object>,

  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 在这里绑定标识符
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
    }
    outer: <null>
  },

  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 在这里绑定标识符
      c: undefined,
    }
    outer: <null>
  }
}

FunctionExectionContext = {
  ThisBinding: <Global Object>,

  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这里绑定标识符
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>
  },

VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这里绑定标识符
      g: undefined
    },
    outer: <GlobalLexicalEnvironment>
  }
}


*/

/* 
 2.执行阶段：
     1）变量赋值
     2）函数引用
     3）执行其余代码
     遇到函数引用：
         1）js引擎会创建函数执行上下文，就会在当前执行上下文中寻找声明， 在全局执行上下文变量环境中找到函数声明。进行编译(分析)
         2）编译结束之后，就进入执行阶段， 执行结束后，如果函数中有变量引入， 就会在当前执行上下文寻找，之后再到外部环境引入
          var value = 1; function foo() {console.log(value);} ，function bar() { var value = 2;foo();} bar();所以会输出1
             
*/
/* 
遇到同名函数声明，将变量环境中函数引用指向新的函数代码
 当有函数已经命名，遇到同名变量声明，跳过该声明。
greet()
console.log(myName)
function greet() {
  console.log('hello')
}
function greet() {
  console.log('hi')
}
var myName = 'vian'
var greet = '你好'
console.log(myName)

//hi,undefined,   vian

*/

/* 
爆栈：
  现在我们知道了调用函数时会先创建一个执行上下文并压入调用栈call stack中，执行结束才会出栈。这个调用栈是有容量的，
    一旦压入栈中的执行上下文数量超过这个容量，就会爆栈。递归是最容易造成这种错误的，无限递归或者递归过深。

*/
/* 


/* 
静态作用域与动态作用域：
   作用域： 作用域是指在程序中定义变量的区域，该位置决定了变量的生命周期。通俗地理解，作用域就是变量与函数的可访问范围，
       即作用域控制着变量和函数的可见性和生命周期

   js采用词法（静态）作用域，函数的作用域在定义的时候就决定了
   动态作用域，函数的作用域在函数调用的时候才决定
*/
var value = 1;

function foo() {
    console.log(value)
}
function bar() {
    var value = 2;
    foo()
}
bar(),

//指向foo函数，现在内部作用域查看是否有变量value， 没有就根据书写位置（词法作用域）在上一层查找，

var data = [];

for (var i = 0; i < 3; i++) {
    data[i] = function () {
        console.log(i);
    };
}

data[0]();
data[1]();
data[2]();
//答案是都是 3，让我们分析一下原因：
// 这里的 i 是全局下的 i，共用一个作用域，当函数被执行的时候这时的 i=3，导致输出的结构都是3。

当执行到 data[0] 函数之前，此时全局上下文的 VO 为：

globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}
当执行 data[0] 函数的时候，data[0] 函数的作用域链为：

data[0]Context = {
    Scope: [AO, globalContext.VO]
}
data[0]Context 的 AO 并没有 i 值，所以会从 globalContext.VO 中查找，i 为 3，所以打印的结果就是 3。

data[1] 和 data[2] 是一样的道理。

所以让我们改成闭包看看：

var data = [];

for (var i = 0; i < 3; i++) {
    data[i] = (function (i) {
        return function () {
            console.log(i);
        }
    })(i);
}

 
for (var j=0;j<5;j++){
    (function(a){
        console.log(a)
    })(j); // --->这里我们将一个匿名函数当做参数传递给这个替换的匿名函数
}

// 相当于匿名函数
for (var j=0;j<5;j++){
      ()(j); // --->这里我们将 aa 变成一个匿名函数
}

// 假设匿名函数变成aa命名上述就相当于
function aa(){ // 接收一个函数作为参数
    return function(a){
        console.log(a)
    }
}

for(var j=0;j<5;j++){
    aa()(j)
}

// 也相当于
function aa(fun){ // aa函数接收一个函数作为参数，并且将函数作为返回值给返回出去
    return fun;
}
 
for(var j=0;j<5;j++){
    aa(function(a){ //aa 执行后的结果是传进去的匿名函数，函数（）便是执行函数
        console.log(a);
    })(j)
}
//aa变成匿名函数 就和最开始一样了,所以自治性函数也相当于 一个 匿名的， 传入和穿出都是函数的 函数
// 因为 aa 中不存在变量，但是匿名函数是作为 aa 的参数传递进来的，所以他的返回值就是引用了这个参数获得的，所以这里是一闭包，
//   接下来就是传进去的匿名函数，这里的闭包是由于匿名函数 console.log 引用了参数 a 而形成的，所以这里又形成了一个闭包。


data[0]();
data[1]();
data[2]();
当执行到 data[0] 函数之前，此时全局上下文的 VO 为：

globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}
跟没改之前一模一样。

当执行 data[0] 函数的时候，data[0] 函数的作用域链发生了改变：

data[0]Context = {
    Scope: [AO, 匿名函数Context.AO globalContext.VO]
}
匿名函数执行上下文的AO为还是没有i，

匿名函数Context = {
    AO: {
        arguments: {
            0: 0,
            length: 1
        },
        i: 0
    }
}
data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从匿名函数 Context.AO 中查找，
这时候就会找 i 为 0，找到了就不会往 globalContext.VO 中查找了，
即使 globalContext.VO 也有 i 的值(值为3) ，所以打印的结果就是0。