require('dotenv').config();
console.log('K', process.env.SIB_API_KEY);

const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

sendSmtpEmail.subject = 'My subject';
sendSmtpEmail.htmlContent =
  '<html><body><h1>This is my first transactional email </h1></body></html>';
sendSmtpEmail.sender = {
  name: 'SIN FRONTERAS',
  email: 'sinfronteras.sucre@gmail.com',
}; //remitente
sendSmtpEmail.to = [
  { email: 'santillanreynaarielangel@gmail.com', name: 'Ariel0' },
]; //para(destinatario)
// sendSmtpEmail.cc = [{ email: 'example2@example2.com', name: 'Janice Doe' }];
// sendSmtpEmail.bcc = [{ email: 'John Doe', name: 'example@example.com' }];
sendSmtpEmail.replyTo = {
  email: 'sinfronteras.sucre@gmail.com',
  name: 'SIN FRONTERAS',
}; //email from responses
// sendSmtpEmail.headers = { 'Some-Custom-Name': 'unique-id-1234' };
// sendSmtpEmail.params = { parameter: 'My param value', subject: 'New Subject' };

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
