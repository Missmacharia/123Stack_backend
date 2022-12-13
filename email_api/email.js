const nodemailer= require('nodemailer')

const sendEmail= async(email)=>{
    try {
        //create a reusable object using the default SMTP
        let transporter = nodemailer.createTransport({
            host: "stmp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "yvonnemacharia30@gmail.com",
                pass: "paimpcenjerkyeih"
            }
        })
        await transporter.verify()
        await transporter.sendMail(email)
        
    } catch (error) {
        res.status(400).json({
            message: "error in sending email"
        })
    }
}

module.exports= sendEmail