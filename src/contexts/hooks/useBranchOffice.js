import { useState, useEffect } from "react";
import EventFirebase from "../../firebase-config";
const { firebase } = EventFirebase;

let branchOffice, setBranchOffice;

const branchOfficeAux = () => {
  let userEmail = sessionStorage.getItem("userEmail");
  console.log("sessionStorage:", userEmail);

  if (userEmail !== null) {
    firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(userEmail)
      .on("value", (userData) => {
        console.log("userData", userData.val());

        let userKey = Object.keys(userData.val())[0];
        console.log("userKey", userKey);
        let branchOfficeKey = userData
          .child(userKey)
          .child("branchOffice")
          .val();
        console.log("branchOfficeKey", branchOfficeKey);

        firebase
          .database()
          .ref("branchOffices")
          .child(branchOfficeKey)
          .on("value", (branchOffice) => {
            console.log("branchOffice.val()", branchOffice.val());
            setBranchOffice(branchOffice.val());
          });
      });
  }
};
export const useBranchOffice = () => {
  [branchOffice, setBranchOffice] = useState();
  useEffect(() => {
    branchOfficeAux();
  }, []);

  return {
    branchOffice,
  };
};
