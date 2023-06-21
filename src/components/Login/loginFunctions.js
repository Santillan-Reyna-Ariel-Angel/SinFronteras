import { verifyPasswordSync } from './../globalFunctions';

export const validateUserAccess = ({
  allUserDataList,
  email,
  passwordInput,
}) => {
  console.log('passwordInput', passwordInput);

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
