const mssql= require('mssql')
const sqlConfig= require('../../config/index')
const {v4}= require('uuid')



// const addUser = async (req, res)=>{
//     try {
//         //gets the info from the body
//         const userid= v4
//         const {username, email, password}= req.body
//         const id= userid()
//         //connecting to the databse
//         const pool = await mssql.connect(sqlConfig)
//         await pool
//         .request()
//         //inputs tha data in the tables 
//         .input('id', mssql.VarChar, id)
//         .input('username', mssql.VarChar, username)
//         .input('email', mssql.VarChar, email)
//         .input('password', mssql.VarChar, password)
//         .execute(addUser)
//         res.status(200).json({
//             message: "user added successfully"
//         })
//     } catch (error) {
//         res.status(404).json({
//             error: error.message
//         })
        
//     }
// }

const getQuestions = async (req, res)=>{
    try {
        //create a coooenction btwn the database and the backend
        const pool = await mssql.connect(sqlConfig)
       const response= await pool.request().execute('getQuestions')
       //return data as record sets
       const questions= await response.recordset
       //if there are questions
       if(questions.length){
        return res.status(200).json(questions)
       } else{
        //if none
        res.status(404).json({
            message: "no questions found"
        })
       }
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
}

const getQuestion = async (req, res)=>{
    try {
        //connecting the database
        //gets data from the body using params
        const { id }= req.params
        const pool = await mssql.connect(sqlConfig)
        const question= await(
            await pool
            .request()
            .input('id', mssql.VarChar, id)
            .execute('getQuestion')
        ).recordset;
        if(question.length){
            res.status(200).json(question)
        } else {
            res.status(404).json({
                message: `question id ${id}non existing `
            })
        }
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
}

const addQuestion = async (req, res)=>{
    try {
        const questionId = v4
        const {userId, title, question}=req.body
        const id= questionId()
        const pool =await mssql.connect(sqlConfig)
        await pool 
        .request()
        .input('id', mssql.VarChar, id)
        .input('userId', mssql.VarChar, userId)
        .input('title', mssql.VarChar, title)
        .input('question', mssql.VarChar, question)
        .execute('addQuestion')
        res.status(200).json({
            message: 'question added'
        })
    } catch (error) {
        res.status(404).json({
            error:error.message
        })
    }
}

const searchQuestion = async(req, res)=>{
    try {

        const {question}= req.body
        const pool= await mssql.connect(sqlConfig)
        const searchresult = await(
          await  pool
            .request()
            .input('question', mssql.VarChar, question)
            .execute('searchQuestions')
        ).recordset
        res.status(200).json({
            searchresult
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteQuestion = async (req, res)=>{
    try {
        const { id }= req.params
        const pool= await mssql.connect(sqlConfig)
        const deleteQuestion= await(
            await pool
            .request()
            .input('id', mssql.VarChar, id)
            .execute('deleteQuestion')
        ).recordset
        res.status(200).json({
            deleteQuestion
        })
    } catch (error) {
        res.status(400).json({
            message: "unable to delete question"
        })
    }
}

const getAnswers = async (req, res)=>{
    try {
        const pool= await mssql.connect(sqlConfig)
        const response= await pool.request().execute('getAnswers')
        const answers= await response.recordset
        if(answers.length){
            return res.status(200).json(answers)
        } else {
            res.status(404).json({
                message: 'answers not found'
            })
        }
    } catch (error) {
        res.status(404).json({
            error:error.message
        })
    }
}

const addAnAnswer = async (req, res)=>{
    try {
        const answerId= v4
        const {userId, questionId, answer, upVote, downVote}=req.body
        const id =answerId()
        const pool = await mssql.connect(sqlConfig)
        await pool
        .request()
        .input('id', mssql.VarChar, id)
        .input('userId', mssql.VarChar, userId)
        .input('questionId', mssql.VarChar, questionId)
        .input('answer', mssql.VarChar, answer)
        .input('upVote', mssql.Int, upVote)
        .input('downVote', mssql.Int, downVote)
        .execute('addAnAnswer')
        res.status(200).json({
            message: 'Answer added successfully'
        })
    } catch (error) {
        res.status(404).json({
            error:error.message
        })
        
    }
}

const passVotes = async (req, res)=>{
    try {
        const {id}= req.params
        const pool = await mssql.connect(sqlConfig)
        let passVoteResult= await (
            await pool.request()
            .input('id', mssql.VarChar, id)
            .input('upVote', mssql.Int, upVote)
            .input('downVote', mssql.Int, downVote)
            .execute('passVotes')
        ).rowsAffected
        res.status(200).json({
            passVoteResult
        })
    } catch (error) {
       res.status(500).json({
        message: "unable to upvote/ downvote"
       }) 
    }
}


const getComments = async (req, res)=>{
    try {
        const pool= await mssql.connect(sqlConfig)
        const response= await pool.request().execute('getComments')
        const comments= await response.recordset
        if(comments.length){
            return res.status(200).json(comments)
        } else{
            res.status(404).json({
                message: 'no cooments found'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            error: error.message
        })
    }
}

const addComment = async (req, res)=>{
    try {
        const commentId= v4
        const {userId, answerId, comment}=req.body
        const id= commentId()
        const pool= await mssql.connect(sqlConfig)
        await pool
        .request()
        .input('id', mssql.VarChar, id)
        .input('userId', mssql.VarChar, userId)
        .input('answerId', mssql.VarChar, answerId)
        .input('comment', mssql.VarChar, comment)
        .execute('addComment')
        res.status(200).json({
            message: 'coment successfully added'
        })
    } catch (error) {
        res.status(404).json({
            error:error.message
        })
    }
}

module.exports={
    // addUser,
    getQuestions,
    getQuestion,
    searchQuestion,
    addQuestion,
    deleteQuestion,
    getAnswers,
    addAnAnswer,
    passVotes,
    getComments,
    addComment
}