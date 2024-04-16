/* 函数或者方法有相同的名称， 但是参数列表不相同， 这样的同名不同参数的函数或者方法之间称之为函数重载（方法） 
 但是js里面是没有重载的需要自己写 如splice根据传入参数不同操作不同，
 实现方法：
  
*/
/* 
 obj： 要绑定方法的对象
name： 绑定方法的名称
fn要绑定的方法

函数的length属性，返回的是函数定义时形参的数量
argument。length函数调用时真正给函数的数量
利用闭包，通过old将每次传进来的fn'保存， 每次调用这个方法，根据传入值的不同，可以根据old找到之前传入的fn
*/
/* function addMethod (obj, name, fn) {
    //把obj【name】保存在old里面
    var old = obj[name];
    //重新定义obj【name】
    obj[name] = function () {
        //如果函数需要的参数和实际传入的参数个数相同，直接调用fn
        if (fn.length === arguments.length) {
            return fn.apply(this, arguments)
            //如果不同，判断old是不是函数， 如果是就调用，刚才保存的onj【name】
        } else if (typeof old === 'function') {
            return old.apply(this, arguments)
        }
    }
} */


function addMethod(object, name, fn) {
    var old = object[name]; //把前一次添加的方法存在一个临时变量old里面
    object[name] = function () { // 重写了object[name]的方法
      // 如果调用object[name]方法时，传入的参数个数跟预期的一致，则直接调用
      if (fn.length === arguments.length) {
        return fn.apply(this, arguments);
        // 否则，判断old是否是函数，如果是，就调用old
      } else if (typeof old === "function") {
        return old.apply(this, arguments);
      }
    }
  }
  
  addMethod(window, 'fn', (name) => console.log(`我是${name}`))
  addMethod(window, 'fn', (name, age) => console.log(`我是${name},今年${age}岁`))
  addMethod(window, 'fn', (name, age, sport) => console.log(`我是${name},今年${age}岁,喜欢运动是${sport}`))
  
  /*
  * 实现效果
  */
  
  window.fn('林三心') // 我是林三心
  window.fn('林三心', 18) // 我是林三心，今年18岁
  window.fn('林三心', 18, '打篮球') // 我是林三心，今年18岁，喜欢运动是打篮球









