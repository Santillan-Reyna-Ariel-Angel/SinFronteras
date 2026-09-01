require('dotenv').config();
console.log('K', process.env.SIB_API_KEY);

var SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
  process.env.SIB_API_KEY;

new SibApiV3Sdk.TransactionalEmailsApi()
  .sendTransacEmail({
    sender: { email: 'sinfronteras.sucre@gmail.com', name: 'SIN FRONTERAS' },
    subject: 'This is my default subject line',
    // templateId: 27,
    // params: {
    //   greeting: 'This is the default greeting',
    //   headline: 'This is the default headline',
    // },
    messageVersions: [
      //Definition for Message Version 1
      {
        to: [
          {
            email: 'santillanreynaarielangel@gmail.com',
            name: 'Ariel0',
          },
          {
            email: 'santillanreynaarielangel1@gmail.com',
            name: 'Ariel1',
          },
        ],
        params: {
          greeting: 'Hello again!',
          headline: 'Take advantage of our summer deals, taylored just for you',
        },
        subject: 'Some deals worth to be looked at!',
      },
      //Definition for Message Version 2
      //   {
      //     ...
      //   },
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
