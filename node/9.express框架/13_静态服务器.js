const express = require('express');

const app = express();


//这个build是打包后的静态文件
app.use(express.static('./build'));

app.listen(8000, () => {
  console.log("路由服务器启动成功~");
});
