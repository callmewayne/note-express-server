var createError = require('http-errors'); 
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');//解析cookie模块，可以在路由中访问cookie
var logger = require('morgan');//日志模块
const session = require('express-session')
const RedisStore = require('connect-redis')(session)//redis客户端
const cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user');
var app = express();//初始化app，本次http请求的实例

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client:redisClient
})

app.use(cors())

app.use(session({
  secret: 'WJiol#23123_',
  cookie: {
    // path: '/',   // 默认配置
    // httpOnly: true,  // 默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore//把session存到redis中
}))
// view engine setup//视图引擎设置
 app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const ENV = process.env.NODE_ENV
if(ENV!=='production'){
  app.use(logger('dev',{
    stream:process.stdout
  }));
}else{
  app.use(logger('combined',{
    stream:process.stdout
  }));
}

app.use(express.json());//解析json
app.use(express.urlencoded({ extended: false }));//兼容其他格式
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));//存储些静态文件


app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
