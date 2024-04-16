//就是一个模块。模块内部定义的数据
let name = 'zj';
const message = 'commonjs node'
// function sayHello(name1) {
//     name = name1; // main里面name不会改变
//     exports.name = name1; // main里面name会改变
//     console.log('hello - ' + name1)
// }

// exports.name = name
// exports.message = message
// exports.sayHello = sayHello 
// setTimeout(() => {
//     // console.log('bar-changename', module.exports.name)
//     // console.log('bar-changename-exports', exports.name)
//   exports.name = 'change-bar'
// }, 2000);
// setTimeout(() => {
//     module.exports.name = 'test'
//     console.log(exports.name) //test
// }, 1000);
 
/* 
  为了模块导出， node中实现了一个类，module，每一个模块都是module的一个实例， 在node中真正导出的不是exports而是module.exports
   在源码里有一句代码 let exports = {}, exports = module.exports;，exports默认是{}，同时这句话执行在最开头，
   exports 它里面存储了和当前模块有关的信息
   使用 require() 方法导入模块时，导入的结果，永远以 module.exports 指向的对象为准
*/
/* ---------------------- */

/* 
本质上是module.exports在导出， 在给mmodul.exports一个新的对象相当于给了一个新的内存地址 bar也指向这个内存地址， module.exports , exports bar指向
 同一个对象
所以改变exports并不会改变name
 */
//  module.exports = {
//         name:'zj1',
//         message: 'commonjs node1',
//         sayHello: function(name) {
//             console.log('hellp' + name)
//         }
//     }
// setTimeout(() => {
//     module.exports.name = 'test'
//     console.log(exports.name) // undefined
//     console.log(module.exports.name) //test
// }, 1000);


// setTimeout(() => {
//     exports.name = 'test'
//     console.log(exports.name) // test
//     console.log(module.exports.name) //zj1
// }, 1000);

/* -------------------- */

//  let info = 'zj3'
// module.exports = {
//     name: info,
//     message: 'commonjs node1',
//     sayHello: function(name) {
//         console.log('hellp' + name)
//     }
// }
// setTimeout(() => {
//     info = 'zj5555'
//     console.log(exports.name) //zj  
//     console.log(module.exports.name) //zj333  bar也是zj333
// }, 1000); 
 //基本数据类型相当于赋值，开辟了新的内存地址，所以info改了并不会影响module.export里面的值
 //但如果是引用类型，相当于是导出info的内存地址， info改变 module.export也会改变

 const info = {
    name: 'coderwhy'
}
let sigle = 1
  
setTimeout(() => {
    info.name = "11111111";
    sigle = 2
    console.log(module.exports.name)//1111111
    console.log(exports)// 空对象
  }, 1000);
module.exports = {
   sigle,
    name: info,
    message: 'commonjs node1',
    sayHello: function(name) {
        console.log('hellp' + name)
    }
}
 