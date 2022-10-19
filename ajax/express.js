const express = require('express')
const app = express()
//创建路由规则
app.get('/', (request,response) => {
    response.send('hello express')
})

//监听端口启动 localhost:8000
app.listen(8000, () => {
    console.log("服务器已经启动")
})