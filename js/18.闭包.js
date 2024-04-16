/* 闭包： 是一个函数以及其捆绑的周边环境状态的引用的组合, (内部函数保留对外部函数作用域的引入， 这个引入就是闭包)
 当函数可以记住并访问所在的作用域时，就产生了闭包，即使函数是在当前作用域之外执行

 闭包中的变量存储的位置是堆内存。
    假如闭包中的变量存储在栈内存中，那么栈的回收 会把处于栈顶的变量自动回收。所以闭包中的变量
    如果处于栈中那么变量被销毁后，闭包中的变量就没有了。所以闭包引用的变量是出于堆内存中的。

闭包产生的原因：
   就是当前环境中存在指向父级作用域的引用，这个引用不会随着函数出栈而销毁

   闭包： 
理论上来讲，所有函数都是闭包
 实践角度：以下函数才算是闭包：
即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）在代码中引用了自由变量


用途：
   闭包很有用， 他允许将函数与其所操作的某些数据(环境)关联起来，让开发者可以从内部函数访问外部函数的作用域。
   读取函数的内部变量
   能在变量保存在内存中，不会随着垃圾回收而销毁
闭包的缺点：正所谓物极必反，由于闭包会使函数中的变量保存在内存中，内存消耗很大，所以不能滥用闭包，解决办法是，退出函数之前，
       将不使用的局部变量删除。
*/

var greetText = 'hello'
function getGreet() {
  const name = 'vian'
  var innerFunc = function () {
    console.log(name)
  }
  return innerFunc
}
let greet = getGreet()
console.log(greetText) // hello
greet() // vian

/* 
当代码执行完return innerFunc后，当前函数执行上下文就出栈了，
由于getGreet函数返回值中，包含了引用getGreet函数词法作用域变量的函数
（返回的innerFunc函数体内包含了该函数体外，getGreet函数体内的变量name，形成了作用域链）。
 因此在getGreet执行上下文出栈的时候，该变量name会保存在内存中，getGreetVO被保存在内存中，根据作用域链被访问到，
   不会随着执行上下文的销毁而销毁，形成闭包。
*/
/* 
闭包表现形式：
   返回一个函数
   作为函数参数传递
   在定时器，ajax等异步中，只要使用了回调函数实际都使用了闭包。
   立即函数。创建了闭包， 保存了全局作用域和当前函数作用域。 */


for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, 0)
}
/* 
解决：
   立即函数 
    settimeout第三个参数
    let
   */
for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(function timer() {
      console.log(j)
    }, 0)
  })(i)
}

for (var i = 1; i <= 5; i++) {
  setTimeout(function timer(j) {
    console.log(j)
  }, 0, i)
}