/* 
  js语言是没有读取或者操作二进制数据流的机制， buffer类被引入作为node api的一部分， 可以在tcp流， 文件操作系统
  等场景处理二进制流。

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


//alloc创建buffer ，并且保证先创建的buffer永远不会包含旧数据

const buffer4 = Buffer.alloc(8) //创了一个新的长度为8的空的buffer
console.log(buffer4)

/* 
buffer内存机制：
  buffer需要处理大量的二进制数据，加入用一点就去系统请求，会很频繁，有性能问题， 所以buffer所占用的内存
  不在由v8分配， 而是在node的c++层面完成申请， 在js中进行内存分配。 称之为 堆外内存。

  buffer采用slab机制进行预先申请，事后分配， 是一种动态的管理机制。
    slab有三种状态：
        full 完全分配状态
        partial： 部分分配状态
        empty： 没有被分配状态
   使用buffer.alloc(size), 传入一个指定的size就会申请， 一块固定的内存大小， buffer在创建时大小被确定是无法调整的。
   如果没有传size，默认是8kb， size大于8kb被称为大对象，否则是小对象。



   在初次加载时就会初始化 1 个 8KB 的内存空间，buffer.js 源码有体现
根据申请的内存大小分为 小 Buffer 对象 和 大 Buffer 对象
小 Buffer 情况，会继续判断这个 slab 空间是否足够
如果空间足够就去使用剩余空间同时更新 slab 分配状态，偏移量会增加
如果空间不足，slab 空间不足，就会去创建一个新的 slab 空间用来分配
大 Buffer 情况，则会直接走 createUnsafeBuffer(size) 函数
不论是小 Buffer 对象还是大 Buffer 对象，内存分配是在 C++ 层面完成，内存管理在 JavaScript 层面，最终还是可以被 V8 的垃圾回收标记所回收。

*/

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

