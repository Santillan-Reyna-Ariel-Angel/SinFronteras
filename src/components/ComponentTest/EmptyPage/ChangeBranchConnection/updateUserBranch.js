/*cod fire v9:*/
import { modulesFirebase } from './../../../../firebase-config.js';
import { ref, update } from 'firebase/database';
const { fire_db } = modulesFirebase;

export const updateUserBranch = (userData) => {
  let { identificationNumber, branchNumberOrCode, branchOfficeName } = userData;

  update(ref(fire_db, `users/${identificationNumber}/`), {
    branchNumberOrCode,
    branchOfficeName,
    identificationNumber,
  });
};
