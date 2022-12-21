const express= require('express')
const auth = require('../../auth-api/middleware/auth')
const { getAnswers,  addAnAnswer, passVotes, getQuestionAns} = require('../controllers')
const router= express.Router()


router.get('/', getAnswers)
router.get('/:questionId', getQuestionAns)
router.post('/addAns/:questionId',auth, addAnAnswer)
router.post("/votes/:id",auth, passVotes)

module.exports = router