/*
  https://juejin.cn/post/7175125949053632549
 global: 全局作用域
 local： 本地作用域（比如函数内部）
 block： 块作用域
 script作用域(函数作用域) let、const 声明的全局变量会保存在 Script 作用域，这些变量可以直接访问，但却不能通过 window.xx 访问
 Closure: 闭包作用域
 模块作用域：来自ES Module,  ES Module是目前ECMAScript规范中所提出的实现模块化的一种方式，而且主流浏览器也均支持，因此“模块作用域

 作用域是指程序中定义变量的区域， 该位置决定了变量的生命周期，通俗地理解， 作用域就是变量与函数的可访问范围， 控制变量和蛤属的的
	 可见性和生命周期
作用域：
	es6之前： 全局作用域中的对象在代码中任何地方都可以访问， 其生命周期伴随着页面的生命周期
			  函数作用域就是在函数内部定义的变量或者函数， 并且定义的变量或者函数只能在函数内部被访问， 函数执行结束之后，
				函数内部定义的变量会被销毁
		块级作用域： 就是使用大括号包裹一段代码， 比如函数，判断语句， 循环语句， 甚至单独一个{}
*/
/*
es6之前是不支持块级作用域的，因为之前设计这门语言的时候，并没有i想到js会火起来， 所以按照最近简单的方式设计， 没有块级作用域
  再把作用域内部的变量统一提升无疑是最快速，最简单的。在编译阶段，会被提取到执行上下文的变量环境， 所以这些变量会在整个函数体
  内部的任何地方都能被访问到， 也就是js的变量提升。

变量提升的问题：
   1.变量容易在不被察觉的情况下被覆盖，
   2.本应该被销毁的变量没有被销毁

作用域let声明的变量存放在语法环境的一个单独的区域， 这个区域中的变量并不影响作用于外的变量， 语法环境相当于一个栈， 每当有一个
作用域块就生成一个单独区域，保存声明的let变量， 并压入栈顶， 当执行结束弹出， 这就是此法环境的结构，当执行console(a),沿着语法环境自顶向下查找
，如果没有找到， 在继续在变量环境查找
*/

/*
变量提升方面： var声明的变量存在变量提升， 可以在生命之前调用， 值为undefined，
			  let const 不会变量提升，存在暂时性死区，
极快作用域方面： var不存在块级作用域， let const存在块级作用域。
声明方面： var允许重复声明变量， let const 在同一作用域下不允许重复声明变量，
		const声明时必须赋值，一旦声明，就不能改变，但如果是复合类型，由于存储的是引用地址，所以值可以改变，但能改变地址
		使用Object.freeze(obj) 冻结obj,就能使其内的属性不可变

delete操作符返回一个布尔值： true指删除成功，否则返回false. 但是通过 var, const 或 let 关键字声明的变量无法用 delete 操作符来删除

变量与内存的关系主要就是 ，变量名-内存地址-内存空间

声明过程：
  if else 中带function, var同样也会先被声明和定义.
  遇到var, 在任何语句执行开始之前就完成了声明和初始化为undefined，即变量提升，
  遇到function 声明，初始化，赋值一开始就完成了，所以函数的变量提升优先级更高
  在变量提升阶段：带 var 的只声明还没有被定义，带 function 的已经声明和定义
  let解析器进入块级作用域，发现let关键字，变量声明完成，并没有初始化就是连undefined都没有，此时如果子作用域提前访问，会报错，未定义
	  这就是暂时性死区的原因，等到解析到有let哪一行，才会初始化，并且赋值，
 const类似于let

 内存分配：
	var或直接在栈内存里预分配内存空间，然后等实际语句执行时在存储对应变量，如果传入引用类型，就会在堆内存里开辟一个内
	 存空间存户实际内容，栈内存储指向堆的指针。
	let是不会在栈内预分配内存空间，而且在栈内存分配内存空间时会检查，如果有相同的变量名就报错。
	const也不会预分配内存空间，在栈内存分配变量时也会做检查，不过const存储的变量是不可以修改的，


	在函数创建阶段:遇到同名声明分为两种情况：
	   遇到同名函数声明，将被替换
	   遇到同名变量声明： 跳过

	var定义的变量可以跳出块级作用域，但不能跳出函数作用域

	词法环境存储let const
	变量环境存储var
	词法环境有两个组成部分:

		1、环境记录：存储变量和函数声明的实际位置

		2、对外部环境的引用：可以访问其外部词法环境

*/
/*
为什么var能重复声明而let const 不能：
   在创建的上下文中有两个区域，变量环境，词法环境， var是定义在变量环境中，let const定义在词法环境
   使用var声明时， v8只会检查词法环境是否有该变量， 如果有就报错， 如果没有就会将该变量添加到变量环境
   使用let const 引擎会同时检查词法环境和变量环境 

*/

