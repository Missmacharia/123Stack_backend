const express= require('express')
const { getAnswers,  addAnAnswer } = require('../controllers')
const router= express.Router()


router.get('/', getAnswers)
router.post('/', addAnAnswer)

module.exports = router