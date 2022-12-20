const express= require('express')
const { signUpController, loginUserController, userById, getUsers } = require('../controller/auth-controllers')
const auth = require('../middleware/auth')

const router = express.Router()
router.get("/users", getUsers)
router.get("/details",auth, userById)
router.post("/signup", signUpController)
router.post("/login", loginUserController)


module.exports= router
