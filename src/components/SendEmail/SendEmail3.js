import React from 'react';
//Css:
import Button from '@mui/material/Button';
// import { SendGridSendEmail } from './SendGridSendEmail.js';

const SendEmail3 = () => {
  const sendEmailWithSendGrid = () => {
    require('dotenv').config();
    const sgMail = require('@sendgrid/mail');

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const message = {
      method: 'POST', //delete?
      mode: 'no-cors', //delete?
      headers: {
        //delete?
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },

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
        console.error('error:', error);
      });
    // SendGridSendEmail();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        onClick={() => sendEmailWithSendGrid()}
      >
        send email with sendgrid Goo
      </Button>
    </div>
  );
};

export { SendEmail3 };
