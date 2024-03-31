const express = require('express')
const router = express.Router()
const routerUser = require('./user')
const routerCommunity = require('./community')
const routerUC = require('./userCommunity')
const routerPost = require('./post')
const authentication = require('../middleware/authentication')

router.get('/',(req,res)=>{
    res.send('helow terkoneksi...')
})
router.use('/', routerUser)

router.use(authentication)
router.use('/communities', routerCommunity)
router.use('/communityUser', routerUC)
router.use('/posts', routerPost)

module.exports=router