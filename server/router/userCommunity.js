const express = require('express')
const ControllerUserCommunity = require('../controller/controllerUC')
const router = express.Router()

router.get('/', ControllerUserCommunity.allUserCommunity)
router.post('/:communityId', ControllerUserCommunity.addCommunity)
router.delete('/:communityId', ControllerUserCommunity.deleteCommunity)

module.exports=router