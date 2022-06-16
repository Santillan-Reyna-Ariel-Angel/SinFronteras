import React from 'react';
//Css:
import Button from '@mui/material/Button';

const SendEmail3 = () => {
  const sendInBlueEmail = () => {
    const SibApiV3Sdk = require('sib-api-v3-typescript');
    let apiInstance = new SibApiV3Sdk.AccountApi();
    apiInstance.setApiKey(
      SibApiV3Sdk.AccountApiApiKeys.apiKey,
      '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'
    );

    new SibApiV3Sdk.TransactionalEmailsApi()
      .sendTransacEmail({
        sender: {
          email: 'sinfronteras.sucre@gmail.com',
          name: 'Sin Fronteras',
        },
        subject: 'Boletos de Viaje', //por default, este se anulara si existe el mismo campo en  messageVersion
        htmlContent:
          '<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>', //por default, este se anulara si existe el mismo campo en messageVersion
        params: {
          greeting: 'This is the default greeting',
          headline: 'This is the default headline',
        },
        messageVersions: [
          //Definition for Message Version 1
          {
            to: [
              {
                email: 'santillanreynaarielangel@gmail.com',
                name: 'Ariel',
              },
              {
                email: 'santillanreynaarielangel1@gmail.com',
                name: 'Ariel1',
              },
            ],
            htmlContent:
              '<!DOCTYPE html><html><body><h1>Modified header! (messageVersion1)</h1><p>This is still a paragraph (messageVersion1)</p></body></html>',
            subject: 'We are happy to be working with you (messageVersion1)',
          },
        ],
      })
      .then(
        function (data) {
          console.log(data);
        },
        function (error) {
          console.error(error);
        }
      );
  };

  const sendInBlueEmail2 = () => {
    const SibApiV3Sdk = require('sib-api-v3-sdk');
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey =
      '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';

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = 'My {{params.subject}}';
    sendSmtpEmail.htmlContent =
      '<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>';
    sendSmtpEmail.sender = { name: 'John Doe', email: 'example@example.com' };
    sendSmtpEmail.to = [{ email: 'example1@example1.com', name: 'Jane Doe' }];
    sendSmtpEmail.cc = [{ email: 'example2@example2.com', name: 'Janice Doe' }];
    sendSmtpEmail.bcc = [{ email: 'John Doe', name: 'example@example.com' }];
    sendSmtpEmail.replyTo = { email: 'replyto@domain.com', name: 'John Doe' };
    sendSmtpEmail.headers = { 'Some-Custom-Name': 'unique-id-1234' };
    sendSmtpEmail.params = {
      parameter: 'My param value',
      subject: 'New Subject',
    };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log(
          'API called successfully. Returned data: ' + JSON.stringify(data)
        );
      },
      function (error) {
        console.error(error);
      }
    );
  };
  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => sendInBlueEmail()}
      >
        sendInBluetypeScriptEmail
      </Button>
    </>
  );
};

export { SendEmail3 };
