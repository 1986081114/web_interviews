/* 
  node中commonjs的本质就是commonjs的引用赋值
*/
// 无论使用 exports 暴露成员，或是 module.exports 暴露成员，最终暴露的结果，都是以 module.exports 所指向的对象为准。

const bar = require('./bar')
//等价于const {name, message, sayHello} = require('./bar')
//bar就是浅层拷贝 拷贝对象 bar exports module.exports指向同一个对象

console.log("name",bar.name)
console.log("message", bar.message)
console.log("sigle", bar.sigle)
bar.sayHello('change-zj')
// bar.name = 'changename';
// console.log("changename",bar.name)
 

setTimeout(() => {
  console.log("settimeNmae", bar.name) // 111
  console.log("sigle", bar.sigle) // 1
  // 对象地址相同所以会动态改变， 而 基础变量不会
}, 3000);


