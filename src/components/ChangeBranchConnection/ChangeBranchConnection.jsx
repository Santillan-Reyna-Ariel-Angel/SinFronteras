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
import { Css_TextField_Select } from './../constantData';

export const ChangeBranchConnection = () => {
  //ContextUserData:
  const userData = useContext(ContextUserData);
  console.log('userData', userData);

  //ContextAllBranchOffices:
  const allBranchOffices = useContext(ContextAllBranchOffices);
  console.log('allBranchOffices', allBranchOffices);

  // json to array:
  let allBranchOfficesList = [];
  for (let i in allBranchOffices)
    allBranchOfficesList.push(allBranchOffices[i]);

  let branchKeysList = allBranchOffices ? Object.keys(allBranchOffices) : [];
  console.log('branchKeysList', branchKeysList);

  let selectOptionsList = branchKeysList.map((branchKey) => {
    let { location, name } = allBranchOffices[branchKey].branchInformation;
    let selectOption = `${location}-${name}`;
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

    let brachFiltered = allBranchOfficesList.filter(
      (branch) => branch.branchInformation.location === valuesList[0]
    );
    let branchNumber = brachFiltered[0]?.branchInformation?.branchNumber;

    setCurrentBranch({
      identificationNumber: userData.identificationNumber,
      branchNumberOrCode: branchNumber,
      branchOfficeName: valuesList[1],
      selectOption: `${valuesList[0]}-${valuesList[1]}`,
    });
  };

  console.log('currentBranch', currentBranch);

  //Datos de sucursal actual:
  let { location: locationBranch = '', name: nameBranch = '' } =
    allBranchOffices
      ? allBranchOffices[userData?.branchNumberOrCode]?.branchInformation
      : {};

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
              <strong>{`${locationBranch} ${nameBranch}`}</strong>
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
                size="small"
                sx={{
                  '.MuiSelect-select': {
                    fontSize: Css_TextField_Select.fontSizeScreenUpperW_768,
                    fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768,
                    color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                    backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                  },
                }}
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
