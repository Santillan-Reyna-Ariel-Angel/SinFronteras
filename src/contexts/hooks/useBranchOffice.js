import { useState, useEffect } from "react";
import EventFirebase from "../../firebase-config";
const { firebase } = EventFirebase;

let data = sessionStorage.getItem("userEmail");

let branchOffice, setBranchOffice;

const branchOfficeAux = () => {
  console.log("sessionStorage:", data);

  // let mainRoute, emailPathWithAccess;
  // firebase
  //   .database()
  //   .ref("branchOffices")
  //   .on("value", (snapshot) => {
  //     Object.keys(snapshot.val()).map((key) => {
  //       firebase
  //         .database()
  //         .ref(`branchOffices/${key}/branchInformation/emailsWithAccess`)
  //         .orderByChild("email")
  //         .equalTo(data)
  //         .on("value", (snapshot) => {
  //           snapshot.forEach((code) => {
  //             // console.log("code.key:", code.key);
  //             mainRoute = `branchOffices/${key}/`;
  //             emailPathWithAccess = `${mainRoute}branchInformation/emailsWithAccess/${code.key}/email`;
  //             console.log("mainRoute:", mainRoute);
  //             console.log("emailPathWithAccess:", emailPathWithAccess);
  //           });
  //         });
  //     });
  //     firebase
  //       .database()
  //       .ref(mainRoute)
  //       .on("value", (snapshot) => {
  //         console.log("mainRoutesnapshot.val():", snapshot.val());
  //         setBranchOffice(snapshot.val());
  //       });
  //   });

  firebase
    .database()
    .ref("branchOffices/code1")
    .on("value", (snapshot) => {
      console.log("snapshot.val()", snapshot.val());
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
