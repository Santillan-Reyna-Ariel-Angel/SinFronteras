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
//States:
//Components:
//Others:

const uuid = () => {
  return Math.random().toString(16).slice(2);
};
let llave = uuid();
// console.log('llave', llave);

export const BranchRegistration = () => {
  const departments = [
    'Beni',
    'Chuquisaca',
    'Cochabamba',
    'La Paz',
    'Oruro',
    'Pando',
    'Potosí',
    'Santa Cruz',
    'Tarija',
  ];

  console.log('llave', llave);
  // let llave = 'keyDesknow';

  const defaultBranchData = {
    department: '',
    locality: '',
    terminal: '',
    address: '',
    branchName: '',
    branchNumber: '',
    checkInTime: '08:00',
    departureTime: '18:30',
    destinations: {
      [llave]: {
        destinationDepartment: '',
        destinationLocation: '',
        prices: {
          leito: {
            maximumPrice: 0,
            minimalPrice: 0,
            seatType: '',
            typeOfBus: 'leito',
          },
          normal: {
            maximumPrice: 0,
            minimalPrice: 0,
            seatType: '',
            typeOfBus: 'normal',
          },
        },
      },
    },
  };

  const [branchData, setBranchData] = useState(defaultBranchData);
  console.log('branchData', branchData);

  const [checkInTime, setCheckInTime] = useState(
    new Date('2022-12-16T08:00:00')
  );
  const [departureTime, setDepartureTime] = useState(
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

  // const typeOfSeats = ['semi-cama', 'cama'];

  // const seatType = (event) => {
  //   let aux = branchData.destinations[0];
  //   aux.prices.normal.seatType = event.target.value;
  //   console.log('aux', aux);

  //   // setBranchData({
  //   //   ...branchData,
  //   //   // destinations: [
  //   //   //   // ...branchData.destinations,
  //   //   //   {
  //   //   //     ...branchData.destinations[0],
  //   //   //     prices: {
  //   //   //       leito: {
  //   //   //         ...branchData.destinations[0].prices.leito,
  //   //   //       },
  //   //   //       normal: {
  //   //   //         ...branchData.destinations[0].prices.normal,
  //   //   //         seatType: event.target.value,
  //   //   //       },
  //   //   //     },
  //   //   //   },
  //   //   // ],
  //   // });

  //   setBranchData({
  //     ...branchData,
  //     destinations: [
  //       ...branchData.destinations,
  //       (branchData.destinations[0] = aux),
  //     ],
  //   });
  // };

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
            label="Hora de Entrada"
            value={checkInTime}
            ampm={false}
            onChange={(newTime) => {
              setCheckInTime(newTime);
              setBranchData({
                ...branchData,
                checkInTime: timeFormat(newTime),
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Hora de Salida"
            value={departureTime}
            ampm={false}
            onChange={(newTime) => {
              setDepartureTime(newTime);
              setBranchData({
                ...branchData,
                departureTime: timeFormat(newTime),
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <span>Añadir Destinos (+):</span>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
          <Select
            value={branchData.destinations[llave].destinationDepartment}
            name="destinationDepartment"
            onChange={(event) =>
              setBranchData({
                ...branchData,
                destinations: {
                  [llave]: {
                    ...branchData.destinations[llave],
                    destinationDepartment: event.target.value,
                  },
                },
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
          name="destinationLocation"
          label="Localidad"
          variant="outlined"
          value={branchData.destinations[llave].destinationLocation}
          onChange={(event) =>
            setBranchData({
              ...branchData,
              destinations: {
                [llave]: {
                  ...branchData.destinations[llave],
                  destinationLocation: event.target.value,
                },
              },
            })
          }
        />

        {/* <span>Añadir precios:</span> */}
        {/* <span>Bus normal:</span> */}
        {/* <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo de Asiento</InputLabel>
          <Select value={''} name="seatType" onChange={seatType}>
            {typeOfSeats.map((typeSeat, index) => (
              <MenuItem key={index} value={typeSeat}>
                {typeSeat}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
      </Box>
    </>
  );
};
