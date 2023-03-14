/*cod fire v9:*/
import { modulesFirebase } from './../../../firebase-config.js';
import { ref, update } from 'firebase/database';
const { fire_db } = modulesFirebase;

export const saveUser = ({
  basicInformation,
  formattedDate,
  sex,
  branchOffice,
  charge,
  status,
}) => {
  // basicInformation:
  const { names, surnames, identificationNumber, address, mobile, email } =
    basicInformation;

  // branchOffice:
  const { branchOfficeName, branchNumberOrCode } = branchOffice;
  const { chargeOfType } = charge;
  // status:
  const { statusType } = status;

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
    sex,
    status: statusType,
    surnames,
  });
};
