const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode'); //無秘解析

// 密匙
const SECRET_KEY = 'WJiol_8776#'//随机写

// md5 加密
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

//加密token
function signToken(data){
    var token = jwt.sign(data,'shh',{ expiresIn: 60 * 60 * 60})
    return token
}

//解密token
function verifyToken(token){

    try {
    var decoded = jwt_decode(token);
    return decoded
        
    } catch (error) {
        console.log(error)
    }

}
module.exports = {
    genPassword,
    signToken,
    verifyToken
}