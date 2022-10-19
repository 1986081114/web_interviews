/* 
 call使用一个指定的this和单独给出的参数调用一个函数
  function.call(thisArg, arg...);
  thisArgm,可选的，在函数function调用时指向的this 如果thisArg不存在则默认为window
*/
/* let name2 = "ajianajian";
setTimeout(function () {
    name2 = "kuangzhanshi";
    console.log(b);
}, 1000)

b = {
    name1: name2,
    age: 18
}
setTimeout(() => {
    console.log(b);
}, 2000) */

class Test {
    fn() {
        console.log(this)
    }
}

let { fn } = new Test;
console.log(fn())
fn();//？？？

/*
 apply和call的区别：
     他们的作用是一样的都是改变this指向,将一个对象交给另一个对象执行，是立即执行
     区别在于传入函数，
       第一个参数都是指向函数体内this的指向 ，不传默认是window
       第二个参数，apply传入带下标的集合，数组或类数组，它们会被转换成类数组
        call接受任意参数，但是如果将所有的参数作为数组传入，它们会作为一个整体映射到 Function 对应的第一个参数上，
         之后参数都为空。func.call(obj, [1,2,3])
            // func 接收到的参数实际上是 [1,2,3],undefined,undefined

       call 比 apply 的性能要好，平常可以多用 call, call 传入参数的格式正是内部所需要的格式
     */
/*
bind方法域apply和call比较类似， 也是改变函数体内的this， 不同的是，bind方法返回的是函数，并且需要稍后调用才会执行， 而apply和call则是立即调用
 者都可以传参，但是apply是数组，而call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入。
*/

/* 
实现思路
改变this指向：可以将目标函数作为这个对象的属性
利用arguments类数组对象实现参数不定长
不能增加对象的属性，所以在结尾需要delete
*/

Function.prototype.mycall = function(context,...args) {
    console.log(this) //使用call的函数
    console.log(context)
    if(typeof this !=='function') {
      throw new Error('')
    }
  
     context = context || window
    context.fn = this
    const res = context.fn(...arg)
    delete context.fn
    return res
  }
  
  
  Function.prototype.myapply = function(context,args) {
    if(typeof this !=='function') {
      throw new Error('')
    }
  
     context = context || window
    context.fn = this
    const res = context.fn(args)
    delete context.fn
    return res
    
  }
  
  var name = "小白";
  var obj = {
      name: "小红"
  };
  
  function sayName() {
      return this.name;
  }
  console.log(sayName.myapply(obj));   //小红
  console.log(sayName.mycall(obj));    //小红