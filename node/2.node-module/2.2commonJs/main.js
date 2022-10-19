/* 
  require（x）:
      1.如果是核心模块 如 path http，直接请求并停止查找
      2.如果X是以./ / ../ 会在文件对应目录下查找
      3.如果x不是路径也不是核心模块， 就去node module下查找， 从内往外
*/
//commonjs加载是同步的 先打印bar中的内容最后打印 main内容
let bar = require('./bar')
require('./foo')

console.log('main执行')

/* 
  模块加载过程：
     1.模块只有在第一次被引用时， 模块中的js代码会被运行
     2.模块被多次引用，会缓存 最终只运行一次 
       每一个模块中都有一个属性 loaded，默认是false表示没有被加载过， true表示已经被加载过。
    3.如果是循环引用：
        形成一个闭环。相当于一个图，会从main开始深度优先遍历

缺点：
      commonjs加载是同步的，必须等对应模块加载完，才继续执行， 在服务器没什么问题，但不适合浏览器，会影响浏览器的运行
      在webpack中使用commonjs是因为webpack会把代码转成浏览器可执行的代码，相当于不是模块化了

*/