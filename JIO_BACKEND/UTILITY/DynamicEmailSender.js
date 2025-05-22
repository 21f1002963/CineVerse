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
        console.error(err)
        throw new Error(err.message)
    }
}

// async function updateTemplateHelper(tempelatePath, toReplaceObject){
//     let templateContent = await fs.promises.readFile(tempelatePath, 'utf-8')
//     const kerArrs = Object.keys(toReplaceObject);
//     kerArrs.forEach((key) => {
//         templateContent = templateContent.replace(`#{${key}}`, toReplaceObject[key])
//     })
//     return templateContent
// }

async function sendEmailHelper(otp, htmlTemplate, userName, to) {
    // 2 write the template
    // template -> final -> replace placeholders with actual data
    const nameUpdatedHtml = htmlTemplate.replace("#{USER_NAME}", userName);
    const finalHTMLCode = nameUpdatedHtml.replace("#{OTP}", otp);
    const text = `
    Hi ${userName}
    Your otp to reset your password is ${otp}`;
    const subject = "RESET PASSWORD Verification OTP";
    await emailSender(to, subject, finalHTMLCode, text);
}

module.exports = sendEmailHelper;
