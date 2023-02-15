import { ref, remove } from 'firebase/database';
import { modulesFirebase } from './../../../firebase-config.js';

//Modulos Firebase:
const { fire_db } = modulesFirebase;

export const deleteBus = (enrollment) => {
  //Eliminar Bus en BD:
  remove(ref(fire_db, `companyBuses/${[enrollment]}/`));
};
