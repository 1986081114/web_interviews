// 演练: export和import结合使用
import { name, age, num,sayHello } from './modules/foo.js';

 console.log(name);
console.log(age);//18
console.log(num);//18
 console.log(sayHello);

 setTimeout(() => {
   console.log('main' + age) // 20
 }, 2000);

 /* setTimeout(() => {
   //会报错 Assignment to constant variable.
   num = 65
   
 }, 1000); */

 setTimeout(() => {
   console.log('main' + name.name) //test
  name.name = "bbbbb";
}, 2000);


/* 

在foo和main之间js引擎会创建一个模块环境记录 用来管理记录对应的变量，并且是实时绑定的


如在foo.js中的导出num，在模块环境变量中 就会创建一个 const num = num ,
 在main引入的num是左侧的那个num变量， 是静态的，所以在main中修改 num会报错
 但是由于是实时绑定所以就算foo.js中改变了值，会重新创建 const num = num

 但是让如果是引用类型 ，foo中的name会开辟一个新的内存地址保存数据， 在模块环境变量中 const name = name 右侧的name不是真的值而是地址 x1021
在main中得到的name被赋予的值也就是地址，所以可以改变

*/

/* 
 node 对esmodule的支持
    文件类型变成 .mjs
    package.json 设置type = module
*/

