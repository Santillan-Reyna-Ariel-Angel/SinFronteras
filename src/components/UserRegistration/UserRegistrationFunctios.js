/*cod fire v9:*/
import { modulesFirebase } from './../../firebase-config.js';
import { ref, set } from 'firebase/database';
const { fire_db } = modulesFirebase;

export const saveUser = (
  { names, surnames, ci, address, mobile, email },
  formattedDate,
  sex,
  branchOffice,
  charge,
  status
) => {
  // basicInformation-branchOffice
  const { branchOfficeName } = branchOffice;
  const { chargeOfType } = charge;
  // basicInformation-status
  const { statusType } = status;

  /*cod new fire v9:*/
  set(
    ref(fire_db, 'users/' + ci),
    {
      names,
      surnames,
      ci,
      address,
      mobile,
      email,
      formattedDate,
      sex,
      branchOfficeName,
      chargeOfType,
      statusType,
    },
    (error) => {
      if (error) {
        console.log('Error. Datos no guardados!!!', error);
        return 'error';
      } else {
        set(ref(fire_db, 'branchOffices/' + branchOfficeName), branchOffice);

        set(ref(fire_db, 'charges/' + chargeOfType), charge);

        set(ref(fire_db, 'status/' + statusType), status);

        console.log('Datos guardados exitosamente');
        return 'exitoso';
      }
    }
  );
};
