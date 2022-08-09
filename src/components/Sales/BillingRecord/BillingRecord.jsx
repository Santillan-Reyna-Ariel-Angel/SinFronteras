import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Checkbox, FormControlLabel } from '@mui/material';
import { countryData } from './countryData';
import { PlainModalButton } from '../../PlainModalButton/PlainModalButton';
//Styles:
import {
  Background,
  HeaderContainer,
  HeaderTitle,
  BodyContainer,
  InvoiceCheckbox,
  InputCiOrNit,
  InputNameOrSocialReason,
  InputEmail,
  InputCountryCode,
  InputMobile,
  Btn,
} from './BillingRecordStyles';
//Contexts generalCompanyData:
import { ContextGeneralCompanyData } from './../../../contexts/ContextGeneralCompanyData';
//Context branchOffice:
import { ContextBranchOffice } from './../../../contexts/ContextBranchOffice';
//Context branchOffice:
import { ContextUserData } from './../../../contexts/ContextUserData';
//Component SalesAmountData
import { SalesAmountData } from '../SalesAmountData/SalesAmountData';
//BDsaveData:
import { saveTripsMade } from './../Events/Firebase/saveTripsMade';
//BD updateOccupiedSeat:
import { updateOccupiedSeat } from './../Events/Firebase/updateOccupiedSeat';
//salesAmountData:
import { salesAmountData } from './../SalesAmountData/SalesAmountData';
//State que muestra o no el mapa de asientos(se usara al finalizar la venta):
import { showSeatMap, setShowSeatMap } from './../TravelCards/TravelCards';

