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
        Authorization: process.env.SENDGRID_API_KEY, //delete?
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
    //ES6
    sgMail
      .send(message)
      .then(() => {
        console.log('Email sent exitosamente');
      })
      .catch((error) => {
        console.error('error:', error);
      });

    //ES8
    // (async () => {
    //   try {
    //     await sgMail.send(message);
    //   } catch (error) {
    //     console.error(error);

    //     if (error.response) {
    //       console.error(error.response.body);
    //     }
    //   }
    // })();
    // SendGridSendEmail();
  };

  const sendEmailFetch = async () => {
    require('dotenv').config();

    const resp = await fetch(' https://api.sendgrid.com/v3/mail/send/', {
      method: 'GET', //GET, POST, PUT, DELETE
      Authorization: process.env.SENDGRID_API_KEY,
      mode: 'no-cors', //delete?
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((respuesta) => console.log(respuesta.json())) //convertimos la respuesta en un json para poder ser operado y mostrado
      .catch((error) => console.log(error)); // capturamos posibles errores

    console.log(`resp: ${resp}`);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        onClick={() => sendEmailWithSendGrid()}
      >
        send email with sendgrid
      </Button>
    </div>
  );
};

export { SendEmail3 };
