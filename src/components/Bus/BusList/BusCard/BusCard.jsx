import React from 'react';

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
//Firebase Functions:
//States:
//Components:
//Others:
let companyBuses = [
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
  return (
    <>
      {companyBuses.map((bus, index) => (
        <>
          <Background key={index + 1}>
            <BodyContainer>
              <CheckboxBusIconStyle>
                <Checkbox
                  icon={<DirectionsBusRoundedIcon sx={{ color: 'black' }} />} //Modificar para cambiar el color
                  checkedIcon={<DirectionsBusRoundedIcon />}
                  disableRipple //Anula el hover y efecto de ondas al hacer el check
                  // size="medium"
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 50 },
                    //   '&:hover': { bgcolor: 'transparent' }, //hover transratente (innecesario se se usa la propiedad disableRipple)
                  }}
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
