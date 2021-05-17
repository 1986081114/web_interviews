/* 
  bind 绑定一个函数， 在bind被调用，这个新函数的this被指定为bind（）的第一个参数， 而其余参数，将作为新函数的参数使用,当绑定函数被调用， 这些参数
  这些参数会被插入到目标函数的开始位置，传递给绑定函数的的参数跟在后面
*/

/* this.x = 9;
var module = {
    x: 81,
    getX: function() {return this.x}
}

module.getX();//81

var retrieveX = module.getX;
retrieveX() // 9, 因为是在全局作用域调用的

var boundX = retrieveX.bind(module);
boundX() //81 */

/* 
bind的参数，会被插入到目标函数的参数列表的开始位置，传给绑定函数的参数跟在后面
*/
/* function list() {
    return Array.prototype.slice.call(arguments);
}
function addArguments(arg1, arg2) {
    return arg1 + arg2;
}

var list1 = list(1, 2, 3);//[1,2,3]
var result1 = addArguments(1, 2);//3

var leadingList = list.bind(null, 37);
var addarguments2 = addArguments.bind(null,37);

var list2 = leadingList() // [37];
var list3 = leadingList(1,2,3) // [37,1,2,3]

var result2 = addarguments2(5) // 37+5;

var result3 = addarguments2(5,10) // 37 + 5  第二个参数被忽略 */


/* 当类的方法中需要 this 指向类的实例时，你可能需要显式地把 this 绑定到回调函数，就不会丢失该实例的引用。 */
/* function LateBloomer() {
    this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function () {
    setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function () {
    console.log('I am a beautiful flower with ' +
        this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用 'declare' 方法 */

//实现bind 返回的是一个函数

Function.prototype.myBind = function () {
  if (typeof this != 'function') {
    throw new TypeError('erroe')
  }
  let self = this;
  let context = arguments[0]
  //var args = [...arguments].slice(1);
  var args = Array.prototype.slice.call(arguments, 1);

  var fbound = function () {
    //let args2 = [...arguments] //Array.prototype.slice.call(arguments)
    // instanceof用来检测某个实例对象的原型链上是否存在这个构造函数的prototype属性，this instanceof fbound === true时,
    //说明返回的fBound被当做new的构造函数调用，此时this=fBound(){}，否则this=window, 如果是的话使用新创建的this代替硬绑定的this
    return self.apply(this instanceof fbound ? this : context, args.concat([].slice.call(arguments)))
  }

  //维护原型关系链， 目的是 fbound.prototype = self.prototype, 但如果直接绑定修改，fbound中的prototype就会改变绑定函数的，
  //所以需要中转站
  var func = function () { };
  if (self.prototype) {
    func.prototype = self.prototype
  }
  //实例就可以继承绑定函数的原型中的值
  fbound.prototype = new func();
  return fbound;

}






