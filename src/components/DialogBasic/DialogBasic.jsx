import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import { TravelExpenses } from './../Travels/TravelExpenses/TravelExpenses';

const DialogInterface = (props) => {
  const { onClose, open, componentView } = props;

  const handleClose = () => {
    onClose();
    console.log('DialogInterface-handleClose');
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        {componentView ? componentView : null}
      </Dialog>
    </>
  );
};

export const DialogBasic = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <DialogInterface
        open={open}
        onClose={handleClose}
        componentView={<TravelExpenses />}
      />
    </div>
  );
};