const BillingRecord = ({ passengersDataTable, dataBusTravel }) => {
  // console.log('***passengersDataTable', passengersDataTable);
  //contex Data :
  const generalCompanyData = useContext(ContextGeneralCompanyData);
  const {
    billingInformation: { legend },
    companyName,
  } = generalCompanyData ? generalCompanyData : { billingInformation: {} };

  //context BranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  const { branchInformation } = branchOffice
    ? branchOffice
    : { branchInformation: {} };
  let {
    branchNumber,
    departmentsContactNumbers: {
      informations: { telephone },
    },
  } = branchInformation;

  //context user:
  const userData = useContext(ContextUserData);
  let {
    names,
    surnames,
    identificationNumber: identificationNumberUser,
  } = userData;

  //Props dataBusTravel:
  let {
    localityOfOrigin,
    destinationLocation,
    travelDate,
    departureTime,
    lane,
    bus: { typeOfSeats, enrollment },
  } = dataBusTravel;

  //generateTicketNumber:
  const generateTicketNumber = (identificationNumber) => {
    let date = new Date();
    let suc = `suc${branchNumber}`;
    let dateTN = `${date.getMonth() + 1}${date.getFullYear()}`;
    let ticketNumber = `${suc}-${dateTN}-${identificationNumber}`;
    // console.log('ticketNumber:', ticketNumber);
    return ticketNumber;
  };

  let ticketsSalesData = passengersDataTable.map((ticketSold) => {
    let ticketSoldAux = {
      companyName: companyName,
      branchNumber: branchNumber,
      ticketNumber: generateTicketNumber(ticketSold.identificationNumber), // Genera automaticamente
      issuingUser: `${surnames} ${names}`, //usuario emisor
      branchPhone: telephone,
      origin: localityOfOrigin,
      destiny: destinationLocation,
      travelDate: travelDate,
      departureTime: departureTime,
      lane: lane, //carril
      passengerFullName: `${ticketSold.lastName} ${ticketSold.firstName}`,
      typeOfDocument: ticketSold.typeOfDocument,
      identificationNumber: ticketSold.identificationNumber,
      seatId: ticketSold.id,
      typeOfSeat: typeOfSeats,
      seatPrice: ticketSold.seatPrice,
      // rowType:"ventana", //ventana o pasillo
      legend: legend,
      busEnrollment: enrollment,
    };
    return ticketSoldAux;
  });
  console.log('ticketsSalesData', ticketsSalesData);

  //billingContactInformation default:
  const [billingContactInformation, setBillingContactInformation] = useState({
    invoiceCheckbox: false,
    ciOrNit: '',
    nameOrSocialReason: '',
    email: '',
    countryCode: '',
    mobile: '',
  });
  // console.log('billingContactInformation: ', billingContactInformation);

  let cisOrNits = passengersDataTable.map((passenger) => {
    return passenger.identificationNumber;
  });

  //Codigo de marcacion de paises:
  let countryCodes = countryData.map(
    (country) => `${country.dialCode} (${country.isoCode})`
  );
  // console.log('countryCodes', countryCodes);

  const completeNamesFunction = (identificationNumberParam) => {
    let completeNamesAux = passengersDataTable.map((passenger) => {
      if (passenger.identificationNumber === identificationNumberParam) {
        return `${passenger.lastName} ${passenger.firstName}`;
      } else {
        return 'vacio';
      }
    });
    let completeNames = completeNamesAux.filter(
      (passenger) => passenger !== 'vacio'
    );
    // console.log('completeNames', completeNames);
    return completeNames;
  };

  const inputChangeAutoComplete = (newValue, inputName) => {
    setBillingContactInformation((prevState) => ({
      ...prevState,
      [inputName]: newValue === null ? '' : newValue,
    }));
    let completeNames = completeNamesFunction(newValue);
    // Agregando Nombre:
    //Si completeNames.length===0, no se encontro el ci o nit en la lista de pasajeros por lo cual no se añade nameOrSocialReason
    setBillingContactInformation((prevState) => ({
      ...prevState,
      nameOrSocialReason: completeNames.length === 0 ? '' : completeNames[0],
    }));
  };
  const handleInputChange = (event) => {
    // Agregando Nombre:
    let findingPassenger = passengersDataTable.filter(
      (passenger) => passenger.identificationNumber === event.target.value
    );
    let completeNames = completeNamesFunction(event.target.value);
    // console.log('nameOrSocialReason: ', completeNames[0]);

    //Si findingPassenger.length===0, no se encontro el ci o nit en la lista de pasajeros por lo cual no se añade nameOrSocialReason
    setBillingContactInformation((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
      nameOrSocialReason: findingPassenger.length === 0 ? '' : completeNames[0],
    }));
  };

  const handleInputChangeEmail = (event) => {
    // console.log(event.target.name, ':', event.target.value);
    setBillingContactInformation((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const inputChangeNameOrSocialReason = (event) => {
    let passanger = passengersDataTable.filter(
      (passenger) =>
        `${passenger.lastName} ${passenger.firstName}` === event.target.value
    );
    let identificationNumber =
      passanger[0] === undefined ? '' : passanger[0].identificationNumber;
    // console.log(
    //   'identificationNumber',
    //   identificationNumber === '' ? 'vacio' : identificationNumber
    // );
    setBillingContactInformation((prevState) => ({
      ...prevState,
      ciOrNit:
        identificationNumber === '' ? prevState.ciOrNit : identificationNumber,
      //Si identificationNumber === '' entonces se ingresa un nuevo nombre y por ende se conserva el CiOrNit que se puso anteriormente
      [event.target.name]: event.target.value,
    }));
  };

  //Actualizar OccupiedSeat:
  const updateOccupiedSeatAux = () => {
    passengersDataTable.map((passenger) =>
      updateOccupiedSeat({
        branchNumber,
        dataBusTravel,
        seatId: passenger.id,
        seatState: 'vendido',
        identificationNumberUser,
      })
    );
  };

  return (
    <>
      <SalesAmountData passengersDataTable={passengersDataTable} />
      <Background>
        <HeaderContainer>
          <HeaderTitle>
            <span>Informacion de contacto</span>
          </HeaderTitle>
        </HeaderContainer>
        <BodyContainer>
          <InvoiceCheckbox>
            <FormControlLabel
              className="check"
              control={
                <Checkbox
                  // sx={{ color: '#051E34' }}
                  checked={billingContactInformation.invoiceCheckbox}
                  onChange={(event) =>
                    setBillingContactInformation((prevState) => ({
                      ...prevState,
                      invoiceCheckbox: !prevState.invoiceCheckbox,
                    }))
                  }
                />
              }
              label="Facturar: "
              labelPlacement="start"
            />
          </InvoiceCheckbox>
          <InputCiOrNit>
            <Autocomplete
              value={billingContactInformation.ciOrNit}
              onChange={(event, newValue) => {
                inputChangeAutoComplete(newValue, 'ciOrNit');
              }}
              options={cisOrNits}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="input"
                  type="number"
                  variant="outlined"
                  label="CI/NIT:"
                  name="ciOrNit"
                  value={billingContactInformation.ciOrNit}
                  onChange={handleInputChange}
                />
              )}
            />
          </InputCiOrNit>

          <InputNameOrSocialReason>
            <TextField
              className="input"
              type="text"
              variant="outlined"
              label="Nombre/Rason social:"
              name="nameOrSocialReason"
              value={billingContactInformation.nameOrSocialReason}
              onChange={inputChangeNameOrSocialReason}
            />
          </InputNameOrSocialReason>
          <InputEmail>
            <TextField
              className="input"
              type="email"
              variant="outlined"
              label="Correo:"
              name="email"
              // error={true}
              value={billingContactInformation.email}
              onChange={handleInputChangeEmail}
            />
          </InputEmail>
          <InputCountryCode>
            <Autocomplete
              value={billingContactInformation.countryCode}
              // inputChangeAutoCompleteCountryCode(newValue, 'countryCode');
              onChange={(event, newValue) =>
                setBillingContactInformation((prevState) => ({
                  ...prevState,
                  countryCode: newValue === null ? '' : newValue,
                }))
              }
              id="countryCode"
              options={countryCodes}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="input"
                  type="text"
                  variant="outlined"
                  label="Codigo pais:"
                  name="countryCode"
                  value={billingContactInformation.countryCode}
                  onChange={(event) =>
                    setBillingContactInformation((prevState) => ({
                      ...prevState,
                      [event.target.name]: event.target.value,
                    }))
                  }
                />
              )}
            />
          </InputCountryCode>

          <InputMobile>
            <TextField
              className="input"
              type="number"
              variant="outlined"
              label="Celular:"
              name="mobile"
              value={billingContactInformation.mobile}
              onChange={(event) =>
                setBillingContactInformation((prevState) => ({
                  ...prevState,
                  [event.target.name]: event.target.value,
                }))
              }
            />
          </InputMobile>
          <Btn>
            {
              <PlainModalButton
                primaryBtnText="vender"
                dialogTitle="Esta seguro de realizar la venta?"
                dialogText="Asegurece de que la informacion del contacto sea correcta."
                closeBtnText="Atras"
                continueBtnText="Si, realizar venta"
                functionToExecute={saveTripsMade}
                functionParameters={{
                  billingContactInformation,
                  salesAmountData,
                  ticketsSalesData,
                }}
                secondFunctionToExecute={setShowSeatMap}
                secondFunctionParameters={showSeatMap}
                thirdFunctionToExecute={updateOccupiedSeatAux}
              />
            }
          </Btn>
        </BodyContainer>
      </Background>
    </>
  );
};

export { BillingRecord };
