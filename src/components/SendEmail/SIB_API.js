// Creating your API request using Sendinblue API clients:
//  https://developers.sendinblue.com/docs/send-a-transactional-email#creating-your-api-request-using-sendinblue-api-clients

require('dotenv').config();
console.log('K', process.env.SIB_API_KEY);

var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

sendSmtpEmail = {
  // sender: {
  //     name: 'SIN FRONTERAS',
  //     email: 'sinfronteras.sucre@gmail.com',
  //     //   id: 2,
  //   },
  to: [
    {
      email: 'santillanreynaarielangel@gmail.com',
      name: 'Ariel0',
    },
  ],
  templateId: 59,
  params: {
    name: 'John',
    surname: 'Doe',
  },
  headers: {
    'api-key': process.env.SIB_API_KEY,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

apiInstance.sendTransacEmail(sendSmtpEmail).then(
  function (data) {
    console.log('API called successfully. Returned data: ' + data);
  },
  function (error) {
    console.error(error);
  }
);
