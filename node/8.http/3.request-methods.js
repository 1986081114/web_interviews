const http = require('http')
const url = require('url')

const server = http.createServer((req,res) =>{
    const {pathname} = url.parse(req.url)

    if (req.method === 'POST') {
        req.setEncoding('utf-8')
        req.on('data', data =>{
            console.log(data)
            const {username, password} = JSON.parse(data);
            console.log(username, password)
        })
    }
    res.end("Hello World");
})

server.listen(8000, '0.0.0.0', () => {
    console.log('open')
})