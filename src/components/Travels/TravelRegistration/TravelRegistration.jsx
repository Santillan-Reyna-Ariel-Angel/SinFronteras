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

// let date = new Date();
const formatDate = (date) => {
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let formatDateAux = `${day}/${month}/${date.getFullYear()}`;
  return formatDateAux;
};

const formatTime = (date) => {
  let hour = date.getHours();
  let minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  let formatTimeAux = `${hour}:${minute}`;
  return formatTimeAux;
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

  const changeDate = (date) => {
    //isNaN(date) => para que en cada change NO guarde NaN/NaN/NaN en travelDate
    let isErrorDate =
      date === null || date === '' || isNaN(date) ? true : false;

    let toDay = parseInt(formatDate(new Date()));
    let selectedDate = isErrorDate ? 0 : parseInt(formatDate(date));
    let lastDate = selectedDate < toDay; //Tambien comparar la longuitud, por que acepta apartir de 20/10/2 y se coloca en el estado

    setTravelData({
      ...travelData,
      travelDate:
        isErrorDate === true || lastDate === true ? '' : formatDate(date),
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
          maxDate={new Date('2046-01-01')}
          inputFormat="dd/MM/yyyy" //IMPORTANTE formato de fecha
          //   onError={() => console.log('error')} //REVISAR PARA NO GUARDAR FECHAS PASADAS
          //   onAccept={() => {}} //Funciona Solo si se usa la ventana emergente
          value={travelDate}
          onChange={(newDate) => [setTravelDate(newDate), changeDate(newDate)]}
          renderInput={(params) => (
            <TextField
              className="input"
              {...params}
              helperText={'Ej. 01/09/2022'} //Texto de ayuda (debajo del input)
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
};
