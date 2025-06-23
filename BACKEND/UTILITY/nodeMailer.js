const dotenv = require('dotenv')
const nodemailer = require('nodemailer')
dotenv.config()

const SendGridTechDetails = {
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true,
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY
    }
}

const transporter = nodemailer.createTransport(SendGridTechDetails);

async function sendMail({ to, from, subject, text, html }) {
    if (!to || !from || !subject) {
        throw new Error('Missing required email parameters');
    }
    try {
        await transporter.sendMail({ to, from, subject, text, html });
        console.log('Email sent');
    } catch (error) {
        console.error('Email sending error:', error);
        throw error;
    }
}

module.exports = sendMail;

// Usage example:
// sendMail({
//   to: 'recipient@example.com',
//   from: process.env.APP_EMAIL,
//   subject: 'Subject',
//   text: 'Text body',
//   html: '<b>HTML body</b>'
// });

