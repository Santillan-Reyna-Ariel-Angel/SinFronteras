import React from 'react';
//Css:
import Button from '@mui/material/Button';

const SendEmailSendGrid = () => {
  const sendEmailWithSendGrid = () => {
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    // javascript;
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'santillanreynaarielangel@gmail.com', // Destinatario
      from: 'sinfronteras.sucre@gmail.com', // Remitente verificado
      subject: 'Asunto: Sending with SendGrid is Fun', //asunto
      text: 'Hola santillan, te saluda SInFronteras',
      html: '<strong>Felicitaciones con html</strong>',
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sendEmailWithSendGrid2 = () => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'santillanreynaarielangel@gmail.com', //destinatario
      from: 'sinfronteras.sucre@gmail.com', // Use the email address or domain you verified above
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    //ES6
    // sgMail.send(msg).then(
    //   () => {},
    //   (error) => {
    //     console.error(error);

    //     if (error.response) {
    //       console.error(error.response.body);
    //     }
    //   }
    // );

    //ES8
    (async () => {
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    })();
  };
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        onClick={() => sendEmailWithSendGrid2()}
      >
        send email with sendgrid
      </Button>
    </div>
  );
};

export { SendEmailSendGrid };
