const { UserCommunity, Community } = require('../models/')

class ControllerUserCommunity{
    static async allUserCommunity(req,res,next){
        try {
            let communities = await UserCommunity.findAll({
                include:{
                    model: Community
                },
                where:{UserId:req.user.id}
            })

            res.status(200).json(communities)
        } catch (error) {
            next(error)
        }
    }

    static async addCommunity(req,res,next){
        try {
            let {communityId} = req.params
            let cekCommunity = await UserCommunity.findOne({where:{UserId:req.user.id, CommunityId:communityId}})
            
            if(cekCommunity){
                throw {name:'forbidden', message:'Forbidden'}
            }

            let communities = await UserCommunity.create({UserId:req.user.id,CommunityId:communityId})

            res.status(201).json(communities)
        } catch (error) {
            next(error)
        }
    }

    static async deleteCommunity(req,res,next){
        try {
            let {communityId} = req.params
            await UserCommunity.destroy({where:{CommunityId:communityId}})

            res.status(200).json({message:'success delete community'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports=ControllerUserCommunity