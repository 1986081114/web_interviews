const fs = require('fs');

// 传统的写法

/* fs.readFile('./bar.txt',(err,data) => {
    fs.writeFile('./btt.txt',data, err => {
        console.log(err)
    })
}) */

// Stream的写法
const reader = fs.createReadStream('./bar.txt')
const write = fs.createWriteStream('./btt.txt')
reader.pipe(write)
write.close


