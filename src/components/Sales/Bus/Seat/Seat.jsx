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
  const { branchInformation } = branchOffice
    ? branchOffice
    : { branchInformation: {}, travels: {} };
  const { destinations } = branchInformation;

  //Props
  const {
    bus: {
      typeOfBus: { seats, busTypeName },
    },
    destinationLocation,
  } = dataBusTravel ? dataBusTravel : {};

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
  console.log('Context_prices', prices);

  const seatsData = Object.keys(seats).map((key) => {
    return seats[key];
  });
  console.log('Props_seatsData', seatsData);

  const busMapData = () => {
    if (prices[0].seatType === seatsData[0].seatType) {
      console.log('iguales');
      const { seatType, minimumSeatRange, maximumSeatRange } = seatsData[0];
      const { busTypeName, minimalPrice, maximumPrice } = prices[0];
      let busMapAux = {
        busTypeName,
        seatType,
        minimumSeatRange,
        maximumSeatRange,
        minimalPrice,
        maximumPrice,
      };
      return busMapAux;
    }
  };
  console.log('busMapData()', busMapData());
  const { maximumSeatRange, seatType, minimalPrice, maximumPrice } =
    busMapData();

  console.log('maximumSeatRange', maximumSeatRange);

  const [cant, setCant] = useState(maximumSeatRange);

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
                  <p>N#: {itemId}</p>
                  <p>Tipo: {seatType}</p>
                  <p>
                    Precio Rango: {minimalPrice + 'bs - ' + maximumPrice + 'bs'}
                  </p>
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
