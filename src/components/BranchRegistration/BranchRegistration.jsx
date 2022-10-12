import React, { useState } from 'react';
//MUI:
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from '@mui/material/';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers/';

//Styles:
//Contexts:
//Firebase Functions:
import { createBranch } from './Firebase/createBranch';
//States:
//Components:
import { PlainModalButton } from './../PlainModalButton/PlainModalButton';
//Others:

export const BranchRegistration = () => {
  const departments = [
    'beni',
    'chuquisaca',
    'cochabamba',
    'la paz',
    'oruro',
    'pando',
    'potosi',
    'santa cruz',
    'tarija',
  ];

  const defaultBranchData = {
    department: '',
    locality: '',
    terminal: '',
    address: '',
    branchName: '',
    branchNumber: '',
    attentionSchedule: {
      openingTime: '08:00',
      closingTime: '18:30',
    },
    branchContactNumbers: {
      telephone: '',
      cellphone: '',
    },
  };

  //State General:
  const [branchData, setBranchData] = useState(defaultBranchData);
  console.log('branchData', branchData);

  const [openingTime, setOpeningTime] = useState(
    new Date('2022-12-16T08:00:00')
  );
  const [closingTime, setClosingTime] = useState(
    new Date('2022-12-16T18:30:00')
  );

  const timeFormat = (newTime) => {
    //Otra opcion con segundos seria: newTime.toLocaleTimeString()
    let hour =
      newTime.getHours() < 10 ? `0${newTime.getHours()}` : newTime.getHours();
    let minute =
      newTime.getMinutes() < 10
        ? `0${newTime.getMinutes()}`
        : newTime.getMinutes();

    return `${hour}:${minute}`;
  };

  // componentDefaultData
  const componentDefaultData = () => {
    setBranchData(defaultBranchData);
    setOpeningTime(new Date('2022-12-16T08:00:00'));
    setClosingTime(new Date('2022-12-16T18:30:00'));
  };

  return (
    <>
      <Box sx={{ width: 170 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
          <Select
            value={branchData.department}
            name="department"
            onChange={(event) =>
              setBranchData({
                ...branchData,
                [event.target.name]: event.target.value,
              })
            }
          >
            {departments.map((department, index) => (
              <MenuItem key={index} value={department}>
                {department}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="locality"
          label="Localidad"
          variant="outlined"
          value={branchData.locality}
          onChange={(event) =>
            setBranchData({
              ...branchData,
              [event.target.name]: event.target.value,
            })
          }
        />
        <TextField
          name="terminal"
          label="Terminal"
          variant="outlined"
          value={branchData.terminal}
          onChange={(event) =>
            setBranchData({
              ...branchData,
              [event.target.name]: event.target.value,
            })
          }
        />
        <TextField
          name="address"
          label="Direccion"
          variant="outlined"
          value={branchData.address}
          onChange={(event) =>
            setBranchData({
              ...branchData,
              [event.target.name]: event.target.value,
            })
          }
        />
        <TextField
          name="branchName"
          label="Sucursal"
          variant="outlined"
          value={branchData.branchName}
          onChange={(event) =>
            setBranchData({
              ...branchData,
              [event.target.name]: event.target.value,
            })
          }
        />
        <TextField
          name="branchNumber"
          label="Num/Cod Sucursal"
          variant="outlined"
          value={branchData.branchNumber}
          onChange={(event) =>
            setBranchData({
              ...branchData,
              [event.target.name]: event.target.value,
            })
          }
        />
        <span>Horarios de Atencion:</span>
        <br />
        <span>Lunes a Domingo:</span>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Hora de Apertura"
            value={openingTime}
            ampm={false}
            onChange={(newTime) => {
              setOpeningTime(newTime);
              setBranchData({
                ...branchData,
                attentionSchedule: {
                  ...branchData.attentionSchedule,
                  openingTime: timeFormat(newTime),
                },
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Hora de Cierre"
            value={closingTime}
            ampm={false}
            onChange={(newTime) => {
              setClosingTime(newTime);
              setBranchData({
                ...branchData,
                attentionSchedule: {
                  ...branchData.attentionSchedule,
                  closingTime: timeFormat(newTime),
                },
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <span>Numeros de contacto:</span>
        <TextField
          name="telephone"
          label="Telefono"
          variant="outlined"
          value={branchData.branchContactNumbers.telephone}
          onChange={(event) =>
            setBranchData({
              ...branchData,
              branchContactNumbers: {
                ...branchData.branchContactNumbers,
                [event.target.name]: event.target.value,
              },
            })
          }
        />

        <TextField
          name="cellphone"
          label="Celular"
          variant="outlined"
          value={branchData.branchContactNumbers.cellphone}
          type="number"
          onChange={(event) =>
            setBranchData({
              ...branchData,
              branchContactNumbers: {
                ...branchData.branchContactNumbers,
                [event.target.name]: parseInt(event.target.value),
              },
            })
          }
        />

        <PlainModalButton
          primaryBtnText="Registrar"
          dialogTitle="Registro de suculsales"
          dialogText="Esta seguro de registrar esta sucursal?"
          closeBtnText="cancelar"
          continueBtnText="si"
          // redirectPage="./"
          functionToExecute={createBranch}
          functionParameters={branchData}
          secondFunctionToExecute={() => {}} //For data type bolean
          thirdFunctionToExecute={componentDefaultData}
        />
      </Box>
    </>
  );
};
