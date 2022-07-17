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

const BillingRecord = ({ passengersDataTable }) => {
  //contex Data :
  const generalCompanyData = useContext(ContextGeneralCompanyData);
  const { billingInformation, companyName } = generalCompanyData
    ? generalCompanyData
    : { billingInformation: {} };
  console.log('Firebase billingInformation: ', billingInformation);
  //context BranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  const { branchInformation } = branchOffice
    ? branchOffice
    : { branchInformation: {} };
  let {
    branchNumber,
    location,
    departmentsContactNumbers: {
      informations: { telephone },
    },
  } = branchInformation;
  // console.log('T*', telephone);
  //context user:
  const userData = useContext(ContextUserData);
  let { names, surnames } = userData;

  let dataForPassengerTicketsAux2 = [
    {
      companyName: companyName ? companyName : 'Sin Fronteras',
      branchNumber: branchNumber,
      ticketNumber: '123456789',
      issuingUser: `${surnames} ${names}`, //usuario emisor
      companyPhone: telephone,
      origin: location, //esto deberia venir de la tabla pasajeros
      destiny: 'Santa Cruz', //esto deberia venir de la tabla pasajeros
      travelDate: '30/5/2022', //esto deberia venir de la tabla pasajeros
      DepartureTime: '20:30', //esto deberia venir de la tabla pasajeros
      lane: '0', //carril
      passengerName: 'Santillan Quispe Javier Angel', //esto deberia venir de la tabla pasajeros
      identificationNumber: '7896541', //esto deberia venir de la tabla pasajeros
      seat: '1', //esto deberia venir de la tabla pasajeros
      typeOfSeat: 'Semi-cama', //esto deberia venir de la tabla pasajeros
      price: '30', //esto deberia venir de la tabla pasajeros
      legend: 'Gracias por su compra, le deseamos un buen viaje.',
    },
  ];

  //billingContactInformation default:
  const [billingContactInformation, setBillingContactInformation] = useState({
    invoiceCheckbox: false,
    ciOrNit: '',
    nameOrSocialReason: '',
    email: '',
    countryCode: '',
    mobile: '',
  });
  console.log('billingContactInformation: ', billingContactInformation);

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
    console.log('completeNames', completeNames);

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

    console.log('nameOrSocialReason: ', completeNames[0]);
    //Si findingPassenger.length===0, no se encontro el ci o nit en la lista de pasajeros por lo cual no se añade nameOrSocialReason
    setBillingContactInformation((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
      nameOrSocialReason: findingPassenger.length === 0 ? '' : completeNames[0],
    }));
  };

  const handleInputChangeEmail = (event) => {
    console.log(event.target.name, '-', event.target.value);
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

  //SetFirebase:
  let pasajerosRegistrados = billingContactInformation;
  console.log('pasajerosRegistrados', pasajerosRegistrados);

  let dataForPassengerTicketsAux = [
    {
      companyName: 'Sin Fronteras',
      branchNumber: '1',
      ticketNumber: '123456789',
      issuingUser: 'Santillan Reyna Ariel Angel', //usuario emisor
      companyPhone: '46410523',
      origin: 'Sucre',
      destiny: 'Santa Cruz',
      travelDate: '30/5/2022',
      DepartureTime: '20:30',
      lane: '0', //carril
      passengerName: 'Santillan Quispe Javier Angel',
      identificationNumber: '7896541',
      seat: '1',
      typeOfSeat: 'Semi-cama',
      price: '30',
      legend: 'Gracias por su compra, le deseamos un buen viaje.',
    },
  ];

  return (
    <>
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
              />
            }
          </Btn>
        </BodyContainer>
      </Background>
    </>
  );
};

export { BillingRecord };
