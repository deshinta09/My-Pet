const express = require('express')
const ControllerPost = require('../controller/controllerPost')
const {authorization, authorizationAddPost} = require('../middleware/authorization')
const router = express.Router()

router.get('/:id', authorization, ControllerPost.allPost)
router.post('/:id', authorizationAddPost, ControllerPost.addPost)

module.exports=router