import EventFirebase from "../firebase-config";
const { app } = EventFirebase;

export const Auth = async (email, password) => {
  try {
    const userCredential = await app
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log(userCredential);
    // const Token=
    return userCredential;
  } catch (error) {
    console.error(error.messsage);
    return null;
  }
};
