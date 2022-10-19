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


function addMethod(obj, name, fn) {
    var old = obj[name];
    obj[name] = function () {
        console.log(1) //打印1
        if (fn.length === arguments.length) {
            console.log(2) // 打印2
            return fn.apply(this, arguments);
        } else if (typeof old === 'function') {
            console.log(3) // 打印3
            return old.apply(this, arguments);
        }
    }
}
var person = { userName: 'bear鲍的小小熊' }
addMethod(person, 'show', function (a, b) {
    console.log(this.userName + '---->' + (a + b))
})

addMethod(person, 'show', function () {
    console.log(this.userName + '---->' + 'show1')
})
addMethod(person, 'show', function (str) {
    console.log(this.userName + '---->' + str)
})


//按照顺序从下往上在old里找

person.show(1, 5) // 1,3,1,3,1,2










