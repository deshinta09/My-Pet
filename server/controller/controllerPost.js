const { Post } = require('../models/')

class ControllerPost{
    static async allPost(req,res,next){
        try {
            let {id} = req.params
            let posts = await Post.findAll({where:{CommunityId:id}})

            res.status(200).json(posts)
        } catch (error) {
            next(error)
        }
    }

    static async addPost(req,res,next){
        try {
            let {id} = req.params
            let { title,imageUrl,message } = req.body
            let post = await Post.create({ title,imageUrl,message,CommunityId:id,userId:req.user.id })

            res.status(201).json(post)
        } catch (error) {
            next(error)
        }
    }
}

module.exports=ControllerPost 