import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
//MUI:
import Button from '@mui/material/Button';
//Components:
import { TicketsSold } from './TicketsSold.jsx';

export const PrintTicketsSold = ({ ticketDataProps }) => {
  // console.log('***ticketDataProps: ', ticketDataProps);
  let { identificationNumber } = ticketDataProps;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Sin Fronteras - Boletos de Viaje - ${identificationNumber}`,
  });

  return (
    // Nota: si colocamos <div></div> el boton de imprimir se vuelve pequeño
    <>
      <TicketsSold ref={componentRef} ticketDataProps={ticketDataProps} />

      <Button
        variant="contained"
        color="success"
        onClick={() => handlePrint()}
        sx={{ margin: '-8px 8px 18px 8px' }}
      >
        Imprimir Pdf
      </Button>
    </>
  );
};
