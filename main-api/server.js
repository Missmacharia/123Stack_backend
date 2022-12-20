
require('dotenv').config()
const express= require('express')
const cors= require('cors')

const answersroute =require('./Routes/answers')
const questionsroutes= require('./Routes/questions')
const commentsroutes= require('./Routes/comments')

const app= express()

app.use(express.json())
app.use(cors())

app.use('/api/answers', answersroute)

app.use('/api/comments', commentsroutes)

app.use('/api/questions', questionsroutes)

app.listen(process.env.PORT || 8080, ()=>{
    console.log(`server is running ${process.env.PORT}`);
})