import React, { useState, useContext } from 'react';
// MUI:
import { TextField, Autocomplete } from '@mui/material/';
//Styles:
import {
  Background,
  HeaderContainer,
  HeaderTitle,
  BodyContainer,
  Travels,
  Seats,
  ReservationTime,
  BuyerId,
  FullNameBuyer,
  WarningText,
  Btn,
} from './TicketReservationStyles';
//Contexts:
import { ContextBranchOffice } from '../../../contexts/ContextBranchOffice';
import { ContextUserData } from '../../../contexts/ContextUserData';
import { ContextBranchTripsMade } from '../../../contexts/ContextBranchTripsMade';

//Firebase Functions:
import { addReserveSeat } from './../events/Firebase/addReserveSeat';
import { addReservationData } from './../events/Firebase/addReservationData';
//States:
//Components:
import { PlainModalButton } from '../../PlainModalButton/PlainModalButton';
//Others:
import { Css_TextField_Select } from '../../constantData';
import { isPastTrip } from './functions';

export const TicketReservation = () => {
  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  const {
    travels,
    branchInformation: { branchNumber },
  } = branchOffice
    ? branchOffice
    : { travels: {}, branchInformation: { branchNumber: '' } };
  // console.log('travels', travels);
  console.log('branchNumber', branchNumber);

  //ContextUserData:
  const userData = useContext(ContextUserData);
  let { identificationNumber, names, surnames } = userData
    ? userData
    : { identificationNumber: '', names: '', surnames: '' };
  let userDataAux = { identificationNumber, names, surnames };
  console.log('userDataAux:', userDataAux);

  //ContextBranchTripsMade:
  const branchTripsMade = useContext(ContextBranchTripsMade);
  const branchTripsMadeAux = branchTripsMade ? branchTripsMade : {};
  console.log('branchTripsMadeAux:', branchTripsMadeAux);

  const [selectedTravel, setSelectedTravel] = useState(null);
  console.log('selectedTravel:', selectedTravel);

  const [seats, setSeats] = useState('');
  console.log('seats:', seats);

  const buyerDataDefault = {
    fullName: '',
    ciOrNit: '',
    reservationTime: '',
  };

  const [buyerData, setBuyerData] = useState(buyerDataDefault);
  console.log('buyerData:', buyerData);

  const [warningMessage, setWarningMessage] = useState(false);
  let occupiedSeatList = [];
  if (selectedTravel !== null) {
    const seatsObj =
      Object.keys(branchTripsMadeAux).length !== 0
        ? branchTripsMadeAux[selectedTravel.travelKey].occupiedSeat
        : {};
    const seatsList =
      Object.keys(seatsObj).length !== 0 ? Object.keys(seatsObj) : [];
    occupiedSeatList = seatsList;
  }
  console.log('occupiedSeatList:', occupiedSeatList);

  let travelDataList = Object.keys(travels).map((travelKey) => {
    let {
      // localityOfOrigin,
      destinationLocation,
      // bus: { typeOfBus },
      departureTime,
      travelDate,
      // busEnrollment, // Por si se desea añadir a la card
    } = travels[travelKey];

    let travelData = {
      travelKey,
      // localityOfOrigin,
      destinationLocation,
      // typeOfBus,
      departureTime,
      travelDate,
      // busEnrollment, // Por si se desea añadir a la card
      valueForSelect: `${destinationLocation} - ${travelDate} - ${departureTime}`,
    };
    return travelData;
  });
  // console.log('travelDataList:', travelDataList);

  let travelDataListFiltered = travelDataList.filter(
    (travelData) => isPastTrip(travelData) === false
  );
  console.log('travelDataListFiltered:', travelDataListFiltered);

  const findTravel = (optionSelected) => {
    let travel = travelDataListFiltered.find(
      (travelData) => travelData.valueForSelect === optionSelected
    );

    if (travel === undefined) {
      return null;
    } else {
      return travel;
    }
  };

  const componentDefaultData = () => {
    setSelectedTravel(null);
    setSeats('');
    setBuyerData(buyerDataDefault);
  };

  const verificarDisponibilidad = (seatListAux) => {
    const coincidencias = seatListAux.map((seat) =>
      occupiedSeatList.includes(seat)
    );
    console.log('coincidencias:', coincidencias); // si existe un true, significa que un asiento ya no esta disponible

    // IMPORTANTE: every() devuelve true si todos los elementos del array cumplen con la condicion
    const asientosDisponibles = coincidencias.every(
      (elemento) => elemento === false // se verifica que todos los asientos esten disponibles
    );
    return asientosDisponibles; // true si todos los asientos estan disponibles para la reserva
  };

  const reserveSeats = ({ seats, selectedTravel }) => {
    let seatsList = seats.split(',');

    // IMPORTANTE PARA seatId: trim() para eliminar posibles espacios en blanco (derecha e izquierda) de cada asiento
    let seatListAux = seatsList.map((seat) => seat.trim());
    console.log('seatListAux:', seatListAux);

    const asientosDisponibles = verificarDisponibilidad(seatListAux);

    console.log('asientosDisponibles:', asientosDisponibles); // true si todos los asientos estan disponibles para la reserva

    if (asientosDisponibles === true) {
      seatListAux.forEach((seat) =>
        addReserveSeat({
          branchNumber,
          travelKey: selectedTravel.travelKey,
          seatId: seat,
          seatState: 'reservado',
          userData: userDataAux,
        })
      );

      addReservationData({
        branchNumber,
        travelKey: selectedTravel.travelKey,
        buyerData,
        seats: seatListAux,
        userData: userDataAux,
        travelInfo: selectedTravel.valueForSelect,
      });

      setWarningMessage(false);
      componentDefaultData();
    } else {
      setWarningMessage(true);
    }
  };

  return (
    <>
      <Background>
        <HeaderContainer>
          <HeaderTitle>
            <span>RESERVAR ASIENTOS</span>
          </HeaderTitle>
        </HeaderContainer>
        <BodyContainer>
          <Travels>
            <Autocomplete
              value={
                selectedTravel ? selectedTravel.valueForSelect : selectedTravel
              }
              onChange={(event, newValue) => {
                setSelectedTravel(findTravel(newValue));
              }}
              id="selectedTravel"
              options={travelDataListFiltered.map(
                (travel) => travel.valueForSelect
              )}
              renderInput={(params) => (
                <TextField
                  className="input"
                  {...params}
                  label="Selecionar viaje"
                  variant="outlined"
                  size="small"
                  sx={{
                    '.MuiInputBase-root': {
                      fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                      fontWeight:
                        Css_TextField_Select.fontWeighScreenUpperW_768,
                      color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                      backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                    },
                    [`@media screen and (max-width: 768px)`]: {
                      '.MuiInputBase-root': {
                        fontSize: Css_TextField_Select.fontSize,
                      },
                    },
                  }}
                />
              )}
            />
          </Travels>

          <Seats>
            <TextField
              value={seats}
              label="Asientos"
              variant="outlined"
              required
              fullWidth
              size="small"
              multiline
              placeholder="1,2,15"
              helperText="Ej: 1,2,15"
              onChange={(event) => {
                setSeats(event.target.value);
              }}
              sx={{
                '.MuiInputBase-root': {
                  fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                  fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768,
                  color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                  backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                },
                [`@media screen and (max-width: 768px)`]: {
                  '.MuiInputBase-root': {
                    fontSize: Css_TextField_Select.fontSize,
                  },
                },
              }}
            />
          </Seats>

          <ReservationTime>
            <TextField
              value={buyerData.reservationTime}
              label="Tiempo de reserva (min)"
              variant="outlined"
              type="number"
              required
              fullWidth
              size="small"
              helperText="60=1hr, 120=2hrs, 180=3hrs"
              onChange={(event) =>
                setBuyerData({
                  ...buyerData,
                  reservationTime: event.target.value,
                })
              }
              sx={{
                '.MuiInputBase-root': {
                  fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                  fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768,
                  color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                  backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                },
              }}
            />
          </ReservationTime>

          <WarningText>
            <span>
              {warningMessage
                ? 'Uno o varios asientos ya no estan disponibles, verifique nuevamente.'
                : ''}
            </span>
          </WarningText>
          <BuyerId>
            <TextField
              value={buyerData.ciOrNit}
              label="N# identificacion comprador"
              variant="outlined"
              type="number"
              required
              fullWidth
              size="small"
              onChange={(event) =>
                setBuyerData({
                  ...buyerData,
                  ciOrNit: event.target.value,
                })
              }
              sx={{
                '.MuiInputBase-root': {
                  fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                  fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768,
                  color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                  backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                },
              }}
            />
          </BuyerId>

          <FullNameBuyer>
            <TextField
              value={buyerData.fullName}
              label="Nombre comprador"
              variant="outlined"
              required
              fullWidth
              size="small"
              onChange={(event) =>
                setBuyerData({
                  ...buyerData,
                  fullName: event.target.value,
                })
              }
              sx={{
                '.MuiInputBase-root': {
                  fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                  fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768,
                  color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                  backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                },
              }}
            />
          </FullNameBuyer>

          {/*Boton Registrar:   */}
          <Btn>
            <PlainModalButton
              primaryBtnText="reservar"
              dialogTitle="RESERVAR ASIENTOS"
              dialogText={`Esta seguro de reservar estos asientos?`}
              closeBtnText="atras"
              continueBtnText="si"
              functionToExecute={reserveSeats}
              functionParameters={{
                seats,
                selectedTravel,
              }}
              // thirdFunctionToExecute={componentDefaultData}
            />
          </Btn>
        </BodyContainer>
      </Background>
    </>
  );
};
