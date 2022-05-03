import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const BillingRecord = ({ rowsState }) => {
  let CiOrNit = rowsState.map((passenger) => {
    return passenger.identificationNumber;
  });
  const [newCiOrNit, setNewCiOrNit] = useState('');

  const handleInputChange = (event) => {
    setNewCiOrNit(event.target.value);
  };

  //inputNameOrSocialReason:
  let fullNameAux = rowsState.map((passenger) => {
    if (passenger.identificationNumber === newCiOrNit) {
      return `${passenger.lastName} ${passenger.firstName}`;
    } else {
      return 'vacio';
    }
  });
  let fullName = fullNameAux.filter((passenger) => passenger !== 'vacio');

  const [newFullName, setNewFullName] = useState('');

  const nameOrSocialReason = (event) => {
    setNewFullName(event.target.value);
  };
  return (
    <>
      <Autocomplete
        value={newCiOrNit}
        onChange={(event, newValue) => {
          setNewCiOrNit(newValue);
        }}
        id="inputCiOrNit"
        options={CiOrNit}
        renderInput={(params) => (
          <TextField
            className="input"
            {...params}
            label="CI/NIT:"
            variant="outlined"
            onChange={handleInputChange}
          />
        )}
      />

      <Autocomplete
        value={newFullName}
        onChange={(event, newValue) => {
          setNewFullName(newValue);
        }}
        id="inputNameOrSocialReason"
        options={fullName}
        renderInput={(params) => (
          <TextField
            className="input"
            {...params}
            label="Nombre/Razon social:"
            variant="outlined"
            onChange={nameOrSocialReason}
          />
        )}
      />
    </>
  );
};

export { BillingRecord };
