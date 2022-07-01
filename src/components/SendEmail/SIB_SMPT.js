//SENDINBLUE SMPT

require('dotenv').config();
console.log('k', process.env.SIB_API_KEY);

// const fetch = require('node-fetch');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const url = 'https://api.sendinblue.com/v3/smtp/email';
const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'api-key': process.env.SIB_API_KEY,
  },
  body: JSON.stringify({
    sender: {
      name: 'SIN FRONTERAS',
      email: 'sinfronteras.sucre@gmail.com',
      //   id: 2,
    },
    to: [{ email: 'santillanreynaarielangel1@gmail.com', name: 'Ariel1' }],
    // bcc: [{ email: 'helen9766@example.com', name: 'Helen' }],
    // cc: [{ email: 'ann6533@example.com', name: 'Ann' }],
    htmlContent:
      '<!DOCTYPE html> <html> <body> <h1>Confirm you email</h1> <p>Please confirm your email address by clicking on the link below</p> </body> </html>',
    textContent:
      'Please confirm your email address by clicking on the link https://text.domain.com',
    subject: 'Login Email confirmation',
    replyTo: { email: 'santillanreynaarielangel@gmail.com', name: 'Ariel0' },
    // attachment: [
    //   {
    //     url: 'https://attachment.domain.com/myAttachmentFromUrl.jpg',
    //     content: 'b3JkZXIucGRm',
    //     name: 'myAttachment.png',
    //   },
    // ],
    // headers: {
    //   'sender.ip': '1.2.3.4',
    //   'X-Mailin-custom': 'some_custom_header',
    //   idempotencyKey: 'abc-123',
    // },
    // templateId: 2,
    // params: { FNAME: 'Joe', LNAME: 'Doe' },
    // messageVersions: [
    //   {
    //     to: [{ email: 'jimmy98@example.com', name: 'Jimmy' }],
    //     params: { FNAME: 'Joe', LNAME: 'Doe' },
    //     bcc: [{ email: 'helen9766@example.com', name: 'Helen' }],
    //     cc: [{ email: 'ann6533@example.com', name: 'Ann' }],
    //     replyTo: { email: 'ann6533@example.com', name: 'Ann' },
    //     subject: 'Login Email confirmation',
    //   },
    // ],
    // tags: ['tag1'],
    // scheduledAt: '2022-04-05T12:30:00+02:00',
    // batchId: '5c6cfa04-eed9-42c2-8b5c-6d470d978e9d',
  }),
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log('OK', json))
  .catch((err) => console.error('error:' + err));
