const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const multer = require('koa-multer');
const Router = require('koa-router');

const app = new Koa();

const upload = multer(); //form data一就要用这个接卸

app.use(bodyParser());
app.use(upload.any());

app.use((ctx, next) => {
  console.log(ctx.request.body);
  console.log(ctx.req.body);//multer 解析的在req
  ctx.response.body = "Hello World";
});

app.listen(8000, () => {
  console.log("koa初体验服务器启动成功~");
});
