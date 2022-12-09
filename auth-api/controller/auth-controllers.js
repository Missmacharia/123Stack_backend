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
        res.status(200).json({
            message: "sign in successfully"
        })
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
            ).recordset[0]

            console.log(result);
        //compares the sigin and login passwords
        // const {password: hashedPassword} =user
        const validPassword = await bcrypt.compare(password, result.password)

        if(!validPassword){
            return res.status(400).json({
                message: 'wrong credentials'
            })
        }else{
            return res.status(200).json({
                message: 'login success'
            })
        }

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "user doesn't exist"
        })
    }
}

module.exports= {
    signInController,
    loginUserController
}