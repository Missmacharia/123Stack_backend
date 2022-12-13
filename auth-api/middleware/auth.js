const jwt = require('jsonwebtoken')

const auth= (req, res, next)=>{
    try {
        //request the token from the headers
        const bearer = req.header['authorization']

        if(!bearer) {
            return res.status(401).send({message: "Access denied"})
        }
        //stored as an array the 2nd number is the token
        const token = bearer.split(" ")[1]
        console.log(token);
//verifyin the token
        const {id, email}= jwt.verify(token, "SECRET");

        req.user = {id, email}

        next()

    } catch (error) {
       res.status(401).send({message: "Access denied"}) 
    }
}

module.exports = auth;