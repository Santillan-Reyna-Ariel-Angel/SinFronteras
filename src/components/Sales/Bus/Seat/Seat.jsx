import React, { useState, useContext } from 'react';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import Tooltip from '@mui/material/Tooltip';

//Styles
import {
  Background,
  Container,
  ContainerTopSeats,
  ContainerTopSeatsCenter,
  ContainerButtomSeatsCenter,
  ContainerButtomSeats,
  ContainerHall,
  DriverStyled,
} from './SeatStyles';
//check
import Checkbox from '@mui/material/Checkbox';
//form controls
import FormControlLabel from '@mui/material/FormControlLabel';
//Context
import { ContextBranchOffice } from './../../../../contexts/ContextBranchOffice';
import { ContextBranchTripsMade } from './../../../../contexts/ContextBranchTripsMade';
import { ContextUserData } from './../../../../contexts/ContextUserData';

//PassengerRegistrationTable:
import { PassengerRegistrationTable } from '../../PassengerRegistrationTable/PassengerRegistrationTable';
//addOccupiedSeat In BD:
import { addOccupiedSeat } from './../../Events/Firebase/addOccupiedSeat.js';
//removeOccupiedSeat IN BD:
import { removeOccupiedSeat } from './../../Events/Firebase/removeOccupiedSeat.js';
//travelKey:
import { travelKey } from './../../Events/Functions/TripsMadeGenerateKeys';

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
  // console.log('***dataBusTravel', dataBusTravel);
  //Context
  const branchOffice = useContext(ContextBranchOffice);
  const { branchInformation } = branchOffice
    ? branchOffice
    : { branchInformation: {}, travels: {} };
  const { destinations, branchNumber } = branchInformation;

  let branchTripsMade = useContext(ContextBranchTripsMade);
  //console.log('branchTripsMade', branchTripsMade);

  //context userData:
  const userData = useContext(ContextUserData);
  let { identificationNumber: identificationNumberUser } = userData;

  //Props
  //Tambien se podria extraer: numberOfFloors
  const {
    bus: { typeOfBus, numberOfSeats, typeOfSeats, enrollment: busEnrollment },
    destinationLocation,
    travelDate,
    departureTime,
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
  // console.log('Context_prices', prices);

  const busMapData = () => {
    if (prices[0].seatType === typeOfSeats) {
      // console.log('Datos iguales');
      const { minimalPrice, maximumPrice } = prices[0];

      return { minimalPrice, maximumPrice };
    }
  };
  const seatPrices = busMapData();
  // console.log('seatPrices', seatPrices);

  //Estado de la tabla de pasajeros:
  const [passengersDataTable, setPassengersDataTable] = useState([]);

  //Recuperando solo los asientosOcupados del viaje en concreto (talvez colocarlo antes de busMap()):
  let travelKeyAux = travelKey({
    travelDate,
    departureTime,
    busEnrollment,
  });
  // console.log('travelKeyAux:', travelKeyAux); //travel_7-8-2022_21-30_bus-006

  //IMPORTANTE: 1RO DEBERIA HABERSE CREADO EL VIAJE EN LA BD: (TripsMade/branc_x/travel_7-8-2022_21-30_bus-006)
  let {
    [travelKeyAux]: { occupiedSeat },
  } = branchTripsMade;
  //console.log('occupiedSeat', occupiedSeat);

  const whatOccupiedSeatsToPaint = () => {
    //json to array:
    let occupiedSeatArray = [];
    for (let i in occupiedSeat) occupiedSeatArray.push([i, occupiedSeat[i]]);
    // console.log('occupiedSeatArray', occupiedSeatArray);

    let selectedSeatsId = passengersDataTable.map((passenger) => passenger.id);
    // console.log('selectedSeatsId', selectedSeatsId);

    //verificar asientos ocupados(occupiedSeat[0] es el numero de asiento):
    let occupiedSeatsToPaint = occupiedSeatArray.filter(
      (occupiedSeat) => selectedSeatsId.includes(occupiedSeat[0]) === false
    );
    // console.log('occupiedSeatsToPaint ', occupiedSeatsToPaint);

    return occupiedSeatsToPaint;
  };
  let paintOccupiedSeats = whatOccupiedSeatsToPaint();
  // console.log('paintOccupiedSeats', paintOccupiedSeats);

  const coloringSeat = (seatNumber) => {
    let paintOccupiedSeat = paintOccupiedSeats.filter(
      (seat) => seat[0] === seatNumber.toString()
    );
    if (paintOccupiedSeat.length !== 0) {
      // console.log('paintOccupiedSeat', paintOccupiedSeat);
      let seatState = paintOccupiedSeat[0][1];
      // console.log('seatState', seatState);
      return seatState.includes('vendido') ? 'red' : 'yellow';
    } else {
      return '';
    }
  };

  //Funcion para selecionar un asiento y colocarlo al estado:
  const handleChange = (event) => {
    // console.log('id: ', event.target.id, '.checked: ', event.target.checked);
    const ids = passengersDataTable.map((seat) => seat.id);
    let selectedSeat = ids.includes(event.target.id);
    //seatId para eventos BD:
    let seatId = event.target.id;
    if (selectedSeat !== true && event.target.checked === true) {
      setPassengersDataTable([
        ...passengersDataTable,
        {
          id: event.target.id,
          seatPrice: seatPrices.maximumPrice, // por defecto se coloca maximo precio a cobrar
          typeOfDocument: 'Carnet Identidad',
          identificationNumber: '',
          firstName: '',
          lastName: '',
        },
      ]);

      addOccupiedSeat({
        branchNumber,
        dataBusTravel,
        seatId,
        seatState: 'preventa',
        identificationNumberUser,
      });
    } else {
      const passengersDataTableAux = passengersDataTable.filter(
        (seat) => seat.id !== event.target.id
      );
      setPassengersDataTable(passengersDataTableAux);
      removeOccupiedSeat({ branchNumber, dataBusTravel, seatId });
    }
  };

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
                    {` ${seatPrices.minimalPrice} bs - ${seatPrices.maximumPrice} bs`}
                  </p>
                  <p>
                    {/* //Si !==0 es true, el asiento esta selecionado o vendido. */}
                    Estado:
                    {coloringSeat(seatNumber).length !== 0
                      ? coloringSeat(seatNumber) === 'red'
                        ? ' Vendido'
                        : ' Preventa'
                      : ' Libre'}
                  </p>
                </>
              }
              arrow
              placement="top"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    id={seatNumber}
                    {...label}
                    icon={
                      <EventSeatRoundedIcon
                        // fontSize="small"
                        sx={{
                          transform: 'rotate(90deg)',
                          color: coloringSeat(seatNumber),
                        }}
                      />
                    }
                    checkedIcon={
                      <EventSeatRoundedIcon
                        // fontSize="small"
                        sx={{ transform: 'rotate(90deg)', color: 'primary' }} //Modificar para cambiar el color de los asientos selecionados
                      />
                    }
                    onChange={handleChange}
                    sx={{ margin: '-16px 0px 0px 0px' }}
                    disabled={
                      coloringSeat(seatNumber).length !== 0 ? true : false //Si !==0 es true, el asiento esta selecionado(se inhabilita para los demas) o vendido(se inhabilita para todos).
                    }
                  />
                }
                label={seatNumber}
                labelPlacement="top"
                sx={{
                  margin: '0px -12px -10px 0px',
                  // backgroundColor: 'red',
                  // borderTopRightRadius:
                  //   i === arraySeats.length - 1 &&
                  //   ((indice === 2 && typeOfBusParameter === 'leito') ||
                  //     (indice === 3 && typeOfBusParameter === 'normal'))
                  //     ? '15px'
                  //     : '',
                  // borderBottomRightRadius:
                  //   i === arraySeats.length - 1 && indice === 0 ? '15px' : '',
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
              <DriverStyled />
              <ContainerTopSeats>
                {BusMap(typeOfBus, numberOfSeats, 2)}
              </ContainerTopSeats>
              <ContainerHall></ContainerHall>
              <ContainerButtomSeatsCenter>
                {BusMap(typeOfBus, numberOfSeats, 1)}
              </ContainerButtomSeatsCenter>
              <ContainerButtomSeats>
                {BusMap(typeOfBus, numberOfSeats, 0)}
              </ContainerButtomSeats>
            </>
          ) : (
            <>
              <DriverStyled />
              <ContainerTopSeats>
                {BusMap(typeOfBus, numberOfSeats, 3)}
              </ContainerTopSeats>
              <ContainerTopSeatsCenter>
                {BusMap(typeOfBus, numberOfSeats, 2)}
              </ContainerTopSeatsCenter>
              <ContainerHall></ContainerHall>
              <ContainerButtomSeatsCenter>
                {BusMap(typeOfBus, numberOfSeats, 1)}
              </ContainerButtomSeatsCenter>
              <ContainerButtomSeats>
                {BusMap(typeOfBus, numberOfSeats, 0)}
              </ContainerButtomSeats>
            </>
          )}
        </Container>
      </Background>

      <PassengerRegistrationTable
        passengersDataTable={passengersDataTable}
        setPassengersDataTable={setPassengersDataTable}
        seatPrices={seatPrices}
        dataBusTravel={dataBusTravel}
      />
    </>
  );
};

export default Seat;
