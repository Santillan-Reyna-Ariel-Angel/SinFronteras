import React, { useContext } from 'react';

//MUI:
import { Checkbox } from '@mui/material/';
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
  BtnDeleteBusStyle,
} from './BusCardStyles';
//Contexts:
import { ContextBranchOffice } from './../../../../contexts/ContextBranchOffice';
import { ContextCompanyBuses } from './../../../../contexts/ContextCompanyBuses';
//Firebase Functions:
import { DialogBasic } from '../../../DialogBasic/DialogBasic';
import { deleteBus } from '../../Firebase/deleteBus';
import { create_update_Bus } from '../../Firebase/create_update_Bus';
//States:
//Components:
import { BusRegistration } from './../../BusRegistration/BusRegistration';
import { PlainModalButton } from '../../../PlainModalButton/PlainModalButton';

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

  const changeDesignatedBranch = (event, index) => {
    let busInBranch = event.target.checked;
    let state = busInBranch ? branchNumber : 'DISPONIBLE';
    // console.log('state', state);

    let selectedBus = { ...companyBusesArray[index], designatedBranch: state }; //Actualizamos la propiedad necesaria
    // console.log('selectedBus', selectedBus);

    //Llamar funcion  que cambia la designacion de sucursal:
    create_update_Bus(selectedBus);
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
                  onChange={(event) => changeDesignatedBranch(event, index)}
                />
              </CheckboxBusIconStyle>

              <EnrollmentStyle>
                <pan>{`${bus.enrollment}`}</pan>
              </EnrollmentStyle>

              <BranchStyle>
                <span>{`${bus.designatedBranch}`}</span>
              </BranchStyle>
              <BtnUpdateDataStyle>
                <DialogBasic
                  primaryBtnText="editar"
                  componentView={<BusRegistration busProp={bus} />}
                />
              </BtnUpdateDataStyle>

              <BtnDeleteBusStyle>
                <PlainModalButton
                  primaryBtnText="eliminar"
                  dialogTitle="Lista de buses"
                  dialogText={`Esta seguro de eliminar este Bus (${bus.enrollment})?`}
                  closeBtnText="cancelar"
                  continueBtnText="si"
                  functionToExecute={deleteBus}
                  functionParameters={bus.enrollment}
                  primaryBtnColor="error"
                />
              </BtnDeleteBusStyle>
            </BodyContainer>
          </Background>
        </>
      ))}
    </>
  );
};
