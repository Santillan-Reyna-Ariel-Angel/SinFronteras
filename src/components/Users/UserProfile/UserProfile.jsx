import React, { useState, useContext } from 'react';
//MUI-general:
import {
  TextField,
  //   Button,
} from '@mui/material';
// import Stack from '@mui/material/Stack';

//Styles:
import {
  Background,
  HeaderContainer,
  HeaderTitle,
  BodyContainer,
  InputAddress,
  InputCi,
  InputEmail,
  InputMobile,
  ProfileIconStyle,
  FullNameAndChargeText,
  BtnRegistrer,
} from './UserProfileStyles';
//Contexts:
import { ContextUserData } from './../../../contexts/ContextUserData';

//Firebase Functions:
import { saveUserProfile } from './UserProfileFunctios';
//Others:
// import { handleClose } from './../../DialogBasic/DialogBasic';
import { PlainModalButton } from './../../PlainModalButton/PlainModalButton';
import { Css_TextField_Select } from './../../constantData';

export const UserProfile = () => {
  //ContextAllUserData:
  const userData = useContext(ContextUserData);
  console.log('userData: ', userData);

  const {
    names,
    surnames,
    identificationNumber,
    address,
    mobile,
    email,
    charge,
  } = userData ? userData : {};

  // basicInformation:
  let defaultDataBasicInformation = {
    names: names ? names : '',
    surnames: surnames ? surnames : '',
    identificationNumber: identificationNumber ? identificationNumber : '',
    address: address ? address : '',
    mobile: mobile ? mobile : '',
    email: email ? email : '',
    charge: charge ? charge : '',
  };

  const [basicInformation, setBasicInformation] = useState(
    defaultDataBasicInformation
  );
  console.log('basicInformation: ', basicInformation);

  const changeBasicInformation = (event) => {
    //toLowerCase() para convertir las entradas en minuscula
    const property = event.target.name;
    if (property === 'email') {
      setBasicInformation({
        ...basicInformation,
        [event.target.name]: event.target.value,
      });
    } else {
      setBasicInformation({
        ...basicInformation,
        [event.target.name]: event.target.value.toLowerCase(),
      });
    }
  };

  //componentDefaultData:
  const componentDefaultData = () => {
    setBasicInformation(basicInformation); // tenemos que mantener la ultima informacion introducida por el usuario
  };

  //Data and Functions MUI:
  const muiTextField = ({
    ClassName = '',
    Label,
    Type = 'text',
    Name,
    Value,
    OnChange = changeBasicInformation,
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
          inputProps={{ style: { color: 'black' } }} // Necesario si <DialogBasic/> llama a este componente
          size="small"
          sx={{
            '.MuiInputBase-root': {
              fontSize: Css_TextField_Select.fontSize,
              // fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768, // o 500
              color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
              backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
            },
          }}
        />
      </>
    );
  };

  return (
    <>
      <Background>
        {/* <br />
        <br /> */}

        {/* <Stack
          direction="column"
          // alignItems="center"
          justifyContent="center"
        > */}
        <HeaderContainer>
          <HeaderTitle>
            <span>MI PERFIL</span>
          </HeaderTitle>
        </HeaderContainer>
        <BodyContainer>
          <ProfileIconStyle />

          <FullNameAndChargeText>
            <span>{`${basicInformation.surnames} ${basicInformation.names}`}</span>
            <br />
            <span>{`(${basicInformation.charge}) `}</span>
          </FullNameAndChargeText>

          <InputCi>
            {muiTextField({
              ClassName: 'input',
              Label: 'Carnet de identidad',
              Type: 'number',
              Name: 'identificationNumber',
              Value: basicInformation.identificationNumber,
              Disabled: true,
            })}
          </InputCi>

          <InputAddress>
            {muiTextField({
              ClassName: 'input',
              Label: 'Domicilio',
              Name: 'address',
              Value: basicInformation.address,
            })}
          </InputAddress>
          <InputMobile>
            {muiTextField({
              ClassName: 'input',
              Label: 'Celular',
              Type: 'number',
              Name: 'mobile',
              Value: basicInformation.mobile,
            })}
          </InputMobile>
          <InputEmail>
            {muiTextField({
              ClassName: 'input',
              Label: 'Correo',
              Type: 'email',
              Name: 'email',
              Value: basicInformation.email,
            })}
          </InputEmail>

          {/*Boton Registrar:   */}
          <BtnRegistrer>
            <PlainModalButton
              primaryBtnText="actualizar"
              dialogTitle="MI PERFIL"
              dialogText={`Esta seguro de actualizar sus datos de perfil ?`}
              closeBtnText="atras"
              continueBtnText="si"
              functionToExecute={saveUserProfile}
              functionParameters={{
                basicInformation,
              }}
              thirdFunctionToExecute={componentDefaultData}
            />
          </BtnRegistrer>
        </BodyContainer>
        {/* </Stack> */}
      </Background>
    </>
  );
};
