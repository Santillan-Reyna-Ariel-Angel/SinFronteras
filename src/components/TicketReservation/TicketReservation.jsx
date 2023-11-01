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
  FullNameBuyer,
  Btn,
} from './TicketReservationStyles';
//Contexts:
import { ContextBranchOffice } from './../../contexts/ContextBranchOffice';
import { ContextUserData } from './../../contexts/ContextUserData';

//Firebase Functions:
//States:
//Components:
import { PlainModalButton } from './../PlainModalButton/PlainModalButton';
//Others:
import { Css_TextField_Select } from './../constantData';
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
  let { identificationNumber: identificationNumberUser } = userData
    ? userData
    : { identificationNumber: '' };
  console.log('identificationNumberUser:', identificationNumberUser);

  const [selectedTravel, setSelectedTravel] = useState(null);
  console.log('selectedTravel:', selectedTravel);

  const [seats, setSeats] = useState('');
  console.log('seats:', seats);

  const buyerDataDefault = {
    fullName: '',
  };

  const [buyerData, setBuyerData] = useState(buyerDataDefault);
  console.log('buyerData:', buyerData);

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
                [`@media screen and (max-width: 768px)`]: {
                  '.MuiInputBase-root': {
                    fontSize: Css_TextField_Select.fontSize,
                  },
                },
              }}
            />
          </Seats>

          <FullNameBuyer>
            <TextField
              value={buyerData.fullName}
              label="Nombre comprador..."
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
                  fontSize: Css_TextField_Select.fontSize,
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
              //   functionToExecute={changePassword}
              //   functionParameters={{
              //     identificationNumber,
              //     dataChangePassword,
              //   }}
              //   thirdFunctionToExecute={componentDefaultData}
              //   disabledBtn={!isDataValidate}
            />
          </Btn>
        </BodyContainer>
      </Background>
    </>
  );
};
