import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

// import { TravelExpenses } from './../Travels/TravelExpenses/TravelExpenses';
export let handleClose;
export const DialogBasic = ({
  primaryBtnText = 'Abrir Dialog',
  disabledBtn = false, //controla si el boton esta "desactivado" o no
  componentView = <></>, // <TravelExpenses />
  redirectPage = './',
}) => {
  //ruterar:
  // const history = useHistory();
  // history.push('/acceso');

  const [openDialogBasic, setOpenDialogBasic] = useState(false);

  const handleClickOpen = () => {
    setOpenDialogBasic(true);
    console.log('abierto');
  };

  handleClose = () => {
    setOpenDialogBasic(false);
    console.log('cerrado');
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        disabled={disabledBtn}
        onClick={handleClickOpen}
      >
        {primaryBtnText}
      </Button>

      <Dialog onClose={handleClose} open={openDialogBasic}>
        {componentView ? componentView : null}
      </Dialog>
    </>
  );
};
