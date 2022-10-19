const express = require('express')
const app = express()

const middleWare1 = (req,res,next) => {
    req.message = 'aaa'
    next()
    res.end(req.message)//aaabbbccc ,因为看似是执行next之后执行这个语句 ，但是next执行过程中，会调动下一个中间件，只有下一个中间件执行结束，next才结束
}
const middleWare2 = (req,res,next) => {
    req.message += 'bbb'
    next()
}
const middleWare3 = (req,res,next) => {
    req.message += 'ccc'
    next()
}

app.use(middleWare1,middleWare2,middleWare3)

app.listen(8000, ()=> [
    console.log('服务器启动成功')
])