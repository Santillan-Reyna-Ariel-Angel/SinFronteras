import React, { useState, useContext } from 'react';

//MUI:
import { Button, Checkbox } from '@mui/material/';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
// import NoTransferRoundedIcon from '@mui/icons-material/NoTransferRounded';

//Styles:
import {
  Background,
  BodyContainer,
  CheckboxBusIconStyle,
  EnrollmentStyle,
  BranchStyle,
  BtnUpdateDataStyle,
} from './BusCardStyles';
//Contexts:
import { ContextBranchOffice } from './../../../../contexts/ContextBranchOffice';
import { ContextCompanyBuses } from './../../../../contexts/ContextCompanyBuses';
//Firebase Functions:
import { updateBusData } from './../../Firebase/updateBusData';
//States:
//Components:
//Others:

let companyBusesDefault = [
  {
    designatedBranch: 'code1',
    enrollment: 'bus-001',
    filing: 'H',
    identificationNumberDriver: '',
    numberOfFloors: 1,
    numberOfSeats: 42,
    services: {
      bathroom: true,
      drinks: false,
      tv: true,
    },
    status: 'activo',
    typeOfBus: 'normal',
    typeOfSeats: 'semi-cama',
  },
  {
    designatedBranch: 'code2',
    enrollment: 'bus-002',
    filing: 'H',
    identificationNumberDriver: '',
    numberOfFloors: 1,
    numberOfSeats: 43,
    services: {
      bathroom: true,
      drinks: false,
      tv: true,
    },
    status: 'activo',
    typeOfBus: 'normal',
    typeOfSeats: 'semi-cama',
  },
  {
    designatedBranch: '',
    enrollment: 'bus-003',
    filing: 'H',
    identificationNumberDriver: '',
    numberOfFloors: 1,
    numberOfSeats: 36,
    services: {
      bathroom: true,
      drinks: false,
      tv: true,
    },
    status: 'activo',
    typeOfBus: 'normal',
    typeOfSeats: 'semi-cama',
  },
  {
    designatedBranch: '',
    enrollment: 'bus-004',
    filing: 'H',
    identificationNumberDriver: '',
    numberOfFloors: 1,
    numberOfSeats: 27,
    services: {
      bathroom: true,
      drinks: false,
      tv: true,
    },
    status: 'activo',
    typeOfBus: 'leito',
    typeOfSeats: 'cama',
  },
  {
    designatedBranch: '',
    enrollment: 'bus-005',
    filing: 'H',
    identificationNumberDriver: '',
    numberOfFloors: 1,
    numberOfSeats: 26,
    services: {
      bathroom: true,
      drinks: false,
      tv: true,
    },
    status: 'activo',
    typeOfBus: 'leito',
    typeOfSeats: 'cama',
  },
  {
    designatedBranch: 'code1',
    enrollment: 'bus-006',
    filing: 'H',
    identificationNumberDriver: '',
    numberOfFloors: 1,
    numberOfSeats: 29,
    services: {
      bathroom: true,
      drinks: false,
      tv: true,
    },
    status: 'activo',
    typeOfBus: 'leito',
    typeOfSeats: 'cama',
  },
  {
    designatedBranch: 'code2',
    enrollment: 'bus-008',
    filing: 'H',
    identificationNumberDriver: '',
    numberOfFloors: 2,
    numberOfSeats: 40,
    numberOfSeatsFirstFloor: 20,
    numberOfSeatsSecondFloor: 20,
    services: {
      bathroom: true,
      drinks: false,
      tv: true,
    },
    status: 'activo',
    typeOfBus: 'leito',
    typeOfSeats: 'cama',
  },
  {
    designatedBranch: '',
    enrollment: 'bus-aux',
    filing: 'C',
    identificationNumberDriver: '',
    numberOfFloors: 1,
    numberOfSeats: 39,
    services: {
      bathroom: true,
      drinks: false,
      tv: true,
    },
    status: 'activo',
    typeOfBus: 'normal',
    typeOfSeats: 'semi-cama',
  },
];

export const BusCard = () => {
  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  const {
    branchInformation: { branchNumber },
  } = branchOffice ? branchOffice : { branchInformation: { branchNumber: '' } };

  //ContextCompanyBuses:
  const companyBuses = useContext(ContextCompanyBuses);
  // console.log('companyBuses: ', companyBuses);

  // json to array:
  let companyBusesArray = [];
  for (let i in companyBuses) companyBusesArray.push(companyBuses[i]);
  // console.log('companyBusesArray', companyBusesArray);

  const [buses, setBuses] = useState(companyBusesArray);

  const changeServiceStatus = (event, index) => {
    let busInBranch = event.target.checked;
    let state = busInBranch ? branchNumber : 'DISPONIBLE';

    //tentativo a eliminar:
    setBuses(
      buses.map((bus) =>
        bus.enrollment === buses[index].enrollment
          ? { ...bus, designatedBranch: state }
          : bus
      )
    );
    console.log('2 buses[index]', buses[index]);
    updateBusData(buses[index]); //Actualiza en BD
    //llamar funcion firebase update:
    // IMPORTANTE:
    // 3) Revisar que no tengas bugs las ventas y los formularios
  };

  console.log('1 buses:', buses);

  return (
    <>
      {buses.map((bus, index) => (
        <>
          <Background>
            <BodyContainer>
              <CheckboxBusIconStyle>
                <Checkbox
                  checked={bus.designatedBranch === branchNumber ? true : false}
                  icon={
                    <DirectionsBusRoundedIcon
                      sx={{
                        color: `${
                          bus.designatedBranch === 'DISPONIBLE' ||
                          bus.designatedBranch === ''
                            ? 'black'
                            : 'red'
                        }`,
                      }}
                    />
                  } //Modificar para cambiar el color: ;
                  checkedIcon={
                    <DirectionsBusRoundedIcon sx={{ color: 'green' }} /> //#051E34
                  }
                  disableRipple //Anula el hover y efecto de ondas al hacer el check
                  disabled={
                    bus.designatedBranch === branchNumber ||
                    bus.designatedBranch === '' ||
                    bus.designatedBranch === 'DISPONIBLE'
                      ? false
                      : true
                  }
                  // size="medium"
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 50 },
                    //   '&:hover': { bgcolor: 'transparent' }, //hover transratente (innecesario se se usa la propiedad disableRipple)
                  }}
                  onChange={(event) => changeServiceStatus(event, index)}
                />
              </CheckboxBusIconStyle>

              <EnrollmentStyle>
                <pan>{`${bus.enrollment}`}</pan>
              </EnrollmentStyle>

              <BranchStyle>
                <span>{`${
                  bus.designatedBranch !== ''
                    ? bus.designatedBranch
                    : 'DISPONIBLE'
                }`}</span>
              </BranchStyle>
              <BtnUpdateDataStyle>
                <Button variant="contained" color="success" size="small">
                  Data
                </Button>
              </BtnUpdateDataStyle>
            </BodyContainer>
          </Background>
        </>
      ))}
    </>
  );
};
