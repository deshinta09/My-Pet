function errors(error,req,res,next){
    let status = 500
    let message = 'Internal server error'

    if(error.name==='Unauthorize'){
        status = 401
        message = error.message
    } else if(error.name==='SequelizeUniqueConstraintError'||error.name==='SequelizeValidationError'){
        status = 400
        message = error.errors[0].message
    } else if (error.name==='JsonWebTokenError'){
        status = 401
        message = 'Invalid Token'
    } else if(error.name==='forbidden'){
        status = 403
        message = error.message
    }
    
    console.log(error,'<-err di function error');

    res.status(status).json({message})
}
module.exports=errors