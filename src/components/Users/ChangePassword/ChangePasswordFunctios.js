/*cod fire v9:*/
import { modulesFirebase } from '../../../firebase-config.js';
import { ref, update } from 'firebase/database';
import { encryptPasswordSync } from './../../globalFunctions.js';

const { fire_db } = modulesFirebase;

export const changePassword = ({
  identificationNumber,
  dataChangePassword,
}) => {
  // dataChangePassword:
  const { confirmNewPassword } = dataChangePassword;

  const encryptedPasswordSy = encryptPasswordSync(confirmNewPassword);
  console.log('Contraseña encriptada:', encryptedPasswordSy);

  /*cod new fire v9:*/
  update(ref(fire_db, `users/${identificationNumber}/`), {
    password: encryptedPasswordSy,
  });
};
