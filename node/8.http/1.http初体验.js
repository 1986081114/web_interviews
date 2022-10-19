const http = require('http')
const server = http.createServer((req,res) => {
    res.end('hello server')

})

server.listen(8081, 'localhost', () => {
    console.log('server open')
})

//每次修改server 都要重新启动 不方便
//所以安装工具nodemon
//启动使用 nodemon 


// 第二种创建方式dconst server = new Http.Server(() =>{})