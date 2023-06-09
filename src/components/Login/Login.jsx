import React, { useState, useContext, useEffect } from 'react';
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
import { ContextAllUserData } from './../../contexts/ContextAllUserData';
// Others:
import { validateUserAccess } from './loginFunctions';
import { saveDataSessionStorage } from './../../contexts/saveDataSessionStorage';

//EventosFirebase;
import { Auth } from '../../events/firebaseEvents';

const Login = () => {
  sessionStorage.setItem('userEmail', 'dueño@gmail.com');

  // ContextAllUserData:
  const allUserData = useContext(ContextAllUserData);
  console.log('allUserData', allUserData);
  // json to array:
  let allUserDataList = [];
  for (let i in allUserData) allUserDataList.push(allUserData[i]);
  console.log('allUserDataList', allUserDataList);

  // const [allUserDataListState, setAllUserDataListState] =
  //   useState(allUserDataList);

  // const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [credentialError, setCredentialError] = useState(false);

  const sendLogin = async () => {
    ////////////////

    let isValidateUserAccess = validateUserAccess({
      allUserDataList,
      email,
      passwordInput: password,
    });
    console.log('isValidateUserAccess: ', isValidateUserAccess);

    ///////////////////

    // console.log("sendLogin:", email, password);
    // const accessToken = await Auth(email, password);
    // console.log('****accessToken:', accessToken);

    // if (accessToken !== null && accessToken !== undefined)
    if (isValidateUserAccess) {
      sessionStorage.setItem('userEmail', email);
      // saveDataSessionStorage({ dataName: 'userEmail', newDataValue: email });

      if (email === 'dueño@gmail.com' || email === 'admgeneral@gmail.com') {
        window.location.assign('/conectar-sucursal'); //añade la nueva URL a la historia del navegador y la redirecciona cargando la pagina(necesario para firebase)
      } else {
        if (email.includes('chofer')) {
          window.location.assign('/reportes/lista-de-ventas'); //añade la nueva URL a la historia del navegador y la redirecciona cargando la pagina(necesario para firebase)
        } else {
          window.location.assign('/ventas/pasajes'); //añade la nueva URL a la historia del navegador y la redirecciona cargando la pagina(necesario para firebase)
        }
      }
      setCredentialError(false);
    } else {
      setCredentialError(true);
    }
  };

  ///new code:
  // useEffect(() => {
  //   if (email !== '') {
  //     console.log('sesion email', email);
  //     // sessionStorage.setItem('userEmail', email);
  //     saveDataSessionStorage({ dataName: 'userEmail', newDataValue: email });
  //   }
  // }, [email]);

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
            />
          </InputPassword>
          <TextRecoverPassword>
            <Link className="link" to="/recuperar-contraseña">
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
