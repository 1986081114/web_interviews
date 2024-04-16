const express = require('express');
const app = express();

const hbs = require('hbs');

// 指定模板文件的后缀名为html
app.set('view engine', 'html');
// 运行hbs模块
app.engine('html', hbs.__express);



// 加载数据模块
let blogEngine = require('./blog');

app.get('/', function (req, res) {
    // 默认放在子目录views之中
    res.render('index',{title:"最近文章", entries:blogEngine.getBlogEntries()});
});

app.get('/about', (req, res) => {
    res.render('about', {title:"自我介绍"});
});

app.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});
 });
 

app.listen(3000);