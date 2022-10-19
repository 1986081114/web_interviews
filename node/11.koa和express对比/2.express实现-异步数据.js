const express = require('express');
const axios = require('axios');

const app = express();

const middleware1 = async (req, res, next) => {
  req.message = "aaa";
  await next();
  res.end(req.message); //aaabbb 
}
/* 
  异步请求，因为next返回的就是一个普通函数，并不会等待请求结果，计算是使用了async也没有起作用，算是一个缺点

*/

const middleware2 = async (req, res, next) => {
  req.message += "bbb";
  await next();
}

const middleware3 = async (req, res, next) => {
  const result = await axios.get('http://123.207.32.32:9001/lyric?id=167876');
  req.message += result.data.lrc.lyric;
}

app.use(middleware1, middleware2, middleware3);

app.listen(8000, () => {
  console.log("服务器启动成功~");
})