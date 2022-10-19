const express = require('express')
const app = express()
//创建路由规则
app.get('/server', (request, response) => {
  console.log(request.body)
  //设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Header', '*')
  //设置响应体
  response.send('hello ajax get')
})

app.post('/server', (request, response) => {
  console.log(request)
  //设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Header', '*')
  //设置响应体
  response.send('hello ajax post')
})
app.put('/server', (request, response) => {
  //设置响应头
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Header', '*')
  //设置响应体
  response.send('hello ajax post')
})


//监听端口启动 localhost:8000
app.listen(8000, () => {
  console.log("服务器已经启动")
})