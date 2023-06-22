import { verifyPasswordSync } from './../globalFunctions';

export const validateUserAccess = ({
  allUserDataList,
  email,
  passwordInput,
}) => {
  // console.log('passwordInput', passwordInput);

  let userData = allUserDataList.filter((user) => user.email === email);

  if (userData.length === 0 || passwordInput === '') {
    console.log('No existe el usuario');
    return false;
  } else {
    const { password: hashedPassword, email: emailUserBd } = userData[0];

    let isEmailValid = emailUserBd === email;
    let isPasswordValid = verifyPasswordSync({ passwordInput, hashedPassword });

    let isValidUser = isEmailValid && isPasswordValid;

    return isValidUser;
  }
};

export const redirectToPageByCharge = ({ allUserDataForLoginList, email }) => {
  let userData = allUserDataForLoginList.filter((user) => user.email === email);
  const { charge } = userData[0];
  console.log('charge:', charge);

  if (charge === 'dueño') {
    window.location.assign('/conectar-sucursal'); //añade la nueva URL a la historia del navegador y la redirecciona cargando la pagina(necesario para firebase)
  }
  if (charge === 'adm-general') {
    window.location.assign('/conectar-sucursal'); //añade la nueva URL a la historia del navegador y la redirecciona cargando la pagina(necesario para firebase)
  }
  if (charge === 'adm-sucursal') {
    window.location.assign('/ventas/pasajes');
  }
  if (charge === 'secretaria(o)') {
    window.location.assign('/ventas/pasajes');
  }
  if (charge === 'boletero(a)') {
    window.location.assign('/ventas/pasajes');
  }
  if (charge === 'chofer') {
    window.location.assign('/reportes/lista-de-ventas');
  }
};
