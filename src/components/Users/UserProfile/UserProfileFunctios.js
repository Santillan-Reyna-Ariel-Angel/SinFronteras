/*cod fire v9:*/
import { modulesFirebase } from '../../../firebase-config.js';
import { ref, update } from 'firebase/database';
const { fire_db } = modulesFirebase;

export const saveUserProfile = ({ basicInformation }) => {
  // basicInformation:
  const {
    names,
    surnames,
    identificationNumber,
    address,
    mobile,
    email,
    charge,
  } = basicInformation;

  /*cod new fire v9:*/
  update(ref(fire_db, `users/${identificationNumber}/`), {
    names,
    surnames,
    identificationNumber,
    address,
    mobile,
    email,
    charge,
  });
};
