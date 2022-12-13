const express= require('express')
const { signInController, loginUserController, userById } = require('../controller/auth-controllers')
const auth = require('../middleware/auth')

const router = express.Router()

router.get("/details",auth, userById)
router.post("/signin", signInController)
router.post("/login", loginUserController)


module.exports= router
