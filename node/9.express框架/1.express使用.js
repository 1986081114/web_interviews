/* 
 安装 npm install -g express-generator
 创建项目 express express-demo
 进入项目
 安装依赖： npm install
 启动项目： node name
 
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
const cors = require('cors')

const app = express()
app.use(cors())
app.set('host', '172.24.246.23')

// app.all('*', function (req, res, next) {
//   console.log('all')
//   res.header('Access-Control-Allow-Origin', '172.24.246.23');
//   //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行

//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.next()

// });

app.get('/',(req,res) => {
    res.end("Hello Express");
})
app.post('/', (req, res, next) => {
  res.end("Hello Express");
})

app.post('/login', (req, res, next) => {
  res.end("Welcome Back~");
})
app.post('/trade/gateway/h5Inner/channelAllInfo', (req, res, next) => {
  console.log('req', req)
  res.setHeader('Access-Control-Allow-Origin', 'http://172.24.246.23:3000');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行

  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.end("user register success~");
})

//监听
app.listen(8000, () => {
    console.log('open11')
})