const express= require('express')
const auth = require('../../auth-api/middleware/auth')
const { getQuestions, getQuestion, addQuestion, searchQuestion, deleteQuestion } = require('../controllers')

const router= express.Router()

router.get('/search', searchQuestion)
router.get('/questions', getQuestions)
router.get('/:id', getQuestion)
router.post('/addQuiz', addQuestion)
router.put('/deleteQuiz/:id', deleteQuestion)
module.exports= router