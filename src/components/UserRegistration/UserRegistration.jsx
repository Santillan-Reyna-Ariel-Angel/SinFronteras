import React from "react";
//MUI
import { TextField } from "@material-ui/core";
//Data picker dialog
import { KeyboardDatePicker } from "@material-ui/pickers";
const UserRegistration = () => {
  return (
    <>
      <p>Registro de ususarios</p>
      <TextField label="Nombres" variant="outlined" />
      <TextField label="Apellidos" variant="outlined" />
      <TextField label="Carnet de identidad" variant="outlined" />
      <TextField label="Domicilio" variant="outlined" />
      <TextField label="Celular" variant="outlined" />
      <TextField label="Correo" variant="outlined" type="email" />
    </>
  );
};

export default UserRegistration;
