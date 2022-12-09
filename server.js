
const express= require('express')
const dotenv= require('dotenv')
const cors= require('cors')
const app= express()
const sqlConfig= require('./config/index')
const answersroute =require('./stackQuestions/Routes/answers')
const questionsroutes= require('./stackQuestions/Routes/questions')
const commentsroutes= require('./stackQuestions/Routes/comments')
const usersroutes= require('./auth-api/routes/auth.userRoutes')

dotenv.config()

app.use(express.json())
app.use(cors())

app.use('/users', usersroutes)

app.use('/answers', answersroute)

app.use('/comments', commentsroutes)

app.use('/questions', questionsroutes)


app.listen(process.env.PORT || 6000, ()=>{
    console.log(`server is running ${process.env.PORT}`);
})