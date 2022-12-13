const express= require('express')
const sendEmail = require('../email')


const router = express.Router()

router.post('/api/email', sendEmail)

module.exports= router