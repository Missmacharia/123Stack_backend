const mssql = require('mssql')
const sqlConfig= require("../../config/index")
const {v4}= require('uuid')
const bcrypt= require('bcrypt')
const signinSchema = require('../schemas/signinSchema')
const { user } = require('../../config/index')
const loginSchema = require('../schemas/loginSchema')

const signInController= async (req, res)=>{
    try {
        //get the body from the schemas
        const { error } =signinSchema.validate(req.body) 
        if(error){
            return res.status(400).json({
                error: error.message
            })
        }

        const {username, email}=req.body
        const userId= v4
        //creates a connection to the database
        const pool = await mssql.connect(sqlConfig)
        const id = userId()
        //generates a salt
        // const salt = await bcrypt.genSalt(10)
        // const password=await bcrypt.hash(salt, req.body.password)
        const password = await bcrypt.hash(req.body.password, 10)
        await pool
        .request()
        .input('id', mssql.VarChar, id)
        .input('username', mssql.VarChar, username)
        .input('email', mssql.VarChar, email)
        .input('password', mssql.VarChar, password)
        .execute("signInuser")
        //finds if user exists
        if (user.email=== email) {
            return res.status(401).json({
                message:('user already exists')
            })
        }else {
            return res.status(200).json({
                message: ('user signed in sucessfully')
            })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            error: error.message
        })
    }
}


const loginUserController = async (req, res)=>{
    try {
        //get the body from the schema to verify the data

        const { error } =loginSchema.validate(req.body)
        if(error){
            res.status(400).json({
                error: error.message
            })
        }

        const {email, password}=req.body
        const pool= await mssql.connect(sqlConfig)
        await pool
        .request()
        .input('email', mssql.VarChar, email)
        .input('password', mssql.VarChar, password)
        .execute('loginUser')

        //compares the sigin and login passwords
        const {password: hashedPassword} =user
        const validPassword = await bcrypt.compare(password, hashedPassword)

        if(!validPassword){
            res.status(400).json({
                message: 'wrong credentials'
            })
        }


        if (user.email=== email) {
            return res.status(401).json({
                message:('user already exists')
            })
        }else {
            return res.status(200).json({
                message: ('user signed in sucessfully')
            })
        }

    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
}

module.exports= {
    signInController,
    loginUserController
}