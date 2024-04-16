const express = require ('express')
const app = express()

//没写路径表示所有路径都可以
app.use((req,res,next) => {
    console.log('注册第一个中间件')
  
    next(111) //z这个是为了执行下一个能匹配到的中间件 next 如果带参数 就会终止
})
app.use((req,res,next) => {
    console.log('注册第二个中间件')
    res.end('hello express2')
    //end一般放在最后调用的那个中间件
    //end是服务器响应数据给客户端了
})

app.listen(8000, () => {
    console.log('普通中间件服务启动成功')
})