const http = require('http');

// 创建一个web服务器
const server = http.createServer((req, res) => {



  //状态码
  //1.直接给属性赋值
  //res.statusCode = 200
  //和head一起设置
  //res.writeHead(503)

  // 设置响应的header
  // 设置方式一:
   //res.setHeader("Content-Type", "text/plain;charset=utf8");
   res.writeHead(200, {
    "Content-Type": "text/html;charset=utf8"
  }); 

  // 响应结果
  res.end("<h2>Hello Server</h2>");

});

// 启动服务器,并且制定端口号和主机
server.listen(8888, '0.0.0.0', () => {
  console.log("服务器启动成功~");
});
