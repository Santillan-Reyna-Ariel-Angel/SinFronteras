import EventFirebase from "../../firebase-config";
const { firebase } = EventFirebase;

export const saveUser = (
  { names, surnames, ci, address, mobile, email },
  formattedDate,
  sex,
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
        sex,
        branchOfficeName,
        chargeOfType,
        statusType,
      },
      (error) => {
        if (error) {
          console.log("Error. Datos no guardados!!!", error);
          return "error";
        } else {
          firebase
            .database()
            .ref("branchOffices/" + branchOfficeName)
            .set(branchOffice);
          firebase
            .database()
            .ref("charges/" + chargeOfType)
            .set(charge);
          firebase
            .database()
            .ref("status/" + statusType)
            .set(status);
          console.log("Datos guardados exitosamente");
          return "exitoso";
        }
      }
    );
};
