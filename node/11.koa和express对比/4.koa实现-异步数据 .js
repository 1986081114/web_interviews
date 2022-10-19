const Koa = require('koa');
const axios = require('axios');

const app = new Koa();

const middleware1 = async (ctx, next) => {
  ctx.message = "aaa";
  await next();
  next();
  ctx.body = ctx.message;
}


/* 
  koa可以是因为， next 也就是dispatch返回了一个promise，这样你可以在next之前使用await，等待他的返回结果，等有了结果再进行下一步
*/
const middleware2 = async (ctx, next) => {
  ctx.message += "bbb";
  await next();
}

const middleware3 = async (ctx, next) => {
  const result = await axios.get('http://123.207.32.32:9001/lyric?id=167876');
  ctx.message += result.data.lrc.lyric;
}

app.use(middleware1);
app.use(middleware2);
app.use(middleware3);

app.listen(8000, () => {
  console.log("服务器启动成功~");
})