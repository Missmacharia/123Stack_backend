const express= require('express')
const auth = require('../../auth-api/middleware/auth')
const {  getComments, addComment } = require('../controllers')
const router= express.Router()


router.get('/:answerId', getComments)
router.post('/addCom/:answerId',auth, addComment)

module.exports = router