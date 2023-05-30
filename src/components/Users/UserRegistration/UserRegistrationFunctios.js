/*cod fire v9:*/
import { modulesFirebase } from './../../../firebase-config.js';
import { ref, update } from 'firebase/database';
import { encryptPasswordSync } from './../../globalFunctions.js';
const { fire_db } = modulesFirebase;

export const saveUser = ({
  basicInformation,
  formattedDate,
  sex,
  branchOffice,
  charge,
  status,
  isDataUpdate,
}) => {
  // basicInformation:
  const { names, surnames, identificationNumber, address, mobile, email } =
    basicInformation;

  // branchOffice:
  const { branchOfficeName, branchNumberOrCode } = branchOffice;
  const { chargeOfType } = charge;
  // status:
  const { statusType } = status;

  const encryptedPassword_Sync = encryptPasswordSync(identificationNumber);
  console.log('Contraseña encriptada:', encryptedPassword_Sync);

  if (isDataUpdate === false) {
    //Se Crea el usuario:

    /*cod new fire v9:*/
    update(ref(fire_db, `users/${identificationNumber}/`), {
      address,
      branchNumberOrCode,
      branchOfficeName, // posiblemente se usara
      charge: chargeOfType,
      dateOfBirth: formattedDate,
      email,
      identificationNumber,
      mobile,
      names,
      password: encryptedPassword_Sync,
      sex,
      status: statusType,
      surnames,
    });
    console.log('Se creo el usuario: ', identificationNumber);
  } else {
    //Los datos se actualizan (NO CAMBIAR PASSWORD):

    /*cod new fire v9:*/
    update(ref(fire_db, `users/${identificationNumber}/`), {
      address,
      branchNumberOrCode,
      branchOfficeName, // posiblemente se usara
      charge: chargeOfType,
      dateOfBirth: formattedDate,
      email,
      identificationNumber,
      mobile,
      names,
      // password: encryptedPassword_Sync,
      sex,
      status: statusType,
      surnames,
    });
    console.log('Se actualizo el usuario: ', identificationNumber);
  }
};
