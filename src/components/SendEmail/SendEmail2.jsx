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

  const sendEmailBasic2 = () => {};
  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => sendEmailBasic2()}
      >
        sendInBlueEmail
      </Button>
    </>
  );
};

export { SendEmail2 };
