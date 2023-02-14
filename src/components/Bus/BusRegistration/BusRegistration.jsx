import React, { useState } from 'react';
// MUI:
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  //numberOfFloors:
  Radio,
  RadioGroup,
  FormControlLabel,
  // FormLabel,
  //Services:
  FormGroup,
  Checkbox,
} from '@mui/material';

//Styles:
import {
  Background,
  HeaderContainer,
  HeaderTitle,
  BodyContainer,
  EnrollmentStyle,
  FilingStyle,
  TypeOfBusStyle,
  TypeOfSeatsStyle,
  NumberOfSeatsStyle,
  StatusStyle,
  NumberOfFloorsText,
  NumberOfFloorsStyle,
  ServicesText,
  ServicesStyle,
  // IdentificationNumberDriver,
  Btn,
} from './BusRegistrationStyles';
//Contexts:
//Firebase Functions:
import { createBus } from './../Firebase/createBus';
//States:
//Components:
import { PlainModalButton } from './../../PlainModalButton/PlainModalButton';
//Others:
import { handleClose } from './../../DialogBasic/DialogBasic';

const departmentsList = [
  '(B) beni',
  '(C) cochabamba',
  '(H) chuquisaca',
  '(L) la paz',
  '(N) pando',
  '(O) oruro',
  '(P) potosi',
  '(S) santa cruz',
  '(T) tarija',
];

