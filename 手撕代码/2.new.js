//new运算符创建了一个用户定义的对象类型的实例或者具有构造函数的内置对象类型,

//实现new关键字

function myNew() {
	//拿到第一个关键字,即构造函数，并在参数内删除
	var fun = [].shift.call(arguments);
	// ES6 new.target 是指向构造函数
	myNew.target = fun
	if (!fun) {
		throw 'function'
	}
	if (typeof fun != 'function') {
		throw 'function'
	}
	var obj = {};
	Object.setPrototypeOf(obj, fun.prototype);
	//将构造函数的this指向返回对象，这样obj就可以访问到构造函数中的属性
	var res = fun.apply(obj, arguments);
	return res instanceof Object ? res : obj

}
function myNew(fn, ...args) {
	if (!fu) {
		throw 'function'
	}
	if (typeof fu != 'function') {
		throw 'function'
	}
    let instance = Object.create(fn.prototype);
    let res = fn.apply(instance, args); // 改变this指向

    // 确保返回的是一个对象(万一fn不是构造函数)
    return typeof res === 'object' ? res: instance;
}

/*
  new 创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例
      这个实例可以调用原型链上的方法。

  创建过程：
	创建一个新对象，
	并且将新对象的原型(__proto__)指向构造函数的原型链Func.prototype
	执行构造函数，并且this指向新定义的对象
	返回新对象

自创建一个新对象后，如果调用新对象没有的属性或者方法，会沿着原型链查找
*/
/*
 返回值
   构造函数返回原始值，虽然例子中只有返回了 1，但是你可以试试其他的原始值，结果还是一样的，毫无意义，不返回。
   如果返回对象会导致new操作符没有生效
*/
		// function A(){
	 //        console.log("A"); //A
	 //        return "aaa";
	 //    }
	 //    var obj1 = new A();
	 //    console.log(obj1);  //A{}
	    //如果返回值是基本数据类型 js会自动忽略这个返回值,也就是跟没有写返回值一样 最终返回的还是新创建的实例对象
// ========================================================================================	     
	    // function B(){
	    //     console.log("B");  //B
	    //     return {b:"bbb"};//字面量创建对象 ===（等同于）new Object({b:"bbb"})
	    // }
	    // var obj2 = new B();
	    // console.log(obj2);  //{b:"bbb"}
	    //如果返回值是引用数据类型 则实际返回的就是这个引用数据类型（复杂数据类型），此时函数返回值即return，只跟当前写的数据类型有关，跟新创建的实例对象没有任何关系！
// =======================================================================================				
	    //常规用法
	    // function C(){
	    //     console.log("C");   //C
	    // }
	    // var obj3 = new C();
	    // console.log(obj3);   //C{}
			//如果没写return，这个构造函数也有返回值，返回当前创建的新对象，因为new做了这件事
// =======================================================================================
  // function D(){
	    //     console.log("D");  //D
	    //     return this;
	    // }
	    // var obj4 = new D();
	    // console.log(obj4);   //D{}
	    //如果函数的返回值是this 那么就跟没有写返回值结果是一样的，因为new是this指向当前创建的新对象，即实例

