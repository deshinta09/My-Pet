const express = require('express')
const ControllerUser = require('../controller/controllerUser')
const authentication = require('../middleware/authentication')
const router = express.Router()

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.post('/google-login', ControllerUser.loginGoogle)
router.use(authentication)
router.get('/user', ControllerUser.findUser)
router.post('/payment', ControllerUser.payment)
router.put('/payment/success', ControllerUser.changeStatus)


module.exports=router