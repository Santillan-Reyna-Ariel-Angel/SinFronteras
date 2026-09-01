import { useState, useEffect } from 'react';
/*cod fire v9:*/
import {
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
  // child,
} from 'firebase/database';
import { modulesFirebase } from '../../firebase-config.js';
//Functions:
import { saveDataSessionStorage } from '../saveDataSessionStorage';

const { fire_db } = modulesFirebase;

let allBranchOffices, setAllBranchOffices;

const allBranchOfficesAux = () => {
  let userEmail = sessionStorage.getItem('userEmail');
  // console.log("sessionStorage_useBranchOffice:", userEmail);

  if (userEmail !== null) {
    const response = query(
      ref(fire_db, 'users'),
      orderByChild('email'),
      equalTo(userEmail)
    );
    onValue(response, (userData) => {
      // console.log("userData", userData.val());

      // let userKey = Object.keys(userData.val())[0];
      // console.log("userKey", userKey);

      let branchOffices_all = ref(fire_db, `branchOffices/`);

      onValue(branchOffices_all, (allBranchOffices) => {
        // console.log("allBranchOffices.val()", allBranchOffices.val());
        setAllBranchOffices(allBranchOffices.val());

        //GUARDAR INFO EN sessionStorage:
        saveDataSessionStorage({
          dataName: 'allBranchOffices',
          newDataValue: allBranchOffices.val(),
        });
      });
    });
  }
};

export const useAllBranchOffices = () => {
  [allBranchOffices, setAllBranchOffices] = useState();
  useEffect(() => {
    allBranchOfficesAux();
  }, []);

  return {
    allBranchOffices,
  };
};
