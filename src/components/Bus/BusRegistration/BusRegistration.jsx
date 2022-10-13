import React, { useState } from 'react';
// MUI:
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  //numberOfFloors:
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  //Services:
  FormGroup,
  Checkbox,
} from '@mui/material';

//Styles:
//Contexts:
//Firebase Functions:
import { createBus } from './../Firebase/createBus';
//States:
//Components:
import { PlainModalButton } from './../../PlainModalButton/PlainModalButton';
//Others:

export const BusRegistration = () => {
  let companyBusDefaultData = {
    enrollment: '', //bus-001
    filing: '', //"H"
    identificationNumberDriver: '',
    numberOfFloors: 1,
    numberOfSeats: 0, //multiplo de 3(1 piso) y 4 (2 pisos)
    services: {
      bathroom: true,
      drinks: false,
      tv: true,
    },
    status: '', // activo
    typeOfBus: '', // normal
    typeOfSeats: '', //semi-cama
  };

  const [busData, setBusData] = useState(companyBusDefaultData);
  console.log('busData: ', busData);

  const departmentsList = [
    '(B) beni',
    '(C) cochabamba',
    '(H) chuquisaca',
    '(L) la paz',
    '(N) pando',
    '(O) oruro',
    '(P) potosi',
    '(S) santa cruz',
    '(T) tarija',
  ];

  const typeOfBus = ['normal', 'leito'];

  const statusList = ['activo', 'inactivo', 'en mantenimiento'];

  const typeOfSeatsList = ['normal', 'semi-cama', 'cama'];

  const changeServiceStatus = (event) => {
    setBusData({
      ...busData,
      services: {
        ...busData.services,
        [event.target.name]: event.target.checked,
      },
    });
  };

  const componentDefaultData = () => {
    setBusData(companyBusDefaultData);
  };
  return (
    <>
      <Box sx={{ width: 170 }}>
        {/* Matricula: */}
        <TextField
          name="enrollment"
          label="Matricula"
          variant="outlined"
          value={busData.enrollment}
          onChange={(event) =>
            setBusData({
              ...busData,
              [event.target.name]: event.target.value,
            })
          }
        />

        {/* Radicatoria: */}
        <FormControl fullWidth>
          <InputLabel>Radicatoria</InputLabel>
          <Select
            value={busData.filing}
            name="filing"
            onChange={(event) =>
              setBusData({
                ...busData,
                [event.target.name]: event.target.value,
              })
            }
          >
            {departmentsList.map((department, index) => (
              <MenuItem key={index} value={department}>
                {department}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Tipo de bus: */}
        <FormControl fullWidth>
          <InputLabel>Tipo de bus</InputLabel>
          <Select
            value={busData.typeOfBus}
            name="typeOfBus"
            onChange={(event) =>
              setBusData({
                ...busData,
                [event.target.name]: event.target.value,
              })
            }
          >
            {typeOfBus.map((bus, index) => (
              <MenuItem key={index} value={bus}>
                {bus}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Tipo de Asientos: */}
        <FormControl fullWidth>
          <InputLabel>Tipo de Asientos</InputLabel>
          <Select
            value={busData.typeOfSeats}
            name="typeOfSeats"
            onChange={(event) =>
              setBusData({
                ...busData,
                [event.target.name]: event.target.value,
              })
            }
          >
            {typeOfSeatsList.map((typeOfSeat, index) => (
              <MenuItem key={index} value={typeOfSeat}>
                {typeOfSeat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Cant. de Asientos: */}
        <TextField
          name="numberOfSeats"
          label="Cantidad de asientos"
          variant="outlined"
          value={busData.numberOfSeats}
          type="number"
          onChange={(event) =>
            setBusData({
              ...busData,
              [event.target.name]: parseInt(event.target.value),
            })
          }
        />

        {/* Cant pisos: */}
        <FormControl>
          <FormLabel>Pisos:</FormLabel>
          <RadioGroup
            row={true}
            value={busData.numberOfFloors}
            onChange={(event) => {
              setBusData({
                ...busData,
                numberOfFloors: parseInt(event.target.value),
              });
            }}
          >
            <FormControlLabel
              value={1}
              control={<Radio size="small" />}
              label="Unico"
            />
            <FormControlLabel
              value={2}
              control={<Radio size="small" />}
              label="Doble"
            />
          </RadioGroup>
        </FormControl>

        {/* Servicios: */}
        <FormControl sx={{ m: 0 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Servicios: </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={busData.services.bathroom}
                  onChange={changeServiceStatus}
                  name="bathroom"
                />
              }
              label="Baño"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={busData.services.tv}
                  onChange={changeServiceStatus}
                  name="tv"
                />
              }
              label="Tv"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={busData.services.drinks}
                  onChange={changeServiceStatus}
                  name="drinks"
                />
              }
              label="Bebidas"
            />
          </FormGroup>
        </FormControl>

        {/* Chofer: */}
        <TextField
          name="identificationNumberDriver"
          label="Ci Chofer"
          variant="outlined"
          value={busData.identificationNumberDriver}
          type="number"
          onChange={(event) =>
            setBusData({
              ...busData,
              [event.target.name]: parseInt(event.target.value),
            })
          }
        />

        {/* Estado: */}
        <FormControl fullWidth>
          <InputLabel>Estado</InputLabel>
          <Select
            value={busData.status}
            name="status"
            onChange={(event) =>
              setBusData({
                ...busData,
                [event.target.name]: event.target.value,
              })
            }
          >
            {statusList.map((status, index) => (
              <MenuItem key={index} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <PlainModalButton
          primaryBtnText="Registrar"
          dialogTitle="Registro de Buses"
          dialogText="Esta seguro de registrar este Bus?"
          closeBtnText="cancelar"
          continueBtnText="si"
          functionToExecute={createBus}
          functionParameters={busData}
          thirdFunctionToExecute={componentDefaultData}
        />
      </Box>
    </>
  );
};
