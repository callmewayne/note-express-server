const { SuccessModel,ErrorModel}  = require('../model/resModel')

module.exports = (req,res,next)=>{
    if(req.headers.token){
        next()
        return
    }
    res.json(
       new ErrorModel('未登录')
    )
}