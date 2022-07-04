import React from 'react';
//Css:
import Button from '@mui/material/Button';
// import { SendGridSendEmail } from './SendGridSendEmail.js';

// Nota: añadir a la url "HTTP/1.1" => https://api.sendgrid.com/v3/mail/send HTTP/1.1
const SendEmail3 = () => {
  const sendEmailWithSendGrid = () => {
    require('dotenv').config();
    console.log('k', process.env.SENDGRID_API_KEY);
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

    // SendGridSendEmail();
  };

  const sendEmailFetch = async () => {
    require('dotenv').config();
    console.log('k', process.env.SENDGRID_API_KEY);
    const resp = await fetch('https://api.sendgrid.com/v3/mail/send/', {
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

  const sendEmailSGClient = () => {
    require('dotenv').config();
    console.log('k', process.env.SENDGRID_API_KEY);
    const client = require('@sendgrid/client');
    client.setApiKey(process.env.SENDGRID_API_KEY);
    const request = {
      method: 'GET',
      url: '/v3/api_keys',
    };
    client.request(request).then(([response, body]) => {
      console.log(response.statusCode);
      console.log(body);
    });
  };

  const sendEmailSGClient2 = () => {
    require('dotenv').config();
    console.log('k', process.env.SENDGRID_API_KEY);
    const client = require('@sendgrid/client');
    client.setApiKey(process.env.SENDGRID_API_KEY);
    const request = {
      method: 'POST', //GET
      url: 'https://api.sendgrid.com/v3/mail/send', // https://api.sendgrid.com/v3/mail/send or /v3/api_keys

      mode: 'no-cors', //delete?
      headers: {
        //delete?
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: process.env.SENDGRID_API_KEY, //delete?
      },
    };

    const data = {
      content: [
        {
          type: 'text/html',
          value: '<html><p>Hello, world!</p></html>',
        },
      ],
      from: {
        email: 'sinfronteras.sucre@gmail.com',
        name: 'Sin Fronteras',
      },
      personalizations: [
        {
          subject: 'Hello, World!',
          to: [
            {
              email: 'santillanreynaarielangel@gmail.com',
              name: 'Ariel0',
            },
          ],
        },
      ],
      reply_to: {
        email: 'sinfronteras.sucre@gmail.com',
        name: 'Sin Fronteras',
      },
      subject: 'Hello, World!',
    };
    request.body = data;
    request.method = 'POST';
    request.url = 'https://api.sendgrid.com/v3/mail/send'; // https://api.sendgrid.com/v3/mail/send or /v3/mail/send
    client.request(request).then(([response, body]) => {
      console.log(response.statusCode);
      console.log(response.body);
    });
  };
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        onClick={() => sendEmailSGClient2()}
      >
        send email with sendgrid
      </Button>
    </div>
  );
};

export { SendEmail3 };
