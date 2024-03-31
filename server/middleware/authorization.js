const { UserCommunity } = require('../models')

async function authorization(req,res,next){
    try {
        //dia premium dan memiliki userCommunity yg sama dgn yg di param
        let {id} = req.params
        let uc = await UserCommunity.findOne({where:{CommunityId:id,UserId:req.user.id}})
        console.log(uc,'<-data uc');
        if(req.user.status==='Premium'||uc){
            next()
        } else {
            throw {name:'forbidden', message:'User must be Premium'}
        }
    } catch (error) {
        next(error)
    }
}

async function authorizationAddPost(req,res,next){
    try {
        let {id} = req.params
        let uc = await UserCommunity.findOne({where:{CommunityId:id,UserId:req.user.id}})
        if(uc){
            next()
        } else {
            throw {name:'forbidden', message:'User must be Join'}
        }
    } catch (error) {
        next(error)
    }
}

async function authorizationPremium(req,res,next){
    try {
        if(req.user.status==='regular') {
            throw {name:'forbidden', message:'User must be Premium'}
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports={authorization,authorizationAddPost,authorizationPremium}