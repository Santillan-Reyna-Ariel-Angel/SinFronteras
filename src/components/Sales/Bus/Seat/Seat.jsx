import React, { useState, useContext } from 'react';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import Tooltip from '@mui/material/Tooltip';
import { Background, Container, ContainerTopSeats, ContainerCenterSeats, ContainerButtomSeats,ContainerHall } from './SeatStyles';
//check
import Checkbox from '@mui/material/Checkbox';
//form controls
import FormControlLabel from '@mui/material/FormControlLabel';
//Context
import { ContextBranchOffice } from './../../../../contexts/ContextBranchOffice';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

let createSeats = (numSeat) => {
  let seats = [];
  for(let i=1; i<=numSeat; i++){
      if(i%3===0){
          seats.push([i-2,i-1,i]);
      }
  }
  if(numSeat%3===0)return [seats.map(x=>x[0]),seats.map(x=>x[1]),seats.map(x=>x[2])];
  else{ 
      let f = numSeat - seats.length*3;
      seats.push(f<2?[numSeat,null,null]:[numSeat-1,numSeat,null]);
      return [seats.map(x=>x[0]),seats.map(x=>x[1]),seats.map(x=>x[2])];
  }
}

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

  const [checked, setChecked] = useState();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  console.log('checked', checked);
  return (
    <>
      <Background>
        <Container>
        <ContainerTopSeats>
        {createSeats(29)[2].map((seat) => {
          if(seat!==null){
            // console.log("seat",seat);
            return (
              <Tooltip
                key={seat}
                title={
                  <>
                    <p>N#: {seat}</p>
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
                          sx={{ transform: 'rotate(90deg)' }}
                        />
                      }
                      onChange={handleChange}
                      sx={{ margin: '-16px 0px 0px 0px' }}
                    />
                  }
                  label={seat}
                  labelPlacement="top"
                  sx={{ margin: '0px -12px -10px 0px' }}
                />
              </Tooltip>
            );
          }
          })}
          </ContainerTopSeats>

          <ContainerHall></ContainerHall>
          <ContainerCenterSeats>
          {createSeats(29)[1].map((seat) => {
          console.log(seat||"");
            return (
              <Tooltip
                key={seat||""}
                title={
                  <>
                    <p>N#: {seat||""}</p>
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
                          sx={{ transform: 'rotate(90deg)' }}
                        />
                      }
                      onChange={handleChange}
                      sx={{ margin: '-16px 0px 0px 0px' }}
                    />
                  }
                  label={seat||""}
                  labelPlacement="top"
                  sx={{ margin: '0px -12px -10px 0px' }}
                />
              </Tooltip>
            );
          })}
          </ContainerCenterSeats>
          <ContainerButtomSeats>
           {createSeats(29)[0].map((seat) => {
          console.log(seat||"");
            return (
              <Tooltip
                key={seat||""}
                title={
                  <>
                    <p>N#: {seat||""}</p>
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
                          sx={{ transform: 'rotate(90deg)' }}
                        />
                      }
                      onChange={handleChange}
                      sx={{ margin: '-16px 0px 0px 0px' }}
                    />
                  }
                  label={seat||""}
                  labelPlacement="top"
                  sx={{ margin: '0px -12px -10px 0px' }}
                />
              </Tooltip>
            );
          })}
</ContainerButtomSeats>


          
          {/* {itemNumber.map((itemId) => {
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
                          sx={{ transform: 'rotate(90deg)' }}
                        />
                      }
                      onChange={handleChange}
                      sx={{ margin: '-16px 0px 0px 0px' }}
                    />
                  }
                  label={itemId}
                  labelPlacement="top"
                  sx={{ margin: '0px -12px -10px 0px' }}
                />
              </Tooltip>
            );
          })} */}
        </Container>
      </Background>
    </>
  );
};

export default Seat;
