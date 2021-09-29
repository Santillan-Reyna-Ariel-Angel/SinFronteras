import EventFirebase from "../../firebase-config";
const { firebase } = EventFirebase;

export const saveUser = (
  { names, surnames, ci, address, mobile, email },
  formattedDate,
  sexo,
  branchOffice,
  charge,
  status
) => {
  // basicInformation-branchOffice
  const { branchOfficeName } = branchOffice;
  const { chargeOfType } = charge;
  // basicInformation-status
  const { statusType } = status;
  firebase
    .database()
    .ref("users/" + ci)
    .set(
      {
        names,
        surnames,
        ci,
        address,
        mobile,
        email,
        formattedDate,
        sexo,
        branchOfficeName,
        chargeOfType,
        statusType,
      },
      (error) => {
        if (error) {
          console.log("Error. Datos no guardados!!!", error);
          return "error";
        } else {
          console.log("Datos guardados exitosamente");
          return "exitoso";
        }
      }
    );
};
