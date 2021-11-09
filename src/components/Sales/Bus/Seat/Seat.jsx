import React, { useState, useContext } from 'react';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import Tooltip from '@mui/material/Tooltip';
import { Background } from './SeatStyles';
//check
import Checkbox from '@mui/material/Checkbox';
//form controls
import FormControlLabel from '@mui/material/FormControlLabel';
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
      console.log('Datos iguales');
      const { minimalPrice, maximumPrice } = prices[0];
      // let busMapAux = {
      //   typeOfBus,
      //   typeOfSeats,
      //   numberOfSeats,
      //   minimalPrice,
      //   maximumPrice,
      // };
      // return busMapAux;
      return { minimalPrice, maximumPrice };
    }
  };
  const seatData = busMapData();

  let itemNumber = [];
  const busMap = () => {
    for (let i = 0; i < numberOfSeats; i++) {
      itemNumber[i] = i + 1;
    }
  };

  const [checked, setChecked] = useState();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  console.log('checked', checked);
  return (
    <>
      {busMap()}

      <Background>
        {itemNumber.map((itemId) => {
          return (
            <Tooltip
              title={
                <>
                  <p>N#: {itemId}</p>
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
                // value="top"
                control={
                  <Checkbox
                    {...label}
                    icon={<EventSeatRoundedIcon fontSize="large" />}
                    checkedIcon={<EventSeatRoundedIcon fontSize="large" />}
                    onChange={handleChange}
                  />
                }
                label={itemId}
                labelPlacement="top"
              />
            </Tooltip>
          );
        })}
      </Background>
    </>
  );
};

export default Seat;
