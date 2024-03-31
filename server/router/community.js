const express = require('express')
const ControllerCommunity = require('../controller/controllerCommunity')
const { authorizationPremium } = require('../middleware/authorization')
const router = express.Router()

router.get('/', ControllerCommunity.allCommunities)
router.get('/myCommunities', ControllerCommunity.myCommunities)
router.post('/', authorizationPremium, ControllerCommunity.addCommunity)

module.exports=router