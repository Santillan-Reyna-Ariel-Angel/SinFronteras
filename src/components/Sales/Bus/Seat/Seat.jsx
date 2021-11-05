import React, { useState } from 'react';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import Tooltip from '@mui/material/Tooltip';
import { Background } from './SeatStyles';
//check
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Seat = ({ dataBusTravel }) => {
  const {
    bus: {
      typeOfBus: { seats },
    },
  } = dataBusTravel ? dataBusTravel : {};

  const seatsData = Object.keys(seats).map((seatKey) => {
    return seats[seatKey];
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
