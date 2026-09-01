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
import { ContextBranchTripsMade } from './../../../contexts/ContextBranchTripsMade';
import { ContextCompanyBuses } from './../../../contexts/ContextCompanyBuses';
//Firebase Functions:
import { saveTripsMade } from './../Events/Firebase/saveTripsMade';
import { updateOccupiedSeat } from './../Events/Firebase/updateOccupiedSeat';
import { updateTravelIncome } from './../Events/Firebase/updateTravelIncome';
//States:
import { showSeatMap, setShowSeatMap } from './../TravelCards/TravelCards'; //showSeatMap muestra o no el mapa de asientos(se usara al finalizar la venta)
import { salesAmountData } from './../SalesAmountData/SalesAmountData';
//Components:
import { PlainModalButton } from '../../PlainModalButton/PlainModalButton';
import { SalesAmountData } from '../SalesAmountData/SalesAmountData';
//Others:
import { countryData } from './countryData';
import { generateTicketNumber } from './Functions';
import { getSalesIncome } from './getSalesIncome';
import { getTravelIncomeBd } from './getTravelIncomeBd';
import { getSumIncomeFromBdAndSale } from './getSumIncomeFromBdAndSale';
import { Css_TextField_Select } from './../../constantData';

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

  //ContextCompanyBuses:
  const companyBuses = useContext(ContextCompanyBuses);
  let companyBusesAux = companyBuses ? companyBuses : {};
  console.log('companyBusesAux', companyBusesAux);

  const findBus = (busEnrollment) => {
    let busCurrent = companyBusesAux[busEnrollment];
    // console.log('busCurrent', busCurrent);
    return busCurrent;
  };

  //Props dataBusTravel:
  let {
    localityOfOrigin,
    destinationLocation,
    travelDate,
    departureTime,
    lane,
    // bus: { typeOfSeats, enrollment }, // busEnrollment se saca directamente de dataBusTravel
    busEnrollment,
  } = dataBusTravel;

  //Extraer datos necesarios del bus:
  let bus = findBus(busEnrollment);
  let { typeOfSeats, enrollment } = bus;

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

  //Prueba gnerateTravelIncomeForSale
  let salesIncome = getSalesIncome({ ticketsSalesData, salesAmountData });
  console.log('salesIncome', salesIncome);
  //Error: revisar getSalesIncome.js func incomeTicketsList()

  //Data para fireFunc:
  let updateTravelIncomeBd;
  //Funcion genera un array unico apartir de los parametros (bd , sale):
  const getIncomeTicketsFormat = ({ travelIncomeBd, incomeTickets }) => {
    let sumIncomeFromBdAndSale;
    if (travelIncomeBd.travelIncome.incomeTickets.length === 0) {
      // console.log('BD vacio');
      sumIncomeFromBdAndSale = [
        ...travelIncomeBd.travelIncome.incomeTickets,
        ...incomeTickets,
      ];
      return sumIncomeFromBdAndSale;
    } else {
      //console.log('BD con data');
      sumIncomeFromBdAndSale = getSumIncomeFromBdAndSale({
        bd: travelIncomeBd.travelIncome.incomeTickets,
        sale: incomeTickets,
      });
      // console.log('sumIncomeFromBdAndSale', sumIncomeFromBdAndSale);
      return sumIncomeFromBdAndSale;
    }
  };

  //Funcion que obtine el TotalAmountDiscounts apartir los datos (bd , sale):
  const getTotalAmountDiscounts = ({ travelIncomeBd }) => {
    console.log('salesAmountData', salesAmountData); //La 1ra vez siempre es undefined por que aun no se asigno un descuento

    let {
      travelIncome: { totalAmountDiscounts },
    } = travelIncomeBd;
    let totalAmountDiscountsBd =
      totalAmountDiscounts === '' ? 0 : parseFloat(totalAmountDiscounts);
    console.log('totalAmountDiscountsBd', totalAmountDiscountsBd);

    let newTotalAmountDiscounts;

    if (salesAmountData === undefined) {
      newTotalAmountDiscounts = totalAmountDiscounts; //Al no existir descuento solo se devuelve el dato de la BD
    } else {
      let { discount } = salesAmountData; //puede ser "" o int en algunos casos
      let discountSale = discount === '' ? 0 : parseFloat(discount);

      newTotalAmountDiscounts = totalAmountDiscountsBd + discountSale;
    }

    console.log('newTotalAmountDiscounts', newTotalAmountDiscounts);
    return newTotalAmountDiscounts;
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

    updateTravelIncomeBd = {
      travelIncome: {
        incomeTickets: getIncomeTicketsFormat({
          travelIncomeBd,
          incomeTickets,
        }),
        totalAmountDiscounts: getTotalAmountDiscounts({ travelIncomeBd }),
        totalAmountIncome:
          travelIncomeBd.travelIncome.totalAmountIncome + totalAmountIncome,
        totalAmountTickets:
          travelIncomeBd.travelIncome.totalAmountTickets + totalAmountTickets,
      },
      tripMadeKey: travelIncomeBd.tripMadeKey,
    };

    console.log('updateTravelIncomeBd', updateTravelIncomeBd);
  }

  //Func para ejecutar n Funciones que tengan parametros ya creados previamente:
  const executeNFunctions = () => {
    //Actualizar OccupiedSeat:
    passengersDataTable.map((passenger) =>
      updateOccupiedSeat({
        branchNumber,
        dataBusTravel,
        seatId: passenger.id,
        seatState: 'vendido',
        identificationNumberUser,
      })
    );

    //Actualizar ingresos de viaje
    updateTravelIncome({ branchNumber, updateTravelIncomeBd });
  };

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
                  size="small"
                  sx={{
                    '.MuiInputBase-root': {
                      fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                      fontWeight:
                        Css_TextField_Select.fontWeighScreenUpperW_768,
                      color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                      backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                    },
                  }}
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
              size="small"
              sx={{
                '.MuiInputBase-root': {
                  fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                  fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768,
                  color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                  backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                },
              }}
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
              size="small"
              sx={{
                '.MuiInputBase-root': {
                  fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                  fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768,
                  color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                  backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                },
              }}
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
                  size="small"
                  sx={{
                    '.MuiInputBase-root': {
                      fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                      fontWeight:
                        Css_TextField_Select.fontWeighScreenUpperW_768,
                      color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                      backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                    },
                  }}
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
              size="small"
              sx={{
                '.MuiInputBase-root': {
                  fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                  fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768,
                  color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                  backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                },
              }}
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
                thirdFunctionToExecute={executeNFunctions}
              />
            }
          </Btn>
        </BodyContainer>
      </Background>
    </>
  );
};

export { BillingRecord };
