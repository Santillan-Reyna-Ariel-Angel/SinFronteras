import { useState, useEffect } from 'react';
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { modulesFirebase } from './../../firebase-config';

const { fire_db } = modulesFirebase;

let branchTripsMade, setBranchTripsMade;

const branchTripsMadeAux = () => {
  let userEmail = sessionStorage.getItem('userEmail');
  if (userEmail !== null) {
    let user = query(
      ref(fire_db, 'users'),
      orderByChild('email'),
      equalTo(userEmail)
    );

    onValue(user, (userData) => {
      // console.log("userData", userData.val());

      let userKey = Object.keys(userData.val())[0];
      // console.log("userKey", userKey);

      let branchOfficeKey = userData.child(userKey).child('branchOffice').val();
      // console.log("branchOfficeKey", branchOfficeKey);

      let branchOffice_x = ref(fire_db, `branchOffices/${branchOfficeKey}/`);

      onValue(branchOffice_x, (branchOffice) => {
        // console.log("branchOffice.val()", branchOffice.val());
        let {
          branchInformation: { branchNumber },
        } = branchOffice.val();
        // console.log('branchNumber', branchNumber);

        let response = ref(fire_db, `tripsMade/branch_${branchNumber}`); //useBranchNumber
        onValue(response, (branch) => {
          setBranchTripsMade(branch.val());
        });
      });
    });
  }
};

export const useBranchTripsMade = () => {
  [branchTripsMade, setBranchTripsMade] = useState();

  useEffect(() => {
    branchTripsMadeAux();
  }, []);

  return { branchTripsMade };
};
