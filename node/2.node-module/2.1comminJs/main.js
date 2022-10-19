/* 
  node中commonjs的本质就是commonjs的引用赋值
*/

const bar = require('./bar')
//等价于const {name, message, sayHello} = require('./bar')
//bar就是浅层拷贝 拷贝对象 bar exports module.exports指向同一个对象

console.log(bar.name)
console.log(bar.message)
bar.sayHello('zj')
 

setTimeout(() => {
    console.log(bar.name)//test
}, 2000);


