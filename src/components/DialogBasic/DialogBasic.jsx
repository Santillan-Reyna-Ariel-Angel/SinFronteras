import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

// import { TravelExpenses } from './../Travels/TravelExpenses/TravelExpenses';

export const DialogBasic = ({
  primaryBtnText = 'Abrir Dialog',
  componentView = <></>, // <TravelExpenses />
  redirectPage = './',
}) => {
  //ruterar:
  // const history = useHistory();
  // history.push('/acceso');

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log('abierto');
  };

  const handleClose = () => {
    setOpen(false);
    console.log('cerrado');
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        {primaryBtnText}
      </Button>

      <Dialog onClose={handleClose} open={open}>
        {componentView ? componentView : null}
      </Dialog>
    </div>
  );
};
