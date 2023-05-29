/*cod fire v9:*/
import { modulesFirebase } from '../../../firebase-config.js';
import { ref, update } from 'firebase/database';
const { fire_db } = modulesFirebase;

export const changePassword = ({
  identificationNumber,
  dataChangePassword,
}) => {
  // dataChangePassword:
  const { confirmNewPassword } = dataChangePassword;

  /*cod new fire v9:*/
  update(ref(fire_db, `users/${identificationNumber}/`), {
    identificationNumber,
    password: confirmNewPassword,
  });
};
