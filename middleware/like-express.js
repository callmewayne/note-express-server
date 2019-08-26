const http = require('http')
const slice = Array.prototype.slice

class LikeExpress{
    constructor(){
        this.routes = {
            all:[],
            get:[],
            post:[]
        }
    }

    register(path){
        if(typeof path === 'string'){
            info.path = path
            info.stack = slice.call(arguments,1)
        }else{
            info.path = '/'
            info.stack = slice.call(arguments,0)
        }
        return info
    }


}
