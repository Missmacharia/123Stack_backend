const mssql = require('mssql')
const sqlConfig= require("../../config/index")
const {v4}= require('uuid')
const bcrypt= require('bcrypt')
const signinSchema = require('../schemas/signinSchema')
const { user } = require('../../config/index')
const loginSchema = require('../schemas/loginSchema')
const jwt =require('jsonwebtoken')

const signInController= async (req, res)=>{
    try {
        //get the body from the schemas
        //if they haven't followed an appropriate order
        const { error } =signinSchema.validate(req.body) 
        if(error){
            return res.status(400).json({
                message: "re-enter credentials"
            })
        }

        const {username, email}=req.body
        const userId= v4
        //creates a connection to the database
        const pool = await mssql.connect(sqlConfig)
        const id = userId()
        //generates a salt
        const salt = await bcrypt.genSalt(10)
        const password=await bcrypt.hash( req.body.password,salt)
        // const password = await bcrypt.hash(req.body.password, 10)
        let signinResult = await (await pool
       .request()
       .input('id', mssql.VarChar, id)
       .input('username', mssql.VarChar, username)
        .input('email', mssql.VarChar, email)
        .input('password', mssql.VarChar, password)
        .execute("signInuser")).rowsAffected
        console.log(signinResult);

        //creating a token for the user
        const token= await jwt.sign({id, email}, "SECRET", {
            expiresIn: "18hrs"
        });

        res.status(201).send({
            user: {id, username, email}, token })

        // res.status(200).json({
        //     message: "sign in successfully"
        // })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "sign in failed"
        })
    }
}


const loginUserController = async (req, res)=>{
    try {
        //get the body from the schema to verify the data

        const { error } =loginSchema.validate(req.body)
        if(error){
            return res.status(400).json({
                message: "re-enter credientials"
            })
        }

        const { email, password }=req.body
        const pool= await mssql.connect(sqlConfig)
        let result = await ( await pool
            .request()
            .input('email', mssql.VarChar, email)
            .execute('loginUser')
            ).recordsets

            console.log(result);
        //compares the sigin and login passwords
       
        const validPassword = await bcrypt.compare(password, result.password)
        
        if(!validPassword){
            return res.status(400).json({
                message: 'wrong credentials'
            })
        }
       
        //verifying the tokens
        const token = await jwt.verify({
            id: user.id, email: user.email },
             "SECRET",
              { expiresIn: "18hrs" }
         )

        res.status(200).json({
            user: { id: user.id, username: user.username, email: user.email },
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "login failed"
        })
    }
}

const userById= async (req, res)=>{
    try {
        let {id}= req.user 
        const pool = await mssql.connect(sqlConfig)
        let user = await (await pool
            .input('id', mssql.VarChar, id)
            ).recordsets
       if(user.length <=0){
        return res.status(404).send({message: "failed to identity user"})
       }

       const token= jwt.sign(
        { id: user.id, email: user.email }, "SECRET",
        {expiresIn : "18hrs"}
       )
       res.send({
        user: {id: user.id, name: user.name, email: user.email}, 
        token
       })
    } catch (error) {
        res.status(500).send({message: "failed to process request please try again"})
    }
}

module.exports= {
    signInController,
    loginUserController,
    userById
}