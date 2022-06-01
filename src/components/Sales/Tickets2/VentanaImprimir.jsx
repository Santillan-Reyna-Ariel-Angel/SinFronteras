import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import Button from '@mui/material/Button';

//importando componete ticket
import { Tickets2 } from './Tickets2';

const VentanaImprimir = () => {
  const [openDialog, setOpenDialog] = useState(false);
  console.log('openDialog', openDialog);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  return (
    <>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Imprimir
      </Button>
      {openDialog === true ? (
        <>
          <PDFViewer>
            <Tickets2 />
          </PDFViewer>
        </>
      ) : null}
    </>
  );
};

export { VentanaImprimir };
