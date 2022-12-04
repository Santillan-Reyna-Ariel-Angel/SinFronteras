import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import { Checkbox, FormControlLabel } from '@mui/material';
//Styles:
import {
  Background,
  HeaderContainer,
  HeaderTitle,
  BodyContainer,
  // InvoiceCheckbox,
  InputCiOrNit,
  InputNameOrSocialReason,
  InputEmail,
  InputCountryCode,
  InputMobile,
  Btn,
} from './BillingRecordStyles';
//Contexts:
import { ContextGeneralCompanyData } from './../../../contexts/ContextGeneralCompanyData';
import { ContextBranchOffice } from './../../../contexts/ContextBranchOffice';
import { ContextUserData } from './../../../contexts/ContextUserData';
import { PlainModalButton } from '../../PlainModalButton/PlainModalButton';
import { ContextBranchTripsMade } from './../../../contexts/ContextBranchTripsMade';
//Firebase Functions:
import { saveTripsMade } from './../Events/Firebase/saveTripsMade';
import { updateOccupiedSeat } from './../Events/Firebase/updateOccupiedSeat';
// import { updateTravelIncome } from './../Events/Firebase/updateTravelIncome';
//States:
import { showSeatMap, setShowSeatMap } from './../TravelCards/TravelCards'; //showSeatMap muestra o no el mapa de asientos(se usara al finalizar la venta)
import { salesAmountData } from './../SalesAmountData/SalesAmountData';
//Components:
import { SalesAmountData } from '../SalesAmountData/SalesAmountData';
//Others:
import { countryData } from './countryData';
import { generateTicketNumber } from './Functions';
import { getSalesIncome } from './getSalesIncome';
import { getTravelIncomeBd } from './getTravelIncomeBd';

