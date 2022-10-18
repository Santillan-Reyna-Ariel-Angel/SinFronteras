import React, { useContext } from 'react';

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

  const changeServiceStatus = (event, index) => {
    let busInBranch = event.target.checked;
    let state = busInBranch ? branchNumber : 'DISPONIBLE';
    // console.log('state', state);

    let selectedBus = { ...companyBusesArray[index], designatedBranch: state }; //Actualizamos la propiedad necesaria
    // console.log('selectedBus', selectedBus);

    //Llamar funcion firebase update:
    updateBusData(selectedBus);
  };

  console.log('companyBusesArray:', companyBusesArray);

  return (
    <>
      {companyBusesArray.map((bus, index) => (
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
                    //Para bloquear el check segun los casos
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
                <span>{`${bus.designatedBranch}`}</span>
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
