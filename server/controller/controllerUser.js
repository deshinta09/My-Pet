const { comparePassword } = require("../helpers/bcrypt")
const { createToken } = require("../helpers/jwt")
const { User } = require('../models/')
const {OAuth2Client} = require('google-auth-library')
const midtransClient = require('midtrans-client')

class ControllerUser{
    static async register(req,res,next){
        try {
            let { username, imageUrl, email, password } = req.body
            if(!imageUrl){
                imageUrl='-'
            }
            
            let user = await User.create({username, imageUrl, email,password, status:'regular'})

            res.status(201).json({
                id:user.id, username:user.username, email:user.email, imageUrl:user.imageUrl, status:user.status
            })
        } catch (error) {
            next(error)
        }
    }

    static async loginGoogle(req,res,next){
        const token = req.headers['google-token']
        const client = new OAuth2Client()
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.ID_google
            })

            const payload = ticket.getPayload()
            const email = payload.email
            let data = await User.findOne({where:{email}})

            if(!data){
                data = await User.create({username:payload.name, email, password: Math.random(),imageUrl:'-',status:'regular'},{hooks:false})
            }

            let access_token = createToken({id:data.id})
            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }

    static async login(req,res,next){
        try {
            let {email,password} = req.body
            let findUser = await User.findOne({where:{email}})
            if(!findUser){
                throw {name:'Unauthorize',message:'Invalid email/password'}
            }

            let checkPassword = comparePassword(password,findUser.password)
            if(!checkPassword){
                throw {name:'Unauthorize',message:'Invalid email/password'}
            }

            let access_token = createToken({id:findUser.id})
            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }

    static async findUser(req,res,next){
        try {
            let user = await User.findByPk(req.user.id)
            res.status(200).json(
                {
                    id:user.id,
                    username:user.username, 
                    email:user.email, 
                    imageUrl:user.imageUrl, 
                    status: user.status
                }
            )
        } catch (error) {
            next(error)
        }
    }

    static async payment(req,res,next){
        try {
            let snap = new midtransClient.Snap({
                isProduction:false,
                serverKey:process.env.midtrans_serverID
            })

            let parameter = {
                "transaction_details": {
                    "order_id": req.user.username+'-ORDER'+Date.now(),
                    "gross_amount": 30000
                },
                "customer_details": {
                    "first_name": req.user.username,
                    "last_name": "-",
                    "email": req.user.email
                },
                "item_details": [{
                    "id": "Premium "+req.user.username,
                    "price": 30000,
                    "quantity": 1,
                    "name": "My Pet Premium",
                }]
            };
            const response = await snap.createTransaction(parameter)
            res.json(response)
        } catch (error) {
            next(error)
        }
    }

    static async changeStatus(req,res,next){
        console.log('msk change');
        try {
            await User.update({status:'Premium'},{where:{id:req.user.id}})
            res.status(200).json({message:`success to premium`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerUser