import React, { useState, useContext } from 'react';

//MUI:
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from '@mui/material/';
// Manejo de fechas:
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  LocalizationProvider,
  TimePicker,
  DatePicker,
} from '@mui/x-date-pickers/';

//Styles:
//Contexts:
import { ContextBranchOffice } from './../../../contexts/ContextBranchOffice';
import { ContextCompanyBuses } from './../../../contexts/ContextCompanyBuses';

//Firebase Functions:
//States:
//Components:
// import { PlainModalButton } from './../PlainModalButton/PlainModalButton';
//Others:
import {
  dateFormat,
  timeFormat,
  isDateOutOfRange,
} from './../Functions/functions';

const DatePicker_maxDate = new Date('2046-01-01'); // new Date('yyyy-mm-dd') - 1(dia), es la fecha que se establecera en el <DatePicker ... />
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

export const TravelRegistration = () => {
  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  const {
    branchInformation: { branchNumber, department, location },
  } = branchOffice
    ? branchOffice
    : { branchInformation: { branchNumber: '', department: '', location: '' } };
  // console.log('department', department);

  //ContextCompanyBuses:
  const companyBuses = useContext(ContextCompanyBuses);
  // console.log('companyBuses: ', companyBuses);

  // json to array:
  let companyBusesArray = [];
  for (let i in companyBuses) companyBusesArray.push(companyBuses[i]);
  // console.log('companyBusesArray', companyBusesArray);

  const travelsDataDefaul = {
    bus: {
      enrollment: 'bus-006',
      filing: 'H',
      identificationNumberDriver: '',
      key: 'bus-006',
      numberOfFloors: 1,
      numberOfSeats: 29,
      services: {
        bathroom: true,
        drinks: false,
        tv: true,
      },
      status: 'activo',
      typeOfBus: 'leito',
      typeOfSeats: 'cama',
    },
    departureTime: '20:30',
    destinationLocation: '', //c. santa cruz
    lane: '0',
    localityOfOrigin: '', //sucre
    travelDate: '', //31/10/2022
    travelStatus: false,
    //extraData
    departmentOfOrigin: department === undefined ? '' : department,
    destinationDepartment: '',
    busEnrollment: '',
  };

  const [travelData, setTravelData] = useState(travelsDataDefaul);
  console.log('travelData', travelData);

  const [travelDate, setTravelDate] = useState(null); //new Date()

  const [departureTime, setDepartureTime] = useState(
    new Date('2022-12-16T20:30:00')
  );

  const changeDate = (inputDate) => {
    let dateOutOfRange = isDateOutOfRange({
      startDate: dateFormat({
        date: new Date(),
        format: 'yyyy/mm/dd',
      }),
      inputDate,
      endDate: dateFormat({
        date: DatePicker_maxDate,
        format: 'yyyy/mm/dd',
      }),
    });

    setTravelData({
      ...travelData,
      travelDate: dateOutOfRange
        ? ''
        : dateFormat({ date: inputDate, format: 'dd/mm/yyyy' }),
    });
  };

  let busEnrollments = companyBusesArray
    .filter(
      (bus) => bus.status === 'activo' && bus.designatedBranch === branchNumber
    )
    .map((bus) => bus.enrollment);
  console.log('busEnrollments', busEnrollments);
  return (
    <>
      {/* <TextField
        className="input"
        name="localityOfOrigin"
        label="Generic"
        variant="outlined"
        value={'generic'} //travelData.localityOfOrigin
        onChange={(event) =>
          setTravelData({
            ...travelData,
            [event.target.name]: event.target.value,
          })
        }
      /> */}

      {/* Departamento origen: */}
      <FormControl className="input">
        <InputLabel>Departamento origen</InputLabel>
        <Select
          value={travelData.departmentOfOrigin}
          name="departmentOfOrigin"
          onChange={(event) =>
            setTravelData({
              ...travelData,
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

      {/* Localidad origen: */}
      <TextField
        className="input"
        name="localityOfOrigin"
        label="Localidad origen"
        variant="outlined"
        value={travelData.localityOfOrigin}
        // disabled
        onChange={(event) =>
          setTravelData({
            ...travelData,
            [event.target.name]: event.target.value,
          })
        }
      />

      {/* Fecha viaje */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          name="travelDate"
          label="F. de viaje(dia/mes/año)"
          minDate={new Date()}
          maxDate={DatePicker_maxDate} // new Date('yyyy-mm-dd') - 1(dia), es la fecha que se establecera en el <DatePicker ... />
          inputFormat="dd/MM/yyyy" //IMPORTANTE formato de fecha
          //   onError={() => console.log('error')} //solo se ejecuta en ciertas partes al escribir la fecha
          //   onAccept={() => {}} //Funciona Solo si se usa la ventana emergente
          value={travelDate}
          onChange={(newDate) => [setTravelDate(newDate), changeDate(newDate)]}
          renderInput={(params) => (
            <TextField
              className="input"
              {...params}
              helperText={'Ej. 21/09/2022'} //Texto de ayuda (debajo del input)
            />
          )}
        />
      </LocalizationProvider>

      {/* Hora de viaje:  */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label="Hora de viaje"
          value={departureTime}
          ampm={false}
          onChange={(newTime) => {
            setDepartureTime(newTime);
            setTravelData({
              ...travelData,
              departureTime: timeFormat(newTime),
            });
          }}
          renderInput={(params) => <TextField {...params} className="input" />}
        />
      </LocalizationProvider>

      {/* Departamento destino: */}
      <FormControl className="input">
        <InputLabel>Departamento destino</InputLabel>
        <Select
          value={travelData.destinationDepartment}
          name="destinationDepartment"
          onChange={(event) =>
            setTravelData({
              ...travelData,
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

      {/* Localidad origen: */}
      <TextField
        className="input"
        name="destinationLocation"
        label="Localidad destino"
        variant="outlined"
        value={travelData.destinationLocation}
        // disabled
        onChange={(event) =>
          setTravelData({
            ...travelData,
            [event.target.name]: event.target.value,
          })
        }
      />

      {/* Placa bus: */}
      <FormControl className="input">
        <InputLabel>Placa bus</InputLabel>
        <Select
          value={travelData.busEnrollment}
          name="busEnrollment"
          onChange={(event) =>
            setTravelData({
              ...travelData,
              [event.target.name]: event.target.value,
            })
          }
        >
          {busEnrollments.map((enrollment, index) => (
            <MenuItem key={index} value={enrollment}>
              {enrollment}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
