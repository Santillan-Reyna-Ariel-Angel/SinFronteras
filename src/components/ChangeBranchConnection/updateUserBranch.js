/*cod fire v9:*/
import { modulesFirebase } from '../../firebase-config.js';
import { ref, update } from 'firebase/database';
const { fire_db } = modulesFirebase;

export const updateUserBranch = (userData) => {
  if (userData !== 'sin cambios') {
    console.log('Se cambio la conexion de sucursal: ', userData);
    let { identificationNumber, branchNumberOrCode, branchOfficeName } =
      userData;

    update(ref(fire_db, `users/${identificationNumber}/`), {
      branchNumberOrCode,
      branchOfficeName,
    });
  } else {
    console.log('Sin cambios de conexión de sucursal');
  }
};
