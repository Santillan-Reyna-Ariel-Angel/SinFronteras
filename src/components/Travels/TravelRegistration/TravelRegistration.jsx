import React, { useState } from 'react';

//MUI:
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from '@mui/material/';
// Manejo de fechas:
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers/';

//Styles:
//Contexts:
//Firebase Functions:
//States:
//Components:
// import { PlainModalButton } from './../PlainModalButton/PlainModalButton';
//Others:
const DatePicker_maxDate = new Date('2046-01-01'); // new Date('yyyy-mm-dd') - 1(dia), es la fecha que se establecera en el <DatePicker ... />

// let date = new Date();
const formatDate = ({ date, format = 'dd/mm/yyyy' }) => {
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  let formatDateAux;
  if (format === 'dd/mm/yyyy' || format === '') {
    formatDateAux = `${day}/${month}/${date.getFullYear()}`;
  } else {
    // format === 'yyyy/mm/dd'
    formatDateAux = `${date.getFullYear()}/${month}/${day}`;
  }
  return formatDateAux;
};

const formatTime = (date) => {
  let hour = date.getHours();
  let minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  let formatTimeAux = `${hour}:${minute}`;
  return formatTimeAux;
};

const isDateOutOfRange = ({ inputDate, startDate, endDate }) => {
  //isNaN(inputDate) => para que en cada change NO guarde NaN/NaN/NaN en travelDate
  let isErrorDate =
    inputDate === null || inputDate === '' || isNaN(inputDate) ? true : false;

  let dateOutOfRange;

  if (isErrorDate) {
    dateOutOfRange = true;
    console.log('dateOutOfRange', dateOutOfRange);
    return dateOutOfRange;
  } else {
    //Recuperar año, mes y dia.
    let selectedDate = formatDate({
      date: inputDate,
      format: 'yyyy/mm/dd',
    });
    //Eliminar las "/" y convertir la fecha a un entero:
    let startDateInt = parseInt(startDate.replaceAll('/', ''));
    let selectedDateInt = parseInt(selectedDate.replaceAll('/', ''));
    let endDateInt = parseInt(endDate.replaceAll('/', ''));
    //Comparar si la fecha ingresada es menor:
    dateOutOfRange =
      selectedDateInt < startDateInt || selectedDateInt > endDateInt;
    console.log('dateOutOfRange', dateOutOfRange);
    return dateOutOfRange;
  }
};

export const TravelRegistration = () => {
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
    departureTime: '', //21:30
    destinationLocation: '', //c. santa cruz
    lane: '0',
    localityOfOrigin: 'dataDefault', //sucre
    travelDate: '', //31/10/2022
    travelStatus: false,
    //extraData
    departmentOfOrigin: 'dataDefault',
  };

  const [travelData, setTravelData] = useState(travelsDataDefaul);
  console.log('travelData', travelData);

  const [travelDate, setTravelDate] = useState(null); //new Date()

  const changeDate = (inputDate) => {
    let dateOutOfRange = isDateOutOfRange({
      startDate: formatDate({
        date: new Date(),
        format: 'yyyy/mm/dd',
      }),
      inputDate,
      endDate: formatDate({
        date: DatePicker_maxDate,
        format: 'yyyy/mm/dd',
      }),
    });

    setTravelData({
      ...travelData,
      travelDate: dateOutOfRange
        ? ''
        : formatDate({ date: inputDate, format: 'dd/mm/yyyy' }),
    });
  };

  return (
    <>
      <TextField
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
      />

      <TextField
        className="input"
        name="departmentOfOrigin"
        label="Departamento origen"
        variant="outlined"
        value={travelData.departmentOfOrigin}
        disabled
      />

      <TextField
        className="input"
        name="localityOfOrigin"
        label="Localidad origen"
        variant="outlined"
        value={travelData.localityOfOrigin}
        disabled
      />

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
    </>
  );
};
