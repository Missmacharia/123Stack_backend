const express= require('express')
const auth = require('../../auth-api/middleware/auth')
const { getQuestions, getQuestion, addQuestion, searchQuestion, deleteQuestion, getSingleUserQuestion } = require('../controllers')

const router= express.Router()

router.get('/search', searchQuestion)
router.get('/', getQuestions)
router.get('/:id', getQuestion)
router.post('/addQuiz',auth, addQuestion)
router.delete('/deleteQuiz/:id',auth, deleteQuestion)
router.get('/userQuiz/:userId', getSingleUserQuestion)
module.exports= router