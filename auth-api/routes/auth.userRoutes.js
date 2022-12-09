const express= require('express')
const { signInController, loginUserController } = require('../controller/auth-controllers')

const router = express.Router()

router.post("/", signInController)
// router.post("/", loginUserController)


module.exports= router