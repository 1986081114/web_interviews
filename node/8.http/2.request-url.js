const http = require('http')
let url = require('url')
const qs = require('querystring')
const server = http.createServer((req,res) => {
    //req封装了客户端传过来的所有信息
    /* console.log(req.url)
    console.log(req.method)
    console.log(req.headers) */
    //http://localhost:8000/login?username=why&password=123 这个去请求
    const { pathname, query } = url.parse(req.url);
    console.log(pathname)
    console.log(query)
    const {username, password} = qs.parse(query)
  console.log(username, password)  
    res.end('hello server')
})

server.listen(8000, '0.0.0.0', () => {
    console.log('open')
})