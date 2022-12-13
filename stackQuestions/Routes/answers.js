const express= require('express')
const { getAnswers,  addAnAnswer, passVotes} = require('../controllers')
const router= express.Router()


router.get('/answers', getAnswers)
router.post('/addAns', addAnAnswer)
router.put("/votes/:id", passVotes)

module.exports = router