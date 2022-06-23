import React from 'react';
//Css:
import Button from '@mui/material/Button';
import { SendGridSendEmail } from './SendGridSendEmail.js';

const SendEmail3 = () => {
  const sendEmailWithSendGrid = () => {
    SendGridSendEmail();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        onClick={() => sendEmailWithSendGrid()}
      >
        send email with sendgrid Goo
      </Button>
    </div>
  );
};

export { SendEmail3 };