export const BusRegistration = ({ busProp }) => {
  console.log('busProp: ', busProp);

  let filingProp = busProp ? busProp.filing : '';
  let departamentoFiltrado = departmentsList.filter((departamento) =>
    departamento.includes(`(${filingProp})`)
  );
  console.log('departamentoFiltrado: ', departamentoFiltrado);

  let companyBusDefaultData = {
    designatedBranch: busProp ? busProp.designatedBranch : 'DISPONIBLE', //Necesario para listar buses por branch
    enrollment: busProp ? busProp.enrollment : '', //bus-001
    filing: busProp ? departamentoFiltrado[0] : '', //"H"  hacer coincidor con el formato
    identificationNumberDriver: busProp
      ? busProp.identificationNumberDriver
      : '',
    numberOfFloors: busProp ? busProp.numberOfFloors : 1,
    numberOfSeats: busProp ? busProp.numberOfSeats : 0, //multiplo de 3(1 piso) y 4 (2 pisos)
    services: busProp
      ? busProp.services
      : {
          bathroom: true,
          drinks: false,
          tv: true,
        },
    status: busProp ? busProp.status : '',
    typeOfBus: busProp ? busProp.typeOfBus : '',
    typeOfSeats: busProp ? busProp.typeOfSeats : '',
  };

  const [busData, setBusData] = useState(companyBusDefaultData);
  console.log('busData: ', busData);

  const typeOfBus = ['normal', 'leito'];

  const statusList = ['activo', 'inactivo', 'en mantenimiento'];

  const typeOfSeatsList = ['normal', 'semi-cama', 'cama'];

  const changeServiceStatus = (event) => {
    setBusData({
      ...busData,
      services: {
        ...busData.services,
        [event.target.name]: event.target.checked,
      },
    });
  };

  const componentDefaultData = () => {
    setBusData(companyBusDefaultData);
    handleClose();
  };
  return (
    <>
      <Background>
        <HeaderContainer>
          <HeaderTitle>
            <span>REGISTRO DE BUSES</span>
          </HeaderTitle>
        </HeaderContainer>

        <BodyContainer>
          {/* Matricula: */}
          <EnrollmentStyle>
            <TextField
              className="input"
              name="enrollment"
              label="Matricula"
              variant="outlined"
              value={busData.enrollment}
              disabled={busProp ? true : false}
              onChange={(event) =>
                setBusData({
                  ...busData,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </EnrollmentStyle>

          {/* Radicatoria: */}
          <FilingStyle>
            <FormControl className="input">
              <InputLabel>Radicatoria</InputLabel>
              <Select
                value={busData.filing}
                name="filing"
                onChange={(event) =>
                  setBusData({
                    ...busData,
                    [event.target.name]: event.target.value,
                  })
                }
              >
                {departmentsList.map((department, index) => (
                  <MenuItem key={index} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FilingStyle>

          {/* Tipo de bus: */}
          <TypeOfBusStyle>
            <FormControl className="input">
              <InputLabel>Tipo de bus</InputLabel>
              <Select
                value={busData.typeOfBus}
                name="typeOfBus"
                onChange={(event) =>
                  setBusData({
                    ...busData,
                    [event.target.name]: event.target.value,
                  })
                }
              >
                {typeOfBus.map((bus, index) => (
                  <MenuItem key={index} value={bus}>
                    {bus}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </TypeOfBusStyle>

          {/* Tipo de Asientos: */}
          <TypeOfSeatsStyle>
            <FormControl className="input">
              <InputLabel>Tipo de asientos</InputLabel>
              <Select
                value={busData.typeOfSeats}
                name="typeOfSeats"
                onChange={(event) =>
                  setBusData({
                    ...busData,
                    [event.target.name]: event.target.value,
                  })
                }
              >
                {typeOfSeatsList.map((typeOfSeat, index) => (
                  <MenuItem key={index} value={typeOfSeat}>
                    {typeOfSeat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </TypeOfSeatsStyle>

          {/* Cant. de Asientos: */}
          <NumberOfSeatsStyle>
            <TextField
              className="input"
              name="numberOfSeats"
              label="Cantidad de asientos"
              variant="outlined"
              value={busData.numberOfSeats}
              type="number"
              onChange={(event) =>
                setBusData({
                  ...busData,
                  [event.target.name]: parseInt(event.target.value),
                })
              }
            />
          </NumberOfSeatsStyle>

          {/* Estado: */}
          <StatusStyle>
            <FormControl className="input">
              <InputLabel>Estado del bus</InputLabel>
              <Select
                value={busData.status}
                name="status"
                onChange={(event) =>
                  setBusData({
                    ...busData,
                    [event.target.name]: event.target.value,
                  })
                }
              >
                {statusList.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </StatusStyle>

          {/* Cant pisos: */}
          <NumberOfFloorsText>
            <span>Numero de Pisos</span>
          </NumberOfFloorsText>

          <NumberOfFloorsStyle>
            <FormControl>
              {/* <FormLabel>Pisos:</FormLabel> */}
              <RadioGroup
                row={true}
                value={busData.numberOfFloors}
                onChange={(event) => {
                  setBusData({
                    ...busData,
                    numberOfFloors: parseInt(event.target.value),
                  });
                }}
              >
                <FormControlLabel
                  value={1}
                  control={<Radio size="small" />}
                  label="Unico"
                />
                <FormControlLabel
                  value={2}
                  control={<Radio size="small" />}
                  label="Doble"
                />
              </RadioGroup>
            </FormControl>
          </NumberOfFloorsStyle>

          {/* Servicios: */}
          <ServicesText>
            <span>Servicios</span>
          </ServicesText>

          <ServicesStyle>
            <FormControl>
              {/* <FormLabel>Servicios: </FormLabel> */}
              <FormGroup row={true}>
                {/* Baño: */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={busData.services.bathroom}
                      onChange={changeServiceStatus}
                      name="bathroom"
                    />
                  }
                  label="Baño"
                />
                {/* Bebidas: */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={busData.services.drinks}
                      onChange={changeServiceStatus}
                      name="drinks"
                    />
                  }
                  label="Bebidas"
                />
                {/* Tv: */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={busData.services.tv}
                      onChange={changeServiceStatus}
                      name="tv"
                    />
                  }
                  label="Tv"
                />
              </FormGroup>
            </FormControl>
          </ServicesStyle>

          {/* CI Chofer: NOTA, EL INGE OBSERVO QUITAR input CI.*/}
          {/* <IdentificationNumberDriver>
            <TextField
              className="input"
              name="identificationNumberDriver"
              label="Ci Chofer"
              variant="outlined"
              value={busData.identificationNumberDriver}
              type="number"
              onChange={(event) =>
                setBusData({
                  ...busData,
                  [event.target.name]: parseInt(event.target.value),
                })
              }
            />
          </IdentificationNumberDriver> */}

          <Btn>
            <PlainModalButton
              primaryBtnText="Registrar"
              dialogTitle="Registro de Buses"
              dialogText="Esta seguro de registrar este Bus?"
              closeBtnText="cancelar"
              continueBtnText="si"
              functionToExecute={createBus}
              functionParameters={busData}
              thirdFunctionToExecute={componentDefaultData}
            />
          </Btn>
        </BodyContainer>
      </Background>
    </>
  );
};
