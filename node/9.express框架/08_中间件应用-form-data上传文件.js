const path = require('path');

const express = require('express');
const multer = require('multer');

const app = express();



/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
}) */
const storage = multer.diskStorage({
    destination: (req,res,cb) => {
        cb(null, './uploads/');
    },
    filename:(req, res, cb) =>{
    cb(null, Date.now() + path.extname(res.originalname))
    }
})

const upload = multer({
   //dest: './uploads/'  //这种方法是系统做，无法定义文件类型，和名称
 storage //自定义中间件， 可以定义属性 ,且问价夹必须存在，不会自动创建
});

app.post('/login', upload.any(), (req, res, next) => {
  console.log(req.body);
  res.end("用户登录成功~")
});

//这里的file也要和上传的key相同 upload.single上传当个文件 array上传多个文件
app.post('/upload', upload.array('file'), (req, res, next) => {
  console.log(req.files);
  res.end("文件上传成功~");
});

app.listen(8000, () => {
  console.log("form-data解析服务器启动成功~")
});