const BillingRecord = ({ passengersDataTable, dataBusTravel }) => {
  // console.log('***passengersDataTable', passengersDataTable);

  //ContextGeneralCompanyData :
  const generalCompanyData = useContext(ContextGeneralCompanyData);
  const {
    billingInformation: { legend },
    companyName,
  } = generalCompanyData ? generalCompanyData : { billingInformation: {} };

  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  const { branchInformation } = branchOffice
    ? branchOffice
    : { branchInformation: {} };
  let {
    branchNumber,
    branchContactNumbers: { telephone },
  } = branchInformation;

  //ContextUserData:
  const userData = useContext(ContextUserData);
  let {
    names,
    surnames,
    identificationNumber: identificationNumberUser,
  } = userData;

  //ContextBranchTripsMade:
  const branchTripsMade = useContext(ContextBranchTripsMade);
  // console.log('branchTripsMade', branchTripsMade);

  //Props dataBusTravel:
  let {
    localityOfOrigin,
    destinationLocation,
    travelDate,
    departureTime,
    lane,
    bus: { typeOfSeats, enrollment },
  } = dataBusTravel;

  let ticketsSalesData = passengersDataTable.map((ticketSold) => {
    let identificationNumber = ticketSold.identificationNumber;
    let ticketSoldAux = {
      companyName: companyName,
      branchNumber: branchNumber,
      ticketNumber: generateTicketNumber({
        identificationNumber,
        branchNumber,
      }), // Genera automaticamente
      issuingUser: `${surnames} ${names}`, //usuario emisor
      branchPhone: telephone,
      origin: localityOfOrigin,
      destiny: destinationLocation,
      travelDate: travelDate,
      departureTime: departureTime,
      lane: lane, //carril
      passengerFullName: `${ticketSold.lastName} ${ticketSold.firstName}`,
      typeOfDocument: ticketSold.typeOfDocument,
      identificationNumber: identificationNumber,
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
    // invoiceCheckbox: false, //Se quito por que no habra facturacion en este proyecto.
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

  const autoCompleteCiOrNit = (newValue, inputName) => {
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
  const handleInputChangeCiOrNit = (event) => {
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

  //Prueba gnerateTravelIncomeForSale
  let salesIncome = getSalesIncome({ ticketsSalesData, salesAmountData });
  console.log('salesIncome', salesIncome);

  //prueba funcs:
  const getIncomeTicketsFormat = ({ travelIncomeBd, incomeTickets }) => {
    if (travelIncomeBd.travelIncome.incomeTickets.length === 0) {
      console.log('BD vacio');
      return [...travelIncomeBd.travelIncome.incomeTickets, ...incomeTickets];
    } else {
      let incomeTicketsBdAux = travelIncomeBd.travelIncome.incomeTickets;
      // console.log('incomeTicketsBdAux', incomeTicketsBdAux);

      incomeTickets.forEach((incomeTicketSale) => {
        // considerar usar include() para: travelIncomeBd.travelIncome.incomeTickets o  incomeTickets

        let ind = travelIncomeBd.travelIncome.incomeTickets.findIndex(
          (incomeTicketBd) =>
            incomeTicketBd.priceTicket === incomeTicketSale.priceTicket
        );
        console.log('ind2', ind);

        if (ind !== -1) {
          //Encontro una coincidencia :
          console.log('incomeTicketSale if', incomeTicketSale);

          //1er Forma A:
          // let newData = {
          //   numTickets:
          //     incomeTicketsBdAux[ind].numTickets + incomeTicketSale.numTickets,
          //   priceTicket: incomeTicketsBdAux[ind].priceTicket,
          //   totalPrice:
          //     incomeTicketsBdAux[ind].totalPrice + incomeTicketSale.totalPrice,
          // };

          //2da Forma A:
          let newData = {
            numTickets: incomeTicketsBdAux[ind].numTickets + 1,
            priceTicket: incomeTicketsBdAux[ind].priceTicket,
            totalPrice:
              incomeTicketsBdAux[ind].totalPrice +
              parseFloat(incomeTicketSale.priceTicket),
          };

          // console.log('newData', newData);
          incomeTicketsBdAux[ind] = newData;
        } else {
          // Usar lo sig:
          // const pruebita1 = new Set([JSON.stringify({name:"crsitian", age:43})]);
          //pruebita1.add(JSON.stringify({name:"ariel", age:26}));
          // y por ultimo actualizar incomeTicketsBdAux
          console.log('incomeTicketSale else', incomeTicketSale);
          incomeTicketsBdAux.push(incomeTicketSale);
          // return incomeTicketSale;
        }
      });

      console.log('incomeTicketsBdAux', incomeTicketsBdAux);
      return ['no esta vacio'];
    }
  };
  //Prueba getTravelIncomeBd
  if (ticketsSalesData.length > 0) {
    let { tripMadeKey } = salesIncome;
    // console.log('tripMadeKey', tripMadeKey);

    let { [tripMadeKey]: tripMadeKeyData } =
      branchTripsMade !== undefined ? branchTripsMade : {};
    // console.log('tripMadeKeyData', tripMadeKeyData);

    let travelIncomeBd = getTravelIncomeBd(tripMadeKeyData);
    // console.log('travelIncomeBd', travelIncomeBd);
    //update getTravelIncomeBd
    let { incomeTickets, totalAmountIncome, totalAmountTickets } = salesIncome;

    let updateTravelIncomeBd = {
      travelIncome: {
        incomeTickets: getIncomeTicketsFormat({
          travelIncomeBd,
          incomeTickets,
        }),
        totalAmountIncome:
          travelIncomeBd.travelIncome.totalAmountIncome + totalAmountIncome,
        totalAmountTickets:
          travelIncomeBd.travelIncome.totalAmountTickets + totalAmountTickets,
      },
      tripMadeKey: travelIncomeBd.tripMadeKey,
    };

    console.log('updateTravelIncomeBd', updateTravelIncomeBd);
  }

  return (
    <>
      <SalesAmountData passengersDataTable={passengersDataTable} />
      <Background>
        <HeaderContainer>
          <HeaderTitle>
            <span>INFORMACION DE CONTACTO</span>
          </HeaderTitle>
        </HeaderContainer>
        <BodyContainer>
          {/* <InvoiceCheckbox>
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
          </InvoiceCheckbox> */}
          <InputCiOrNit>
            <Autocomplete
              value={billingContactInformation.ciOrNit}
              onChange={(event, newValue) => {
                autoCompleteCiOrNit(newValue, 'ciOrNit');
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
                  onChange={handleInputChangeCiOrNit}
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
