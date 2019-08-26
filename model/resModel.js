class BaseModel{
    constructor(data,message){
        if(typeof data === 'string'){
            this.message = data
            data=null
            message = null
        }

        if(data){
            this.data=data
        }
        if(message){
            this.message = message
        }
    }
}

class SuccessModel extends BaseModel{
    constructor(data,message){
        super(data,message)
        this.code = 200
        this.data = data
        this.message = message
    }
}


class ErrorModel extends BaseModel{
    constructor(data,message){
        super(data,message)
        this.code = 204
        this.message = message
    }
}


module.exports = {
    SuccessModel,
    ErrorModel
}
