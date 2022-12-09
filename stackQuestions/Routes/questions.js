const express= require('express')
const { getQuestions, getQuestion, addQuestion, deleteQuestion } = require('../controllers')

const router= express.Router()

router.get('/', getQuestions)
router.get('/:id', getQuestion)
router.post('/', addQuestion)
router.delete('/:id', deleteQuestion)


module.exports= router