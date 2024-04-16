// import {name, age, sayHello} from './foo.js';

// export {
//   name,
//   age,
//   sayHello
// }

// import  export 结合使用 复合写法如下
//为了将所有暴露的接口放置在同一个文件内 
// 复合写法实际上并没有导入当前模块，相当于对外转发，所以当前模块不能直接使用name等
export { name, age, sayHello } from './foo.mjs';