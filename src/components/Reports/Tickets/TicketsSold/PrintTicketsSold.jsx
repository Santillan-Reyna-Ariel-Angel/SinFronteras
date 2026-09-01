import React, { useRef, useContext } from 'react';
import { useReactToPrint } from 'react-to-print';
//MUI:
import Button from '@mui/material/Button';
//Components:
import { TicketsSold } from './TicketsSold.jsx';
// Others:
import { handleClose } from './../../../DialogBasic/DialogBasic';
import { rolesAndPermissions } from './../../../rolesAndPermissions.js';
//context:
import { ContextUserData } from './../../../../contexts/ContextUserData.js';

export const PrintTicketsSold = ({ ticketDataProps }) => {
  // console.log('***ticketDataProps: ', ticketDataProps);
  let { identificationNumber } = ticketDataProps;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Sin Fronteras - Boletos de Viaje - ${identificationNumber}`,
  });

  // ContextUserData:
  const userData = useContext(ContextUserData);
  const { charge } = userData ? userData : {};
  // console.log('charge: ', charge);

  let isCanUserPrint = rolesAndPermissions[charge]?.pasajes?.imprimir;
  console.log('isCanUserPrint: ', isCanUserPrint);

  return (
    // Nota: si colocamos <div></div> el boton de imprimir se vuelve pequeño
    <>
      <TicketsSold ref={componentRef} ticketDataProps={ticketDataProps} />

      {isCanUserPrint && (
        <Button
          variant="contained"
          color="success"
          // onClick={() => handlePrint()}
          onClick={() => [handlePrint(), handleClose()]} //Hara que se nos cierre automaticamente el modal de <DialogBasic/> al presionar el boton
          sx={{ margin: '-8px 8px 18px 8px' }}
        >
          Imprimir Pdf
        </Button>
      )}
    </>
  );
};
