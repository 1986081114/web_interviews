
/* 
  流：当从一个文件读取数据， 文件的二进制字节数据会源源不断地被读取到程序中， 这一连串的字节就是程序中的流，
      流就是连续的字节的一种表现形式和抽象概念。 可读可写的

    可以控制读入文件的开始，结束位置，控制播放片段

*/

const fs = require('fs')

//传统的方式 只能读取全部，无法读取片段
 fs.readFile('./foo.txt', (err, data) =>{
    console.log(data)
}) 

// 流的方式读取
const reader = fs.createReadStream('./foo.txt', {
    start:3,
    end: 6,
    highWaterMark:1 //一个流最多包含的字节数
})

//s数据打开
reader.on('open', () => {
    console.log('open')
})

//数据读取过程
reader.on('data', data => {
    console.log(data)

    reader.pause() //暂停
    setTimeout(() => {
        reader.resume()//恢复
    }, 1);
})

//关闭
reader.on('close', () => {
    console.log('close')
})
