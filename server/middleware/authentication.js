const { User } = require('../models')
const { compareToken } = require("../helpers/jwt")

async function authentication(req,res,next){
    try {
        let { authorization } = req.headers
        if(!authorization){
            throw {name:'Unauthorize', message:'Invalid Token'}
        }

        let token = authorization.split(' ')[1]
        token = compareToken(token)
        
        let user = await User.findByPk(token.id)
        if(!user){
            throw {name:'Unauthorize', message:'Invalid Token'}
        }

        req.user={
            id:user.id, status:user.status, username:user.username, email:user.email
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports=authentication