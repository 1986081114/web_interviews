// 常见的导入方式也是有三种
// 方式一: import {} from '路径';
// import { name, age, sayHello } from './modules/foo.js';

// 方式二: 导出变量之后可以起别名
// import { name as wName, age as wAge, sayHello as wSayHello } from './modules/foo.js';
// import { fName as wName, fAge as wAge, fSayHello as wSayHello } from './modules/foo.js';

// 方式三: * as foo
// import * as foo from './modules/foo.js';

// console.log(foo.name);
// console.log(foo.age);
// foo.sayHello("王小波");


// 演练: export和import结合使用
import { name, age, sayHello } from './modules/bar.mjs';

console.log(name);
console.log(age);
console.log(sayHello);



/* 
  按需加载， 条件加载， 动态模块路径 如下做法
*/

// 演练: default export如何导入
// import format from './modules/foo.js';
// format();


//在编译的时候就要知道关系，但是flag = true是在运行时就确定 所以一下是错误的
/* let flag = true
if(flag) {
  import format from './modules/foo.js';
format();

} */
// 演练: import()函数 解决上述问题
//  let flag = true;
// if (flag) {
  // require的本质是一个函数
  // require('')
// }

  // 执行函数 
  // 如果是webpack的环境下: 模块化打包工具: es CommonJS require()
  // 纯ES Module环境下面: import()
  // 脚手架 -> webpack: import()
  // 这种写法 不是静态的,动态的且返回了一个 promise ，相当于 同步加载的 require方法了
//   import('./modules/foo.js').then(res => {
//     console.log("在then中的打印");
//     console.log(res.name);
//     console.log(res.age);
//   }).catch(err => {

//   })
// }

  // 或者 用 await
//     async function renderWidget() {
//       const container = document.getElementById('widget');
//       if (container !== null) {
//         // 等同于
//         // import("./widget").then(widget => {
//         //   widget.render(container);
//         // });
//         const widget = await import('./widget.js');
//         widget.render(container);
//       }
//     }

// renderWidget();
    
// 加载多个模块
// Promise.all([
//   import('./module1.js'),
//   import('./module2.js'),
//   import('./module3.js'),
// ])
// .then(([module1, module2, module3]) => {
//    ···
// });

// async function main() {
//   const [module1, module2, module3] =
//     await Promise.all([
//       import('./module1.js'),
//       import('./module2.js'),
//       import('./module3.js'),
//     ]);
// }
// main();
 