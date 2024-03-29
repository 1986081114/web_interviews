const express = require('express');

const app = express();

//路径http://localhost:8000/products/555/sss
app.get('/products/:id/:name', (req, res, next) => {
  console.log(req.params);
  // req.params => 在数据库中查询真实的商品数据
  res.end("商品的详情数据~");
})

//路径http://localhost:8000/login/?username = 56& password=86
app.get('/login', (req, res, next) => {
  console.log(req.query);
  res.end("用户登录成功~");
})

app.listen(8000, () => {
  console.log("普通中间件服务器启动成功~");
});

