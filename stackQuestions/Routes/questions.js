const express= require('express')
const auth = require('../../auth-api/middleware/auth')
const { getQuestions, getQuestion, addQuestion, deleteQuestion } = require('../controllers')

const router= express.Router()

router.get('/', getQuestions)
router.get('/:id', getQuestion)
router.post('/', auth, addQuestion)
router.delete('/:id', deleteQuestion)


module.exports= router