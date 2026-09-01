export const SendGridSendEmail = () => {
  require('dotenv').config();
  console.log('k', process.env.SENDGRID_API_KEY);
  const sgMail = require('@sendgrid/mail');

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const message = {
    to: [
      'santillanreynaarielangel@gmail.com',
      'santillanreynaarielangel1@gmail.com',
    ], // Destinatario(s)
    //   from: 'sinfronteras.sucre@gmail.com',
    from: { name: 'SIN FRONTERAS', email: 'sinfronteras.sucre@gmail.com' }, // Remitente verificado y nombre
    subject: 'Boletos de viaje', //asunto
    text: 'Felicidades!!! acabas de comprar tu pasaje. Sin Fronteras te desea un Feliz Viaje. Estos son tus asientos:',
    html: '<strong>Felicitaciones estos son tus asientos en HTML</strong>',
  };
  sgMail
    .send(message)
    .then(() => {
      console.log('Email sent exitosamente');
    })
    .catch((error) => {
      console.error(error);
    });
};

//Prueba servidor:
// require('dotenv').config();
// console.log('k', process.env.SENDGRID_API_KEY);
// const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const message = {
//   to: [
//     'santillanreynaarielangel@gmail.com',
//     'santillanreynaarielangel1@gmail.com',
//   ], // Destinatario(s)
//   //   from: 'sinfronteras.sucre@gmail.com',
//   from: { name: 'SIN FRONTERAS', email: 'sinfronteras.sucre@gmail.com' }, // Remitente verificado y nombre
//   subject: 'Boletos de viaje', //asunto
//   text: 'Felicidades!!! acabas de comprar tu pasaje. Sin Fronteras te desea un Feliz Viaje. Estos son tus asientos:',
//   html: '<strong>Felicitaciones estos son tus asientos en HTML</strong>',
// };
// sgMail
//   .send(message)
//   .then(() => {
//     console.log('Email sent exitosamente');
//   })
//   .catch((error) => {
//     console.error(error);
//   });
