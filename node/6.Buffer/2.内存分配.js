/* 
    Buffer内存分配不是在V8的堆内存中， 而是在node的C++层面实现申请的;因为处理大量的字节数据不能采取需要一点内存就
   向操作系统申请一点内存的方法。大量的内存申请会造成资源浪费。因此应用的是在C++层面申请，在js中分配的策略。 

   为了高效的使用申请来的内存,node使用的是slab分配给制，，一种动态的内存管理机制。
    buffer采用slab机制进行预先申请，事后分配， 是一种动态的管理机制。
    slab有三种状态：
        full 完全分配状态
        partial： 部分分配状态
        empty： 没有被分配状态
   使用buffer.alloc(size), 传入一个指定的size就会申请， 一块固定的内存大小， buffer在创建时大小被确定是无法调整的。
   如果没有传size，默认是8kb， size大于8kb被称为大对象，否则是小对象。
   这个8kb也就是每个slab的值，在js层面以他为单位进行内存的分配。

   buffer分配过程中，主要是用一个局部变量pool作为中间处理对象，处于分配状态的slab单元都指向他,

   在构建一个小的buffer对象时， 先去检查pool对象，没有就先创建，同时当前buffer对象的parent属性指向该slab，
   并记录是从这个slab的那个位置开始使用的，slab本身也回记录使用了多少字节，slab状态现在是partial。
   当再次构建新的buffer对象时， 会判断slb剩余空间是否足够，如果做足够继续使用，如果不够，创建新的slab，原slab
   剩余空间会造成浪费，一个slab可能分配给多个buffer，只有这些小buffer都释放，slab的8kb空间才会被回收。

   如果创建超过8kb的buffer对象，会只娥姐分配一个SlowBuffer对象当做alsb单元，这个slab单元会被这个大buffer独占。

   不论是小 Buffer 对象还是大 Buffer 对象，内存分配是在 C++ 层面完成，内存管理在 JavaScript 层面，
   最终还是可以被 V8 的垃圾回收标记所回收。
*/
/* 
类型转换： new Buffer（str, [endcoding]);

可以先通过isEncoding() l来判断编码是否支持转换； Buffer.isEncoding(encoding)
对于不支持的编码类型可以借助node的生态圈完成转换
*/

/* 

 buffer的拼接： buffer在使用场景中，通常是以一段一段方式传输，
    let fs = require('fs');
    let rs = fs.createReadStream('test.md');
    let data = '';
    rs.on("data", function(chunk) {
        data += chunk;
    });
    rs.on('end', function() {
        console.log(data)
    })

 在拼接的过程中容易造成乱码： data += chunk;
      data += chunk;的过程隐藏了toString()的动作。
      因为默认的tostring方法以UTF-8为编码， 中文的UTF-8占用3个字符，比如一行字转成buffer后是10个字符，每次输出三个字符
      最后剩余的2字符就会以乱码的形式展示了.

    解决乱码 serEncoding(); 但是这个方法处理的编码类型有限。

    正确的拼接buffer处理乱码：
    let chunks = [];
    let size = 0;
     rs.on("data", function(chunk) {
        chunks.push(chunk);
        size += chunk.length;
    });
    rs.on('end', function() {
        let buf = Buffer.concat(chunks, size);
        let str = iconv.decode(buf, 'utf8);
        console.log(str);
    })
    正确的拼接方法是用一个数组来存储所有收到的BUffer片段，并记录下来总长度，然后调用Buffer.concat方法生成一个
    合并的Buffer对象。


*/
