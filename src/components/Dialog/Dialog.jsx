import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog() {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseYes = () => {
    setOpen(false);
    history.push("/acceso");
  };

  const handleCloseBack = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Salir
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseBack}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Realmente desea cerrar sesion?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Verifique que no tenga tareas pendientes
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseBack}>
            Atras
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleCloseYes}
            autoFocus
          >
            Cerrar sesion
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
