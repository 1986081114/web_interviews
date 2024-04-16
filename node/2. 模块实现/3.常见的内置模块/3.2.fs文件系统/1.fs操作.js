/* 
fs三种操作方式：
    1.同步操作，代码会被阻塞，不会继续执行
    2.异步回调函数操作文件： 代码不会被阻塞， 需要传入回调函数，当获取结果时， 回调函数被执行
    3.异步promise操作文件， 代码不会被阻塞，通过fs.promise调用方法操作， 会返回一个promise，然后通过then处理

*/
const fs = require('fs')


// 案例: 读取文件的信息
const filepath = "./abc.txt";

// 1.方式一: 同步操作

const info = fs.statSync(filepath)
console.log("后续需要执行的代码1");
console.log(info);

// 2.方式二: 异步操作
fs.stat(filepath, (err,info) => {
    if(err) {
        console.log(err)
        return 
    }
    console.log(info)
    console.log(info.isFile())
    console.log(info.isDirectory())
})
console.log('后续执行的代码2')// 会先执行


// 3.方式三: Promise
fs.promises.stat(filepath).then(info =>{
    console.log(info)
}).catch(err => {
    console.log(err)
})
console.log("后续需要执行的代码3");

