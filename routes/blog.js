var express = require('express');
var router = express.Router();
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
//统一的登录验证函数
// const loginCheck = (req)=>{
//     if(!req.session.username){
//         return Promise.resolve(
//              new ErrorModel('尚未登录')
//         )
//     }
// }

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

/* GET home page. */
router.get('/list', function (req, res, next) {
    let author = req.query.author || ''
    let keyword = req.query.keyword || ''

    if (req.query.isadmin) {

        if (req.session.username == null) {
            //未登录
            res.json(
                new ErrorModel('未登录')
            )
            return
        }
        author = req.session.username
    }
    let result = getList(author, keyword)
    return result.then(listData => {
        console.log(listData)
        res.json(
            new SuccessModel(listData)
        )
    })
});

router.get('/detail', function (req, res, next) {
    let result = getDetail(req.query.id)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});
router.post('/new', loginCheck, function (req, res, next) {

    req.body["author"] = req.session.username || ''
    let result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

router.post('/update', loginCheck, function (req, res, next) {
    req.body.id = req.query.id
    let result = updateBlog(req.body.id, req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel(val)
            )
        } else {
            res.json(
                new ErrorModel('更新博客失败')
            )
        }
    })


});

router.post('/delete', loginCheck, function (req, res, next) {

    let author = req.session.username 
    let result = delBlog(req.query.id,author)
    return result.then(val=>{
        if(val){
            res.json(
                new SuccessModel(val)
            )
        }else{
            res.json(
                new ErrorModel('删除博客失败')
            )
        }
    })
});


module.exports = router;