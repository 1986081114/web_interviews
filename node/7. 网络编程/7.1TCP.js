/* 
     node提供了 net dgram http https四个模块，分别用于处理TCP, UDP, HTTP, HTTPS 适用于服务器端和客户端。

*/

let net = require('net');

let serve = net.createServer(function (socket) {
    // 新的链接
    socket.on('data', function(data) {
        socket.write("你好, net");
    })
    socket.on('end', function() {
        console.log('断开连接');
    })
    socket.write("欢迎再次光临net服务");
});
serve.listen('8124', function() {
    console.log('serve bound');
});

    /* 

    服务器事件： 
       listening: 在调用listen绑定端口连接后触发
       connection： 每个客户端套接字和服务端链接时触发，createServe的最后一个参数传递
       close 服务器关闭时触发，嗲用close之后，服务器将停止接收套接字链接， 但保持当前存在的链接，等待所有链接都关闭后触发此事件。
       error： 当服务器发生异常时触发此事件

    连接事件： 
        data: 当一端调用write发送数据的、另一端会触发 data事件，时间传递的数据就是write发送的数据
        end：当链接中的任意 一端发送 FIN 数据时，将会触发此事件。
        connect： 该事件用于客户端， 套接字与服务器连接成功会被触发。
        drain： 当任意一端调用write发送数据时， 当前这段会触发该事件
        error： 当异常发生时，触发该事件
        close 当套接字完全关闭，触发
        timeout： 当一段时间另一端不在活跃，触发。


    */

