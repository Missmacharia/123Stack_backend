const express= require('express')
const { signInController, loginUserController } = require('../controller/auth-controllers')

const router = express.Router()

router.post("/signin", signInController)
router.post("/login", loginUserController)


module.exports= router