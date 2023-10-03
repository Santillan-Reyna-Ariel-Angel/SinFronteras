import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
//Estilos:
import {
  Background,
  ButtonEnter,
  Container,
  ContainerLogo,
  InputPassword,
  InputUser,
  TextRecoverPassword,
} from './loginStyles';
import { TextField, Button } from '@mui/material';
//context:
import { ContextAllUserDataForLogin } from './../../contexts/ContextAllUserDataForLogin';
// Others:
import { validateUserAccess, redirectToPageByCharge } from './loginFunctions';
// import { saveDataSessionStorage } from './../../contexts/saveDataSessionStorage';
//EventosFirebase:
// import { Auth } from '../../events/firebaseEvents';
import { Css_TextField_Select } from './../constantData';

const Login = () => {
  // ContextAllUserDataForLogin:
  const allUserDataForLogin = useContext(ContextAllUserDataForLogin);
  // console.log('allUserDataForLogin', allUserDataForLogin);
  // json to array:
  let allUserDataForLoginList = [];
  for (let i in allUserDataForLogin)
    allUserDataForLoginList.push(allUserDataForLogin[i]);
  // console.log('allUserDataForLoginList', allUserDataForLoginList);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [credentialError, setCredentialError] = useState(false);

  const sendLogin = async () => {
    let isValidateUserAccess = validateUserAccess({
      allUserDataList: allUserDataForLoginList,
      email,
      passwordInput: password,
    });
    console.log('isValidateUserAccess: ', isValidateUserAccess);

    //OTRA FORMA DE VALIDAR EL ACCESO:
    // console.log("sendLogin:", email, password);
    // const accessToken = await Auth(email, password);
    // console.log('****accessToken:', accessToken);
    // if (accessToken !== null && accessToken !== undefined){...}

    if (isValidateUserAccess) {
      sessionStorage.setItem('userEmail', email);
      // saveDataSessionStorage({ dataName: 'userEmail', newDataValue: email }); //NO FUNCIONA, al parecer al recargar(window.location.assign) se pierden los datos.
      redirectToPageByCharge({ allUserDataForLoginList, email });

      setCredentialError(false);
    } else {
      setCredentialError(true);
    }
  };

  return (
    <>
      <Background>
        <Container>
          <ContainerLogo />
          <InputUser>
            <TextField
              error={credentialError}
              type="email"
              id="user"
              className="input"
              required
              label="Corrreo..."
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
              size="small"
              sx={{
                '.MuiInputBase-root': {
                  fontSize: Css_TextField_Select.fontSize,
                },
              }}
            />
          </InputUser>
          <InputPassword>
            <TextField
              error={credentialError}
              type="password"
              className="input"
              id="password"
              required
              label="Contraseña..."
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
              size="small"
              sx={{
                '.MuiInputBase-root': {
                  fontSize: Css_TextField_Select.fontSize,
                },
              }}
            />
          </InputPassword>
          <TextRecoverPassword>
            <Link className="link" to="/recuperar-contrasenia">
              {credentialError ? 'Olvidaste tu contraseña?' : ''}
            </Link>
          </TextRecoverPassword>
          <ButtonEnter>
            <Button
              className="buttonEnter"
              variant="contained"
              size="medium"
              color="success"
              onClick={() => sendLogin()}
            >
              ingresar
            </Button>
          </ButtonEnter>
        </Container>
      </Background>
    </>
  );
};

export default Login;
