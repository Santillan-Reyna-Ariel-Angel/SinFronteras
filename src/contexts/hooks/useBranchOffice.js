import { useState, useEffect } from "react";
import EventFirebase from "../../firebase-config";
const { firebase } = EventFirebase;

let branchOffice, setBranchOffice;
const branchOfficeAux = () => {
  firebase
    .database()
    .ref("branchOffices/code1")
    .on("value", (snapshot) => {
      console.log(snapshot.val());
      setBranchOffice(snapshot.val());
    });
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
