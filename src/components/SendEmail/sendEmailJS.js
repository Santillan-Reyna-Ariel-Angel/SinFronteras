// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript;
require('dotenv').config();
console.log('T', process.env.SENDGRID_API_KEY);
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'santillanreynaarielangel@gmail.com', // Destinatario
//   from: 'sinfronteras.sucre@gmail.com', // Remitente verificado
//   subject: 'Asunto: Sending with SendGrid is Fun', //asunto
//   text: 'Hola santillan, te saluda SinFronteras',
//   html: '<strong>Felicitaciones con html</strong>',
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent');
//   })
//   .catch((error) => {
//     console.error(error);
//   });
