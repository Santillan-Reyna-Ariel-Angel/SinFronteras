import React, { useState, useContext } from 'react';
//MUI:
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
//Styles:
import {
  Background,
  Container,
  ContainerTopSeats,
  ContainerTopSeatsCenter,
  ContainerButtomSeatsCenter,
  ContainerButtomSeats,
  ContainerHall,
  DriverStyled,
} from './BusSeatMapStyles';
//Contexts:
import { ContextBranchOffice } from '../../../../contexts/ContextBranchOffice';
import { ContextBranchTripsMade } from '../../../../contexts/ContextBranchTripsMade';
import { ContextUserData } from '../../../../contexts/ContextUserData';
//Firebase Functions:
import { addOccupiedSeat } from '../../Events/Firebase/addOccupiedSeat.js'; //addOccupiedSeat In BD:
import { removeOccupiedSeat } from '../../Events/Firebase/removeOccupiedSeat.js'; //removeOccupiedSeat IN BD:
//State:
//Components:
import { PassengerRegistrationTable } from '../../PassengerRegistrationTable/PassengerRegistrationTable';
//Others:
import { travelKey } from '../../Events/Functions/TripsMadeGenerateKeys';
import { createSeats } from './Functions';
import { useMediaQuery } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; //Usado en Check

const BusSeatMap = ({ dataBusTravel }) => {
  const isScreenMaxW_768 = useMediaQuery('(max-width:768px)');
  // console.log('isScreenMaxW_768', isScreenMaxW_768);

  // console.log('***dataBusTravel', dataBusTravel);

  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  const { branchInformation } = branchOffice
    ? branchOffice
    : { branchInformation: {}, travels: {} };
  const { destinations, branchNumber } = branchInformation;

  //ContextBranchTripsMade:
  let branchTripsMade = useContext(ContextBranchTripsMade);
  //console.log('branchTripsMade', branchTripsMade);

  //ContextUserData:
  const userData = useContext(ContextUserData);
  let { identificationNumber: identificationNumberUser } = userData;

  //Props:
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

  const getSeatPrices = () => {
    if (prices[0].seatType === typeOfSeats) {
      // console.log('Datos iguales');
      const { minimalPrice, maximumPrice } = prices[0];

      return { minimalPrice, maximumPrice };
    }
  };
  const seatPrices = getSeatPrices();
  // console.log('seatPrices', seatPrices);

  //Estado de la tabla de pasajeros:
  const [passengersDataTable, setPassengersDataTable] = useState([]);

  //RECUPERANDO solo los asientosOcupados del viaje en concreto:
  let travelKeyAux = travelKey({
    travelDate,
    departureTime,
    busEnrollment,
  });
  // console.log('travelKeyAux:', travelKeyAux); //output: travel_7-8-2022_21-30_bus-006

  //IMPORTANTE: 1RO DEBERIA HABERSE CREADO EL VIAJE EN LA BD (TripsMade/branc_x/travel_7-8-2022_21-30_bus-006)
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

  //COLOREAR el asiento dependiedo de su estado(libre,reservado,preventa,vendido):
  const coloringSeat = (seatNumber) => {
    let paintOccupiedSeat = paintOccupiedSeats.filter(
      (seat) => seat[0] === seatNumber.toString()
    );
    if (paintOccupiedSeat.length !== 0) {
      // console.log('paintOccupiedSeat', paintOccupiedSeat);
      let seatState = paintOccupiedSeat[0][1];
      // console.log('seatState', seatState);
      // return seatState.includes('vendido') ? 'red' : 'yellow'; // esto era sin reservas
      return seatState.includes('vendido')
        ? 'red'
        : seatState.includes('preventa')
        ? 'yellow'
        : 'purple'; // purple para reservado
    } else {
      return '';
    }
  };

  //Funcion para selecionar un asiento y colocarlo al estado:
  const selectOrDeselectSeat = (event) => {
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

  //Crear Mapa de asientos del bus: busSeatMap
  const busSeatMap = (typeOfBusParameter, numberOfSeatsParameter, indice) => {
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
                    {/* //Si !==0 es true, el asiento esta en preventa(seleccionado por otro user), reservado o vendido. */}
                    Estado:
                    {coloringSeat(seatNumber).length !== 0
                      ? coloringSeat(seatNumber) === 'red'
                        ? ' Vendido'
                        : coloringSeat(seatNumber) === 'yellow'
                        ? ' Preventa'
                        : ' Reservado'
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
                        fontSize={isScreenMaxW_768 ? 'small' : undefined} //small=38x38
                        sx={{
                          transform: 'rotate(90deg)',
                          color: coloringSeat(seatNumber),
                          //breakpoint:
                          [`@media screen and (max-width: 768px)`]: {
                            // fontSize: 'medium', //small=31x31 -  medium=34x34
                          },
                        }}
                      />
                    }
                    checkedIcon={
                      <EventSeatRoundedIcon
                        fontSize={isScreenMaxW_768 ? 'small' : undefined} //small=38x38
                        sx={{ transform: 'rotate(90deg)', color: 'primary' }} //Modificar para cambiar el color de los asientos selecionados
                      />
                    }
                    onChange={selectOrDeselectSeat}
                    sx={{
                      margin: '-16px 0px 0px 0px',
                      //breakpoint:
                      [`@media screen and (max-width: 768px)`]: {
                        margin: '-14px 0px 0px 0px',
                      },
                    }}
                    disabled={
                      // coloringSeat(seatNumber) devuelve: "red"(vendido), "yellow"(preventa), "purple"(reservado) o ""(asiento disponible)
                      // Entonces si: coloringSeat(seatNumber).length !== 0 es true(el asiento tiene un color), se inhabilita el asiento.
                      coloringSeat(seatNumber).length !== 0 ? true : false //Si !==0 es true, el asiento esta selecionado(se inhabilita para los demas) o vendido(se inhabilita para todos).
                    }
                  />
                }
                label={seatNumber}
                labelPlacement="top"
                sx={{
                  margin: '0px -5px 0px 0px', // CONTROLA EL MARGIN ENTRE CADA ASIENTO
                  padding: '0px 0px 0px 0px',
                  // backgroundColor: 'red',
                  // borderTopRightRadius:
                  //   i === arraySeats.length - 1 &&
                  //   ((indice === 2 && typeOfBusParameter === 'leito') ||
                  //     (indice === 3 && typeOfBusParameter === 'normal'))
                  //     ? '15px'
                  //     : '',
                  // borderBottomRightRadius:
                  //   i === arraySeats.length - 1 && indice === 0 ? '15px' : '',

                  '.MuiTypography-root': {
                    fontWeight: 'bold',
                    fontSize: '14px',
                  },

                  //breakpoint:
                  [`@media screen and (max-width: 768px)`]: {
                    margin: '0px -12px 0px 0px', // CONTROLA EL MARGIN ENTRE CADA ASIENTO
                    '.MuiTypography-root': {
                      fontSize: '12px',
                    },
                  },
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
                {busSeatMap(typeOfBus, numberOfSeats, 2)}
              </ContainerTopSeats>
              <ContainerHall></ContainerHall>
              <ContainerButtomSeatsCenter>
                {busSeatMap(typeOfBus, numberOfSeats, 1)}
              </ContainerButtomSeatsCenter>
              <ContainerButtomSeats>
                {busSeatMap(typeOfBus, numberOfSeats, 0)}
              </ContainerButtomSeats>
            </>
          ) : (
            <>
              <DriverStyled />
              <ContainerTopSeats>
                {busSeatMap(typeOfBus, numberOfSeats, 3)}
              </ContainerTopSeats>
              <ContainerTopSeatsCenter>
                {busSeatMap(typeOfBus, numberOfSeats, 2)}
              </ContainerTopSeatsCenter>
              <ContainerHall></ContainerHall>
              <ContainerButtomSeatsCenter>
                {busSeatMap(typeOfBus, numberOfSeats, 1)}
              </ContainerButtomSeatsCenter>
              <ContainerButtomSeats>
                {busSeatMap(typeOfBus, numberOfSeats, 0)}
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

export { BusSeatMap };
