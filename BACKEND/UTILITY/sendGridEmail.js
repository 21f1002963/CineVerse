const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv')
dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function sendGridEmail({ to, from, subject, text, html }) {
    if (!to || !from || !subject) {
        throw new Error('Missing required email parameters');
    }
    try {
        await sgMail.send({ to, from, subject, text, html });
        console.log('Email sent');
    } catch (error) {
        console.error('SendGrid email error:', error);
        throw error;
    }
}

module.exports = sendGridEmail;

// Usage example:
// sendGridEmail({
//   to: 'recipient@example.com',
//   from: process.env.APP_EMAIL,
//   subject: 'Subject',
//   text: 'Text body',
//   html: '<b>HTML body</b>'
// });