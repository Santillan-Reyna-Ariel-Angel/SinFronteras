import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// export default function DialogSingOff()
const PlainModalButton = ({
  primaryBtnText = 'Abrir Modal',
  dialogTitle = 'Titulo',
  dialogText = 'Texto',
  closeBtnText = 'cancelar',
  continueBtnText = 'ok',
  redirectPage = './',
  functionToExecute,
  functionParameters,
}) => {
  const history = useHistory();
  const [openDialog, setOpenDialog] = useState(false);
  console.log('openDialog', openDialog);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseYes = () => {
    setOpenDialog(false);
    // sessionStorage.removeItem('userEmail');
    // history.push('/acceso');

    //Escribir codigo para dedirigir a destino
    console.log('Vendido!!!');
    functionToExecute(functionParameters);
  };

  const handleCloseBack = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        {primaryBtnText}
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseBack}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseBack}>
            {closeBtnText}
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleCloseYes}
            autoFocus
          >
            {continueBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { PlainModalButton };
