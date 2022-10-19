/* 
 安装 npm install -g express-generator
 创建项目 express express-demo
 进入项目
 安装依赖： npm install
 启动项目： node bin/www
 m
 默认打开是 localhost: 3000
*/
/* 

 也可以自己安装express 之后调用，自己使用

 express是一个路由和中间件的web框架， 他本身功能非常少， 本质上是一系列中间件函数的调用
   中间件的本质就是传递给express的一个回调函数，
    这个回调函数接收三个参数，：
      请求对象request
      响应对象response
      next函数 ，用于执行的下一个中间件函数
    如何应用一个中间件：
      app/router.use
      app/router.methods

   调用express发生了什么？
      exports = module.exports = createApplication; 调用了createapplication函数
        这个函数里面创建一个对象app，并且在app上个添加了一个属性 listen
        app.listen = function listen() {
          var server = http.createServer(this);
          return server.listen.apply(server, arguments);  
};
      
*/

const express = require('express')

const app = express()

app.get('/',(req,res) => {
    res.end("Hello Express");
})
app.post('/', (req, res, next) => {
  
})

app.post('/login', (req, res, next) => {
  res.end("Welcome Back~");
})

//监听
app.listen(8000, () => {
    console.log('open')
})