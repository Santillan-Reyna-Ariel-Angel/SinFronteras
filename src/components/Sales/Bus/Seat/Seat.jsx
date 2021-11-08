import React, { useState, useContext } from 'react';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import Tooltip from '@mui/material/Tooltip';
import { Background } from './SeatStyles';
//check
import Checkbox from '@mui/material/Checkbox';
//Context
import { ContextBranchOffice } from './../../../../contexts/ContextBranchOffice';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Seat = ({ dataBusTravel }) => {
  //Context
  const branchOffice = useContext(ContextBranchOffice);
  const { branchInformation, travels } = branchOffice
    ? branchOffice
    : { branchInformation: {}, travels: {} };
  const { destinations } = branchInformation;
  console.log('Context_travels', travels);
  //Props
  const {
    bus: {
      typeOfBus: { seats, busTypeName },
    },
    destinationLocation,
    departureTime,
  } = dataBusTravel ? dataBusTravel : {};
  console.log('Props_dataBusTravel', dataBusTravel);
  const pricesAux = Object.keys(destinations).map((key) => {
    if (destinations[key].destinationLocation === destinationLocation) {
      return destinations[key].prices[busTypeName];
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
  console.log('Algo', prices);

  const seatsData = Object.keys(seats).map((key) => {
    return seats[key];
  });
  console.log('seatsData', seatsData);

  const [cant, setCant] = useState(5);

  let itemNumber = [];
  const busMap = () => {
    for (let i = 0; i < cant; i++) {
      itemNumber[i] = i + 1;
    }
  };

  return (
    <>
      {busMap()}
      {/* {SeatsBus()} */}
      <Background>
        {itemNumber.map((itemId) => {
          return (
            <Tooltip
              title={
                <>
                  <p>Tipo: {'cama'}</p>
                  <p>N#: {itemId}</p>
                  <p>Precio Rango: {'80bs-90bs'}</p>
                  <p>Estado: {true ? 'Libre' : 'Ocupado'}</p>
                </>
              }
              arrow
              placement="top"
            >
              <Checkbox
                {...label}
                icon={<EventSeatRoundedIcon fontSize="large" />}
                checkedIcon={<EventSeatRoundedIcon fontSize="large" />}
              />
            </Tooltip>
          );
        })}
      </Background>
    </>
  );
};

export default Seat;
