var express = require('express');
var router = express.Router();
const { login }  = require('../controller/user')
const {set } = require('../db/redis')
const { SuccessModel,ErrorModel}  = require('../model/resModel')
/* GET home page. */

// router.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
//   });
router.post('/login', function(req, res, next) {
  const { username,password} = req.body
   let result = login(username,password)
   return result.then(data=>{
       if(data.username){

           req.session.username = data.username
           req.session.realname = data.realname
           //httpOnly只允许后端修改cookie,expires设置过期时间
        //   res.setHeader('Set-Cookie',`username=${data.username}; path=/ ;httpOnly; expires=${getCookieExpires()}`)
           res.json(
            new SuccessModel(data)
           )  
           return
        }else{
            res.json(
                new ErrorModel('登陆失败')
               )  
            // res.json(
            //     new ErrorModel('登陆失败')
            //    )  
        }
   })
});


   router.get('/session-test',(req,res,next)=>{
      const session = req.session
      if(session.viewNum==null){
        session.viewNum=0
      }
      session.viewNum++
      res.json({
        viewNum: session.viewNum
    })
   })
module.exports = router;