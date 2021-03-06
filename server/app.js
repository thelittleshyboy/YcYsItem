var express = require('express')
const mongoose = require('mongoose')
var session  = require('express-session')
var FileStore = require('session-file-store')(session);
var app = new express()
const  bodyParser = require('body-parser')
var router = require('./router/users');
var upload = require('./router/upload')
const url = "mongodb://localhost:27017/ycyweb"

mongoose.connect(url,{useNewUrlParser:true},(err)=>{
    if(err){
      console.log(err)
    } else {
      console.log('db connect success');
    }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(session({
    name : 'userName',
    secret :  'yyc', // 对session id 相关的cookie 进行签名
    store: new FileStore(),// 本地存储session（文本文件，也可以选择其他store，比如redis的）
    resave : false,// 强制session保存到session store中
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 10, // 设置 session 的有效时间，单位 毫秒
    },
}));

app.use('/user',router)  //将路由注册到/user的路径下
app.use('/upload', upload)

var port = process.env.PORT || 3300;
app.listen(port);
