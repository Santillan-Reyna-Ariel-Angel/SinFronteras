import React from 'react';
//Css:
import Button from '@mui/material/Button';

// ApiKeySendInBlue:
// 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

const SendEmail2 = () => {
  // const sendEmailBasic = () => {
  //   var SibApiV3Sdk = require('sib-api-v3-sdk');
  //   SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
  //     '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';

  //   new SibApiV3Sdk.TransactionalEmailsApi()
  //     .sendTransacEmail({
  //       subject: 'Hello from the Node SDK!',
  //       sender: { email: 'sinfronteras.sucre@gmail.com', name: 'SinFronteras' },
  //       replyTo: {
  //         email: 'sinfronteras.sucre@gmail.com',
  //         name: 'SinFronteras',
  //       },
  //       to: [{ name: 'Ariel0', email: 'santillanreynaarielangel@gmail.com' }],
  //       htmlContent:
  //         '<html><body><h1>This is a transactional email {{params.bodyMessage}}</h1></body></html>',
  //       params: { bodyMessage: 'Made just for you!' },
  //     })
  //     .then(
  //       function (data) {
  //         console.log(data);
  //       },
  //       function (error) {
  //         console.error(error);
  //       }
  //     );
  // };

  const sendEmailBasic2 = async () => {
    const url = 'https://rickandmortyapi.com/api/character';
    const options = {
      // method: 'POST',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log(json.results))
      .catch((err) => console.error('error:' + err));
  };

  const web2 = () => {
    const url = 'https://api.sendinblue.com/v3/smtp/email';
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key':
          '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',
      },
      data: {
        sender: {
          name: 'SinFronteras',
          email: 'sinfronteras.sucre@gmail.com',
        },
        to: [
          {
            email: 'santillanreynaarielangel@gmail.com',
            name: 'Arile0',
          },
        ],
        subject: 'Hello world',
        htmlContent:
          '<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>',
      },

      // body: JSON.stringify({
      //   sender: {
      //     name: 'SinFronteras',
      //     email: 'sinfronteras.sucre@gmail.com',
      //   },
      //   to: [{ email: 'santillanreynaarielangel@gmail.com', name: 'Ariel0' }],
      //   htmlContent:
      //     '<!DOCTYPE html> <html> <body> <h1>Confirm you email</h1> <p>Please confirm your email address by clicking on the link below</p> </body> </html>',
      //   textContent:
      //     'Please confirm your email address by clicking on the link https://text.domain.com',
      //   subject: 'Login Email confirmation',
      //   replyTo: { email: 'sinfronteras.sucre@gmail.com', name: 'Ariel0' },
      // }),
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error('error:' + err));
    // Nos da error 401: 401	Unauthorized	You have not been authenticated. Make sure the provided api-key is correct
  };
  return (
    <>
      <Button
        variant="contained"
        color="success"
        // onClick={() => sendEmailBasic2()}
        onClick={() => web2()}
      >
        sendInBlueEmail
      </Button>
    </>
  );
};

export { SendEmail2 };
