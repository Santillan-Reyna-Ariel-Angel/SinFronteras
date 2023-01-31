import React, { useState, useContext, useEffect } from 'react';
//MUI:
import { TextField, Autocomplete } from '@mui/material/';
// manejo de fechas:
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers/';
// idioma del calentario:
import { es } from 'date-fns/locale';

//Styles:
import {
  Background,
  Container,
  InputOrigin,
  InputDestination,
  InputDate,
  // ButtonSearch,
} from './TravelSearchStyles';
//Contexts:
import { ContextBranchOffice } from '../../../contexts/ContextBranchOffice';
//Components:
import { TravelCards } from './../TravelCards/TravelCards';
//Others:
import { dateFormat } from './functions';

const TravelSearch = () => {
  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  // console.log('branchOfficeInTravelSearch', branchOffice);

  const { branchInformation } = branchOffice
    ? branchOffice
    : { branchInformation: {} };
  let { destinations, location } = branchInformation;
  // console.log("destinations", destinations,"location", location);

  const [origin, setOrigin] = useState(''); //problema (Es necesario actualizar la pagina)
  // console.log(origin, "origin");

  useEffect(() => {
    setOrigin(location);
    // console.log(origin, "<<<---<<");
  }, [setOrigin, origin, location]);

  const originOption = [location];
  // console.log("origin", origin, "originOption", originOption);

  const destinationsArray = destinations
    ? Object.keys(destinations).map((key) => {
        return destinations[key].destinationLocation;
      })
    : [];
  // console.log("destinationsArray", destinationsArray);

  const [destination, setDestination] = useState(
    destinationsArray[0] ? destinationsArray[0] : ''
  );
  // console.log("destination", destination);

  //Fecha de viaje:
  const [travelDate, setTravelDate] = useState(new Date());
  const formattedTravelDate = dateFormat({
    date: travelDate,
    format: 'dd/mm/yyyy',
  }); // esto es mucho mejor que usar: travelDate.toLocaleDateString();

  // console.log('travelDate: ', travelDate);
  console.log('formattedTravelDate: ', formattedTravelDate);

  const changeDate = (inputDate) => {
    let isErrorDate =
      inputDate === null || inputDate === '' || isNaN(inputDate) ? true : false;

    if (isErrorDate === true) {
      setTravelDate(null);
    } else {
      setTravelDate(inputDate);
    }
  };

  //Recuperar TravelCards que coincidan con el origen, destino y fecha de viaje:
  function recoverTravelCards() {
    if (
      origin !== '' &&
      destination !== '' &&
      formattedTravelDate !== '' &&
      origin !== undefined &&
      destination !== undefined &&
      formattedTravelDate !== undefined &&
      origin !== null &&
      destination !== null &&
      formattedTravelDate !== null
    ) {
      return (
        <TravelCards
          travelSearchData={{
            origin,
            destination,
            selectedTravelDate: formattedTravelDate,
          }}
        />
      );
    } else {
      // console.log('ingrese los campos');
      return null;
    }
  }

  return (
    <>
      <Background>
        <Container>
          <InputOrigin>
            {/* <TextField
              id="outlined-basic"
              label="Origen"
              variant="outlined"
              className="input"
              defaultValue={origin}
              value={origin}
            /> */}
            <Autocomplete
              value={origin}
              onChange={(event, newValue) => {
                setOrigin(newValue);
              }}
              id="inputOrigin"
              options={originOption}
              renderInput={(params) => (
                <TextField
                  className="input"
                  {...params}
                  label="Origen"
                  variant="outlined"
                />
              )}
            />
          </InputOrigin>

          <InputDestination>
            <Autocomplete
              value={destination}
              onChange={(event, newValue) => {
                setDestination(newValue);
              }}
              id="inputDestination"
              options={destinationsArray}
              renderInput={(params) => (
                <TextField
                  className="input"
                  {...params}
                  label="Destino"
                  variant="outlined"
                />
              )}
            />
          </InputDestination>
          <InputDate>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
              <DatePicker
                label="Fecha de viaje"
                value={travelDate}
                minDate={new Date()}
                inputFormat="dd/MM/yyyy" //IMPORTANTE formato de fecha
                onChange={(newValue) => {
                  // setTravelDate(newValue);
                  changeDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    className="input"
                    {...params}
                    // helperText={'Ej. 21/09/2022'} //Texto de ayuda (debajo del input)
                  />
                )}
              />
            </LocalizationProvider>
          </InputDate>
        </Container>
      </Background>

      {/* Mostrar travelCards: */}
      {recoverTravelCards()}
    </>
  );
};

export { TravelSearch };
