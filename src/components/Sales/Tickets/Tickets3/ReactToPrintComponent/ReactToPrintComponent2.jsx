import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
//MUI:
import Button from '@mui/material/Button';
//Components:
import { Tickets3 } from './../Tickets3.jsx';

const ReactToPrintComponent2 = ({ ticketDataProps }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Sin Fronteras - Boletos de Viaje',
  });

  return (
    <div>
      <Tickets3 ref={componentRef} ticketDataProps={ticketDataProps} />

      <Button variant="contained" color="success" onClick={() => handlePrint()}>
        Imprimir Pdf
      </Button>
    </div>
  );
};
export { ReactToPrintComponent2 };
