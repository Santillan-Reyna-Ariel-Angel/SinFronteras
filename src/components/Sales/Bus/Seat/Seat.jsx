import React, { useState, useContext } from 'react';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import Tooltip from '@mui/material/Tooltip';
//Estilos
import {
  Background,
  Container,
  ContainerTopSeats,
  ContainerCenterSeats,
  ContainerButtomSeats,
  ContainerHall,
} from './SeatStyles';
//check
import Checkbox from '@mui/material/Checkbox';
//form controls
import FormControlLabel from '@mui/material/FormControlLabel';
//Context
import { ContextBranchOffice } from './../../../../contexts/ContextBranchOffice';

//Usado en Check
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

//Algoritmo para generar filas del bus(4-5)
let createSeats = (typeOfBus, numSeat) => {
  let seats = [];
  for (let i = 1; i <= numSeat; i++) {
    if (typeOfBus === 'normal') {
      if (i % 4 === 0) {
        seats.push([i - 3, i - 2, i - 1, i]);
      }
    }
    if (typeOfBus === 'leito') {
      if (i % 3 === 0) {
        seats.push([i - 2, i - 1, i]);
      }
    }
  }

  if (typeOfBus === 'normal') {
    if (numSeat % 4 === 0) {
      return [
        seats.map((x) => x[0]),
        seats.map((x) => x[1]),
        seats.map((x) => x[2]),
        seats.map((x) => x[3]),
      ];
    } else {
      let f = numSeat - seats.length * 4;
      seats.push(
        f === 1
          ? [numSeat, null, null, null]
          : f === 2
          ? [numSeat - 1, numSeat, null, null]
          : [numSeat - 2, numSeat - 1, numSeat, null]
      );
      return [
        seats.map((x) => x[0]),
        seats.map((x) => x[1]),
        seats.map((x) => x[2]),
        seats.map((x) => x[3]),
      ];
    }
  }

  if (typeOfBus === 'leito') {
    if (numSeat % 3 === 0) {
      return [
        seats.map((x) => x[0]),
        seats.map((x) => x[1]),
        seats.map((x) => x[2]),
      ];
    } else {
      let f = numSeat - seats.length * 3;
      seats.push(f < 2 ? [numSeat, null, null] : [numSeat - 1, numSeat, null]);
      return [
        seats.map((x) => x[0]),
        seats.map((x) => x[1]),
        seats.map((x) => x[2]),
      ];
    }
  }
};

const Seat = ({ dataBusTravel }) => {
  //Context
  const branchOffice = useContext(ContextBranchOffice);
  const { branchInformation } = branchOffice
    ? branchOffice
    : { branchInformation: {}, travels: {} };
  const { destinations } = branchInformation;
  //Props
  const {
    bus: { typeOfBus, numberOfSeats, typeOfSeats, numberOfFloors },
    destinationLocation,
  } = dataBusTravel ? dataBusTravel : {};

  const pricesAux = Object.keys(destinations).map((key) => {
    if (destinations[key].destinationLocation === destinationLocation) {
      return destinations[key].prices[typeOfBus];
    } else {
      return {};
    }
  });

  const prices = [];
  pricesAux.forEach(function (elemento, indice, array) {
    if (Object.keys(elemento).length !== 0) {
      prices.push(elemento);
    }
  });
  console.log('Context_prices', prices);

  const busMapData = () => {
    if (prices[0].seatType === typeOfSeats) {
      // console.log('Datos iguales');
      const { minimalPrice, maximumPrice } = prices[0];

      return { minimalPrice, maximumPrice };
    }
  };
  const seatData = busMapData();

  const [checked, setChecked] = useState();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  // console.log('checked', checked);

  const BusMap = (typeOfBusParameter, numberOfSeatsParameter, indice) => {
    return createSeats(typeOfBusParameter, numberOfSeatsParameter)[indice].map(
      (seatNumber, i, arraySeats) => {
        if (seatNumber !== null) {
          return (
            <Tooltip
              key={seatNumber}
              title={
                <>
                  <p>N#: {seatNumber}</p>
                  <p>Tipo: {typeOfSeats}</p>
                  <p>
                    Precio Rango:
                    {` ${seatData.minimalPrice} bs - ${seatData.maximumPrice} bs`}
                  </p>
                  <p>Estado: {true ? 'Libre' : 'Ocupado'}</p>
                </>
              }
              arrow
              placement="top"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    {...label}
                    icon={
                      <EventSeatRoundedIcon
                        // fontSize="small"
                        sx={{ transform: 'rotate(90deg)' }}
                      />
                    }
                    checkedIcon={
                      <EventSeatRoundedIcon
                        // fontSize="small"
                        sx={{ transform: 'rotate(90deg)', color: 'red' }}
                      />
                    }
                    onChange={handleChange}
                    sx={{ margin: '-16px 0px 0px 0px' }}
                  />
                }
                label={seatNumber}
                labelPlacement="top"
                sx={{
                  margin: '0px -12px -10px 0px',
                  backgroundColor: 'white',
                  borderTopRightRadius:
                    i === arraySeats.length - 1 &&
                    ((indice === 2 && typeOfBusParameter === 'leito') ||
                      (indice === 3 && typeOfBusParameter === 'normal'))
                      ? '15px'
                      : '',
                  borderBottomRightRadius:
                    i === arraySeats.length - 1 && indice === 0 ? '15px' : '',
                }}
              />
            </Tooltip>
          );
        } else {
          return null;
        }
      }
    );
  };

  return (
    <>
      <Background>
        <Container>
          {typeOfBus === 'leito' ? (
            <>
              <ContainerTopSeats>
                {BusMap(typeOfBus, numberOfSeats, 2)}
              </ContainerTopSeats>
              <ContainerHall></ContainerHall>
              <ContainerCenterSeats>
                {BusMap(typeOfBus, numberOfSeats, 1)}
              </ContainerCenterSeats>
              <ContainerButtomSeats>
                {BusMap(typeOfBus, numberOfSeats, 0)}
              </ContainerButtomSeats>
            </>
          ) : (
            <>
              <ContainerTopSeats>
                {BusMap(typeOfBus, numberOfSeats, 3)}
              </ContainerTopSeats>
              <ContainerCenterSeats>
                {BusMap(typeOfBus, numberOfSeats, 2)}
              </ContainerCenterSeats>
              <ContainerHall></ContainerHall>
              <ContainerCenterSeats>
                {BusMap(typeOfBus, numberOfSeats, 1)}
              </ContainerCenterSeats>
              <ContainerButtomSeats>
                {BusMap(typeOfBus, numberOfSeats, 0)}
              </ContainerButtomSeats>
            </>
          )}
        </Container>
      </Background>
    </>
  );
};

export default Seat;
