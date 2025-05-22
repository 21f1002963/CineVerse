const dotenv = require('dotenv')
const nodemailer= require('nodemailer')
dotenv.config()

const SendGridTechDetails={
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true,
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY
    }
}

const msg = {
    to: 'mkmohitkumar700@gmail.com',// Change to your recipient
    from: '21f1002963@ds.study.iitm.ac.in', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

const transporter = nodemailer.createTransport(SendGridTechDetails);

transporter.sendMail(msg).then(() => {
    console.log('Email sent')
  })
    .catch((error) => {
        console.error
    })

