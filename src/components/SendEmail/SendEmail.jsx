import React from 'react';
//MUI:
import Button from '@mui/material/Button';

const nodemailer = require('nodemailer'); // import nodemailer from 'nodemailer';

const SendEmail = () => {
  const buttonSendEmail = async () => {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, // por que se tiene seguridad se coloca este puerto
      secure: true, // true for 465, false si port is 587 u otro
      // service: 'gmail', // opcional
      auth: {
        user: 'sinfronteras.sucre@gmail.com',
        pass: 'passGmailOrPassSecureApplication',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // Verify SMTP connection configuration:
    // transporter.verify().then(() => {
    //   console.log('verify');
    // });

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    console.log('antes del try');
    try {
      console.log('dentro del try');
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Prueba" <sinfronteras.sucre@gmail.com>', // desde donde saldra el email
        to: 'santillanreynaarielangel@gmail.com', // lista de destinatarios
        subject: 'Prueba subject',
        text: 'Hello desde text node mailer', // texto a enviar
        html: '<b>Hello desde el html node mailer</b>', // html a enviar
      });

      console.log('Mensaje enviado: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Vista previa URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      console.log('final del try');
    } catch (error) {
      console.log('dentro del catch');
      console.error(error);
    }
  };

  // const video2 = () => {
  //   const nodemailer = require('nodemailer');
  //   let transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: 'sinfronteras.sucre@gmail.com',
  //       pass: 'passGmailOrPassSecureApplication',
  //     },
  //     tls: {
  //       rejectUnauthorized: false,
  //     },
  //   });

  //   let mailOptions = {
  //     from: 'sinfronteras.sucre@gmail.com',
  //     to: 'santillanreynaarielangel@gmail.com',
  //     subject: 'Subject v2',
  //     text: 'text v2',
  //   };
  //   console.log('antes de enviar el correo');
  //   transporter.sendMail(mailOptions, function (err, success) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('Email sent successfully');
  //     }
  //     console.log('despues de enviar el correo');
  //   });
  // };

  // const email1 = () => {
  //   let transporter = nodemailer.createTransport({
  //     streamTransport: true,
  //     newline: 'windows',
  //   });
  //   transporter.sendMail(
  //     {
  //       from: 'sinfronteras.sucre@gmail.com',
  //       to: 'santillanreynaarielangel@gmail.com',
  //       subject: 'Message',
  //       text: 'I hope this message gets streamed!',
  //     },
  //     (err, info) => {
  //       console.log(info.envelope);
  //       console.log(info.messageId);
  //       info.message.pipe(process.stdout);
  //     }
  //   );
  // };

  // const email2 = () => {
  //   let transporter = nodemailer.createTransport({
  //     jsonTransport: true,
  //   });
  //   transporter.sendMail(
  //     {
  //       from: 'sinfronteras.sucre@gmail.com',
  //       to: 'santillanreynaarielangel@gmail.com',
  //       subject: 'Message',
  //       text: 'I hope this message gets buffered!',
  //     },
  //     (err, info) => {
  //       console.log(info.envelope);
  //       console.log(info.messageId);
  //       console.log(info.message); // JSON string
  //     }
  //   );
  // };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => buttonSendEmail()}
        // onClick={() => video2()}
        // onClick={() => email1()}
        // onClick={() => email2()}
      >
        Enviar Email
      </Button>
    </>
  );
};

export { SendEmail };