/* 
  不带var
*/
fn();
// console.log(v1); // v1 is not defined
console.log(v2); // 2019
console.log(v3); // 2019
function fn(){
    var v1 = v2 = v3 = 2019; // 相当于 window.v2 = 2019; var v1 = v2,
    console.log(v1);
    console.log(v2);
    console.log(v3);
}


// 重名问题
//var 和 function 的变量同名 var 会先进行变量提升，但是在变量提升阶段，函数声明的变量会覆盖 var 的变量提升，
// 所以直接结果总是函数先执行优先。
console.log(a);   
var a=1;
function a(){
    console.log(1);
}
// 或
console.log(a);   
function a(){
    console.log(1);
}
var a=1;
// 输出都是： ƒ a(){ console.log(1);}

// 但如果有了执行过程， fn会被覆盖
/* 
带 var 声明的和带 function 声明的其实都是在 window 下的属性，也就是重名了，根据变量提升的机制，
fn的变量提升过程是fn =>undefined =>oxffeeaa，随后JS 代码自上而下执行时此的 fn 是fn = 12，
输出的window.fn = 12，所以 fn() ==> 12() 又是一个类型错误 TypeError

*/
var fn = 12
function fn() {
    console.log('林一一')
}
console.log(window.fn)
fn()
/* 输出
*  12
*  Uncaught TypeError: fn is not a function
*/



/* 
undefined 10, 20 , undefined
函数内声明的变量 a 属于函数的私有作用域的，所以和全局变量 a 无关
b.c 输出的结果是 undefined。一开始还以为是循环引用了，但是 = 优先级是从右到左的，
所以变量提升阶段 b=undefined后，将 c 赋值成 undefined，最后才将这个对象的引用地址给 b。所以最后输出的是 undefined。

*/
var a = 10;
(function () {
    console.log(a) 
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()

var b = {
    a,
    c: b
}
console.log(b.c);

// 匿名执行函数和非匿名自执行函数在 全局环境 下不具备变量提升的机制, IIFE 函数具备自己的作用域，所以全局下不会变量提升

var a = 10;
(function c(){
})()
console.log(c)
// Uncaught ReferenceError: c is not defined

// 匿名自执行函数在 自己的作用域 内存在正常的变量提升
var a = 10;
(function(){
    console.log(a)
    a = 20
    console.log(a)
})()
console.log(a)
// 10, 20, 20

// 非匿名自执行函数的函数名在 自己的作用域 内变量提升，且修改函数名的值无效，这是非匿名函数和普通函数的差别
var a = 10;
(function a(){
    console.log(a)
    a = 20
    console.log(a)
})()
console.log(a) // 10
// ƒ a(){a = 20 console.log(a)}  ƒ a(){a = 20 console.log(a)}

/* 
首先在全局环境下，var 声明的变量 a 会变量提升，但是非匿名函数不会在全局环境下变量提升因为具备自己的作用域了，
而且上面的函数名 a 同样变量提升了，值就是函数 a 的应用地址值，输出的结果就是a(){a = 20 console.log(a)}。
而且非匿名自执行函数名是不可以修改的，即使修改了也不会有任何作用，严格模式下还会报错，
所以最后输出的 a 还是 a(){a = 20 console.log(a)}
*/








