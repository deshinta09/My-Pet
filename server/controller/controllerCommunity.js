const { Community,UserCommunity } = require('../models')

class ControllerCommunity{
    static async allCommunities(req,res,next){
        try {
            let communities = await Community.findAll()
            res.status(200).json(communities)
        } catch (error) {
            next(error)
        }
    }

    static async myCommunities(req,res,next){
        try {
            let communities = await Community.findAll({
                include: {
                    model: UserCommunity, 
                    where: {
                        UserId:req.user.id
                    }
                }
            })
            res.status(200).json(communities)
        } catch (error) {
            next(error)
        }
    }

    static async addCommunity(req,res,next){
        try {
            let { name,imageUrl,description } = req.body
            if(!imageUrl){
                imageUrl = '-'
            }

            let community = await Community.create({ name,imageUrl,description,userId:req.user.id })

            await UserCommunity.create({CommunityId:community.id,UserId:req.user.id})

            res.status(201).json(community)
        } catch (error) {
            next(error)
        }
    }
}

module.exports=ControllerCommunity