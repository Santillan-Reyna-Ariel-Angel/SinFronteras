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

let dateOutOfRange_TodayAndMaxDate = ({ inputDate, maxDateFullYMDInt }) => {
  // maxDateFullYMDInt = 20451231; // => maxDate={new Date('2046-01-01')} - 1(dia)  que establezcamos en el <DatePicker ... />

  //isNaN(inputDate) => para que en cada change NO guarde NaN/NaN/NaN en travelDate
  let isErrorDate =
    inputDate === null || inputDate === '' || isNaN(inputDate) ? true : false;

  let dateOutOfRange;

  if (isErrorDate) {
    return true;
  } else {
    //Recuperar dia, mes y año por separado
    let toDayAux = formatDate(new Date()).split('/');
    let selectedDateAux = isErrorDate
      ? [0, 0, 0] //ESTO ES INNECESARIO YA QUE SE COMPROBO anteriormente "isErrorDate"
      : formatDate(inputDate).split('/');
    //Invertir a: año, mes y dia para formar un numero que aumente su valor cada dia(no repetible)
    let toDay = parseInt(toDayAux[2] + toDayAux[1] + toDayAux[0]);
    let selectedDate = parseInt(
      selectedDateAux[2] + selectedDateAux[1] + selectedDateAux[0]
    );
    //Comparar si la fecha ingresada es menor:
    dateOutOfRange = selectedDate < toDay || selectedDate > maxDateFullYMDInt;
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
    let dateOutOfRange = dateOutOfRange_TodayAndMaxDate({
      inputDate,
      maxDateFullYMDInt: 20451231,
    }); // maxDateFullYMDInt = 20451231; // => maxDate={new Date('2046-01-01')} - 1(dia)  que establezcamos en el <DatePicker ... />

    setTravelData({
      ...travelData,
      travelDate: dateOutOfRange ? '' : formatDate(inputDate),
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
