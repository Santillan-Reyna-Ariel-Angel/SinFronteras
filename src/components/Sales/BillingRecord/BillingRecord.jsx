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

  //Nuevo:
  let cisOrNits = rowsState.map((passenger) => {
    return passenger.identificationNumber;
  });

  let completeNamesAux = rowsState.map((passenger) => {
    if (passenger.identificationNumber === newCiOrNit) {
      return `${passenger.lastName} ${passenger.firstName}`;
    } else {
      return 'vacio';
    }
  });
  let completeNames = completeNamesAux.filter(
    (passenger) => passenger !== 'vacio'
  );

  //revisar: https://mui.com/x/react-data-grid/filtering/#main-content
  // import * as React from 'react';
  // import { DataGrid, GridToolbar } from '@mui/x-data-grid';
  // import { useDemoData } from '@mui/x-data-grid-generator';

  // const VISIBLE_FIELDS = [
  //   'name',
  //   'rating',
  //   'country',
  //   'dateCreated',
  //   'isAdmin',
  // ];

  // export default function BasicExampleDataGrid() {
  //   const { data } = useDemoData({
  //     dataSet: "Employee",
  //     visibleFields: VISIBLE_FIELDS,
  //     rowLength: 100
  //   });
  //   // {value: "ST",code: "ST",label: "Sao Tome and Principe",phone: "239"}
  //   console.log(data.rows[0].country);
  //   return (
  //     <div style={{ height: 400, width: "100%" }}>
  //       <DataGrid {...data} components={{ Toolbar: GridToolbar }} />
  //     </div>
  //   );
  // }

  let countryCodes = ['+591', '+1'];

  const [billingContactInformation, setBillingContactInformation] = useState({
    ciOrNit: '',
    nameOrSocialReason: '',
    email: '',
    countryCode: '',
    mobile: '',
  });
  console.log('billingContactInformation: ', billingContactInformation);

  const handleInputChange2 = (event) => {
    setBillingContactInformation({
      ...billingContactInformation,
      [event.target.name]: event.target.value.toLowerCase(),
    });
  };
  // --------------------------------------------------
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

      {/* Nuevo: */}
      <Autocomplete
        value={billingContactInformation.ciOrNit}
        onChange={(event, newValue) => {
          setBillingContactInformation(newValue);
        }}
        id="ciOrNit"
        options={cisOrNits}
        renderInput={(params) => (
          <TextField
            {...params}
            className="input"
            type="number"
            variant="outlined"
            label="CI/NIT:"
            name="ciOrNit"
            value={billingContactInformation.ciOrNit}
            onChange={handleInputChange2}
          />
        )}
      />
      <Autocomplete
        value={billingContactInformation.nameOrSocialReason}
        onChange={(event, newValue) => {
          setBillingContactInformation(newValue);
        }}
        id="nameOrSocialReason"
        options={completeNames}
        renderInput={(params) => (
          <TextField
            {...params}
            className="input"
            type="text"
            variant="outlined"
            label="Nombre/Rason Social:"
            name="nameOrSocialReason"
            value={billingContactInformation.nameOrSocialReason}
            onChange={handleInputChange2}
          />
        )}
      />
      <TextField
        className="input"
        type="email"
        variant="outlined"
        label="Correo:"
        name="email"
        value={billingContactInformation.email}
        onChange={handleInputChange2}
      />

      <Autocomplete
        value={billingContactInformation.countryCode}
        onChange={(event, newValue) => {
          setBillingContactInformation(newValue);
        }}
        id="countryCode"
        options={countryCodes}
        renderInput={(params) => (
          <TextField
            {...params}
            className="input"
            type="number"
            variant="outlined"
            label="Codigo pais:"
            name="countryCode"
            value={billingContactInformation.countryCode}
            onChange={handleInputChange2}
          />
        )}
      />

      <TextField
        className="input"
        type="number"
        variant="outlined"
        label="Celular:"
        name="mobile"
        value={billingContactInformation.mobile}
        onChange={handleInputChange2}
      />
    </>
  );
};

export { BillingRecord };
