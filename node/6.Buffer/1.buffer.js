/* 
  js语言是没有读取或者操作二进制数据流的机制，node中需要处理网络协议上传文件，需要处理大量的二进制文件，所以引入了buffer
   buffer类被引入作为node api的一部分， 可以在tcp流， 文件操作系统等场景处理二进制流。

  在node中 stream流就是一系列从A到b点移动的数据，当有一个很大的数据需要传输时， 不需要等待所有的数据都传输
  完成才开始下一步操作，是连续字节的一种表现形式和抽象概念， 可读可写的

  通常，数据的移动是为了处理或者读取，每一个过程都会有一个最大最小的数据量， 如果到达的速度比消耗的速度快， 那么少数
  早到达的数据会处于等待区被处理， 同理如果数据到达的速度比数据处理的时间慢， 这一时刻仅仅到达了一部分，那么这一小部分
  数据等待剩余的数据填满， 然后再统一送过去处理。
  这个等待区域就是buffer
*/

let message1 = 'buffer'
let message2 = '测试'

/* let buffer = new Buffer(message1)  //过气的方式
console.log(buffer) */

//常用的buffer存储方式
let buffer1 = Buffer.from(message1)
console.log(buffer1)


//默认buffer， 编码使用utf-8， 解码默认也是utf-8
let buffer2 = Buffer.from(message2)
console.log(buffer2)
console.log(buffer2.toString()) //测试


//可以设置编码，解码的字节方式
let buffer3 = Buffer.from(message2, 'utf16le')
console.log(buffer3)
console.log(buffer3.toString())//乱码
console.log(buffer3.toString('utf16le')) //测试

// 值得注意的是， 如果给元素赋值不是 0-255的整数时， 小于0，逐次加255， 大于255 减去 255， 小数，舍弃小数部分

let buf = new Buffer(100);
buf[20] = -100;
console.log(buf[20]) // 156

buf[21] = 300;
console.log(buf[21]) // 44

buf[22] = 3.14
console.log(buf[22]) // 3


//alloc创建buffer ，并且保证先创建的buffer永远不会包含旧数据

const buffer4 = Buffer.alloc(8) //创了一个新的长度为8的空的buffer
console.log(buffer4)


/* 
buffer可以进行一些io操作，读取文件或者网络io
zlib.js 是node的核心库之一，也是利用buffer功能操作二进制数据流。
*/

/* 
 buffer和cache：
    都是为了处理速度不匹配的一种折中方案。

    buffer是用于处理二进制流数据的，它的引入是为了减小短期内突发I/O的影响，起到流量整形的作用。将数据缓冲起来， 是临时性的， 对于流氏数据，
    会采用缓冲区将数据临时存起来， 等缓冲到一定大小在存入硬盘。视频播放器就是一个经典的例子， 有时候看到一个缓冲的图标就意味着这一组缓冲区并没有
    被填满

   cache可以看作是一个中间层，它可以是永久性的将数据保存起来， 使得访问速度更快，利用数据的局部性（locality）特征，
   通过使用存储系统分级（memory hierarchy）的策略来减小这种差异带来的影响。

*/

