import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
//MUI:
import Button from '@mui/material/Button';
//Components:
import { TicketsSold } from '../TicketsSold.jsx';

const ReactToPrintComponent = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        documentTitle="Sin Fronteras - Boletos de Viaje"
        trigger={() => (
          <Button variant="contained" color="success">
            Mostrar Component
          </Button>
        )}
        content={() => componentRef.current}
      />

      <TicketsSold ref={componentRef} />
    </div>
  );
};

export { ReactToPrintComponent };
