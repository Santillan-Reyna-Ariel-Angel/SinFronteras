import React, { useContext, useState } from 'react';

// MUI:
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
//Styles:
import {
  Background,
  HeaderContainer,
  HeaderTitle,
  BodyContainer,
  CurrentConnectionText,
  ChangeConnectionText,
  ChangeConnectionStyle,
  Btn,
} from './ChangeBranchConnectionStyles';
import { PlainModalButton } from '../PlainModalButton/PlainModalButton';

//Contexts:
import { ContextUserData } from '../../contexts/ContextUserData';
import { ContextAllBranchOffices } from '../../contexts/ContextAllBranchOffices';
//Firebase Functions:
import { updateUserBranch } from './updateUserBranch';
//States:
//Components:
//Others:

export const ChangeBranchConnection = () => {
  //ContextUserData:
  const userData = useContext(ContextUserData);
  console.log('userData', userData);

  //ContextAllBranchOffices:
  const allBranchOffices = useContext(ContextAllBranchOffices);
  console.log('allBranchOffices', allBranchOffices);
  let branchKeysList = allBranchOffices ? Object.keys(allBranchOffices) : [];
  console.log('branchKeysList', branchKeysList);

  let selectOptionsList = branchKeysList.map((branchKey) => {
    let { branchNumber, name } = allBranchOffices[branchKey].branchInformation;
    let selectOption = `${branchNumber}-${name}`;
    return selectOption;
  });
  console.log('selectOptionsList', selectOptionsList);

  let currentBranchDefault = {
    identificationNumber: userData ? userData.identificationNumber : '',
    branchNumberOrCode: userData ? userData.branchNumberOrCode : '',
    branchOfficeName: userData ? userData.branchOfficeName : '',
    selectOption: userData
      ? `${userData.branchNumberOrCode}-${userData.branchOfficeName}`
      : '',
  };

  const [currentBranch, setCurrentBranch] = useState(currentBranchDefault);

  const updateBranchData = (event) => {
    let value = event.target.value;
    let valuesList = value.split('-');

    setCurrentBranch({
      identificationNumber: userData.identificationNumber,
      branchNumberOrCode: valuesList[0],
      branchOfficeName: valuesList[1],
      selectOption: `${valuesList[0]}-${valuesList[1]}`,
    });
  };

  console.log('currentBranch', currentBranch);

  const componentDefaultData = () => {
    setCurrentBranch(currentBranchDefault);
    //REDIRECIONAR PAGINA:
    window.location.assign('/ventas/pasajes'); //añade la nueva URL a la historia del navegador y la redirecciona cargando la pagina(necesario para firebase)
  };

  return (
    <>
      <Background>
        <HeaderContainer>
          <HeaderTitle>
            <span>CONEXION A SUCURSAL</span>
          </HeaderTitle>
        </HeaderContainer>

        <BodyContainer>
          <CurrentConnectionText>
            <span>
              Usted esta conectado actualmente a:{' '}
              <strong>{userData ? userData.branchOfficeName : ''}</strong>
            </span>
          </CurrentConnectionText>

          <ChangeConnectionText>
            <span>Si lo desea puede cambiar de sucursal:</span>
          </ChangeConnectionText>

          <ChangeConnectionStyle>
            <FormControl className="input">
              <InputLabel>Sucursal</InputLabel>
              <Select
                value={currentBranch.selectOption}
                name="branchData"
                onChange={(event) => updateBranchData(event)}
              >
                {selectOptionsList.map((selectOption, index) => (
                  <MenuItem key={index} value={selectOption}>
                    {selectOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ChangeConnectionStyle>

          <Btn>
            <PlainModalButton
              primaryBtnText="Continuar"
              dialogTitle="Conexión a sucursal"
              dialogText={`Esta seguro de conectarse a esta sucursal?`}
              closeBtnText="cancelar"
              continueBtnText="si"
              functionToExecute={updateUserBranch}
              functionParameters={
                currentBranch.branchNumberOrCode !== ''
                  ? currentBranch
                  : 'sin cambios'
              }
              thirdFunctionToExecute={componentDefaultData}
            />
          </Btn>
        </BodyContainer>
      </Background>
    </>
  );
};
