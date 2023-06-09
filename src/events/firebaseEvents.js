import { modulesFirebase } from './../firebase-config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
const { fire_auth } = modulesFirebase;

export const Auth = (email, password) => {
  signInWithEmailAndPassword(fire_auth, email, password)
    .then(async (userCredential) => {
      let accessToken = await userCredential.user.getIdToken();
      // console.log('***accessToken:', accessToken);
      return accessToken;
    })
    .catch((error) => {
      console.error('Error', error.message);
      return null;
    });
};
