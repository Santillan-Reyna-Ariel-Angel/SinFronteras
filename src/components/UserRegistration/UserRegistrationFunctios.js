import EventFirebase from "../../firebase-config";
const { firebase } = EventFirebase;

export const saveUser = (
  { names, surnames, ci, address, mobile, email },
  formattedDate,
  sexo,
  { name: branchOffice },
  { name: charge },
  { status }
) => {
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
        branchOffice,
        charge,
        status,
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
