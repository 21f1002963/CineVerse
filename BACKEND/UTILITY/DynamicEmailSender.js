const fs = require("fs");
const dotenv = require('dotenv')
const nodemailer= require('nodemailer')
dotenv.config()

const techDetails = {
    host: 'smtp.gmail.com',
    port: 465,
    //identify our application -> sender 
    secure: true,
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD
    }
}

const transporter = nodemailer.createTransport(techDetails);

async function emailSender(to, subject, html, text){
    try{       
        const msg = {
            to: to,// Change to your recipient
            from: process.env.APP_EMAIL, // Change to your verified sender
            subject: subject,
            text: text,
            html: html,
        }
        await transporter.sendMail(msg);
        console.log('Email sent') 
    } catch(err){
        console.error('Email sending error:', err)
        throw new Error(err.message)
    }
}

async function sendEmailHelper(otp, htmlTemplate, userName, to) {
    if (!otp || !htmlTemplate || !userName || !to) {
        throw new Error('Missing required parameters for sending email');
    }
    let finalHTMLCode = htmlTemplate.replace(/{{USER_NAME}}/g, userName).replace(/{{OTP}}/g, otp);
    const text = `Hi ${userName}\nYour otp to reset your password is ${otp}`;
    const subject = "RESET PASSWORD Verification OTP";
    await emailSender(to, subject, finalHTMLCode, text);
}

module.exports = sendEmailHelper;
