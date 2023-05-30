import React, { useState, useContext, useEffect } from 'react';
//MUI-general:
import {
  TextField,
  //   Button,
} from '@mui/material';

//Styles:
import {
  Background,
  HeaderContainer,
  HeaderTitle,
  BodyContainer,
  ///
  PasswordIconStyle,
  CurrentPassword,
  NewPassword,
  ConfirmNewPassword,
  BtnRegistrer,
} from './ChangePasswordStyles';
//Contexts:
import { ContextUserData } from './../../../contexts/ContextUserData';

//Firebase Functions:
import { changePassword } from './ChangePasswordFunctios';
//Others:
// import { handleClose } from './../../DialogBasic/DialogBasic';
import { PlainModalButton } from './../../PlainModalButton/PlainModalButton';
import { verifyPasswordSync } from './../../globalFunctions';

export const ChangePassword = () => {
  //ContextAllUserData:
  const userData = useContext(ContextUserData);
  console.log('userData: ', userData);

  const { identificationNumber, password } = userData ? userData : {};

  // dataChangePassword:
  let defaultDataChangePassword = {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const [dataChangePassword, setDataChangePassword] = useState(
    defaultDataChangePassword
  );
  console.log('dataChangePassword: ', dataChangePassword);

  const [isDataValidate, setIsDataValidate] = useState(false);
  console.log('isDataValidate', isDataValidate);

  // verificar passwords:
  const validatePasswords = () => {
    if (
      dataChangePassword.password !== '' &&
      dataChangePassword.newPassword !== '' &&
      dataChangePassword.confirmNewPassword !== ''
    ) {
      // Validadcion de contraseña actual (hash) :
      const passwordInput = dataChangePassword.password;
      const hashedPassword = password;
      // IMPORTANTE: passwordInput!=="", sino da error la funcion verifyPasswordSync()
      const isMatch = verifyPasswordSync({ passwordInput, hashedPassword });
      console.log('La contraseña coincide:', isMatch);

      const currentPass = isMatch;

      const newPass =
        dataChangePassword.newPassword === dataChangePassword.confirmNewPassword
          ? true
          : false;

      const validateResponse = currentPass && newPass;
      //   console.log('validateResponse', validateResponse);
      return validateResponse;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const responseValidate = validatePasswords();
    setIsDataValidate(responseValidate);
  }, [dataChangePassword]);

  const listenDataChangePassword = (event) => {
    setDataChangePassword({
      ...dataChangePassword,
      [event.target.name]: event.target.value,
    });

    // let responseValidate = validatePasswords();
    // console.log('responseValidate', responseValidate);
    // setIsDataValidate(responseValidate);
  };

  //Data and Functions MUI:
  const muiTextField = ({
    ClassName = '',
    Label,
    Type = 'password',
    Name,
    Value,
    OnChange = listenDataChangePassword,
    Margin = 'none',
    Variant = 'outlined',
    Disabled = false,
  }) => {
    return (
      <>
        <TextField
          className={ClassName}
          label={Label}
          type={Type}
          name={Name}
          value={Value}
          onChange={OnChange}
          margin={Margin}
          variant={Variant}
          disabled={Disabled}
          required
          inputProps={{ style: { color: 'black' } }} // Necesario si <DialogBasic/> llama a este componente
        />
      </>
    );
  };

  //componentDefaultData:
  const componentDefaultData = () => {
    setDataChangePassword(defaultDataChangePassword);
  };

  return (
    <>
      <Background>
        {/* <br />
        <br /> */}
        <HeaderContainer>
          <HeaderTitle>
            <span>CAMBIAR CONTRASEÑA</span>
          </HeaderTitle>
        </HeaderContainer>
        <BodyContainer>
          <PasswordIconStyle />

          <CurrentPassword>
            {muiTextField({
              ClassName: 'input',
              Label: 'Contraseña actual',
              Name: 'password',
              Value: dataChangePassword.password,
            })}
          </CurrentPassword>

          <NewPassword>
            {muiTextField({
              ClassName: 'input',
              Label: 'Nueva contraseña',
              Name: 'newPassword',
              Value: dataChangePassword.newPassword,
            })}
          </NewPassword>

          <ConfirmNewPassword>
            {muiTextField({
              ClassName: 'input',
              Label: 'Confirmar nueva contraseña',
              Name: 'confirmNewPassword',
              Value: dataChangePassword.confirmNewPassword,
            })}
          </ConfirmNewPassword>

          {/*Boton Registrar:   */}

          <BtnRegistrer>
            <PlainModalButton
              primaryBtnText="cambiar"
              dialogTitle="CAMBIAR CONTRASEÑA"
              dialogText={`Esta seguro de cambiar su contraseña ?`}
              closeBtnText="atras"
              continueBtnText="si"
              functionToExecute={changePassword}
              functionParameters={{
                identificationNumber,
                dataChangePassword,
              }}
              thirdFunctionToExecute={componentDefaultData}
              disabledBtn={!isDataValidate}
            />
          </BtnRegistrer>
        </BodyContainer>
      </Background>
    </>
  );
};
