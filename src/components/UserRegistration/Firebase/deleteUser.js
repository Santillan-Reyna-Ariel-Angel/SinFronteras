import { modulesFirebase } from './../../../firebase-config.js';
import { ref, remove } from 'firebase/database';
const { fire_db } = modulesFirebase;

export const deleteUser = (identificationNumber) => {
  //Eliminar usuario:
  remove(ref(fire_db, `users/${identificationNumber}/`));
};
