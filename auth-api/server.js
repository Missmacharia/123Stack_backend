
require('dotenv').config()
const express= require('express')
const cors= require('cors')

const authRoutes =require('./routes/auth.routes')

const app= express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)

app.listen(process.env.PORT || 4000, ()=>{
    console.log(`server is running ${process.env.PORT}`);
})