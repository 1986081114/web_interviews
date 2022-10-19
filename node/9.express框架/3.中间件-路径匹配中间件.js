const express = require ('express')
const app = express()

//第一个使用的永远是第一个匹配的中间件，所以即使有/home路径匹配，依旧先会调用第一个
//中间件调用需要按照顺序，如果第一个有next，才会继续调用下一个，否则没有next，就不会继续调用下一个
app.use((req,res,next) => {
   console.log('diyige')
    next()

})
//匹配对应的路径
app.use('/home',(req,res,next) => {
    res.end('hello middleware/home')

})


app.listen(8000, () => {
    console.log('普通中间件服务启动成功')
})