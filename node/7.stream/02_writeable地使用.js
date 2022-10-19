const fs = require('fs');


// 传统的写入方式
/* fs.writeFile('./bar.txt', 'hello stream',{flag: 'a'}, (err) =>{
    console.log(err)
}) */

 // Stream的写入方式
  const writer = fs.createWriteStream('./bar.txt', {
    flags: "r+",
    start: 4
  });
  
  writer.on('open', () => {
    console.log('open')
  })
  writer.write("你好啊", (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("写入成功");
  });


  // end 相当于 / 
  //writer.close();
  // write("Hello World");
  writer.end('end')