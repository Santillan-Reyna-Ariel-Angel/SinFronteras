import { useState, useEffect } from "react";
import EventFirebase from "../../firebase-config";
const { firebase } = EventFirebase;

let branchOffice, setBranchOffice;

const branchOfficeAux = () => {
  let userEmail =
    sessionStorage.getItem("userEmail") !== null
      ? sessionStorage.getItem("userEmail")
      : "";

  // let userEmail = sessionStorage.getItem("userEmail");

  console.log("sessionStorage:", userEmail);

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
  //         .equalTo(userEmail)
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

  // if (userEmail !== null) {
  //   firebase
  //     .database()
  //     .ref("branchOffices")
  //     .orderByChild("users/email")
  //     // .equalTo(userEmail)
  //     .on("value", (snapshot) => {
  //       let key = Object.keys(snapshot.val());
  //       console.log("key", key);
  //       console.log("a", snapshot.val());
  //     });
  // }

  if (userEmail !== "" || userEmail !== null) {
    firebase
      .database()
      .ref("branchOffices")
      .orderByChild("users/email")
      .equalTo(userEmail) // solo me devolvera el objeto donde existe ese correo
      .on("value", (snapshot) => {
        console.log("snap", snapshot.val(), userEmail);
        Object.keys(snapshot.val()).map((x) => {
          firebase
            .database()
            .ref("branchOffices/" + x)
            .orderByChild("users/email")
            // .equalTo(userEmail)
            .on("value", (snapshot) => {
              return console.log("t", snapshot.val());
            });
        });
      });
  }

  // if (userEmail !== "") {
  //   firebase
  //     .database()
  //     .ref("branchOffices")
  //     .orderByChild("branchInformation/emailsWithAccess")
  //     .equalTo(userEmail) // solo me devolvera el objeto donde existe ese correo
  //     .on("value", (snapshot) => {
  //       let key = Object.keys(snapshot.val());
  //       console.log("key", key);
  //       let dataBranchOffices = snapshot.child(key).val();
  //       console.log("sucursal", dataBranchOffices);
  //       setBranchOffice(dataBranchOffices);
  //     });
  // }

  // firebase
  //   .database()
  //   .ref("branchOffices/code1")
  //   .on("value", (snapshot) => {
  //     console.log("snapshot.val()", snapshot.val());
  //     setBranchOffice(snapshot.val());
  //   });
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
