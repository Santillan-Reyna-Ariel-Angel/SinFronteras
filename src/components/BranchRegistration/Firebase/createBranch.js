import { ref, set } from 'firebase/database';
import { modulesFirebase } from './../../../firebase-config.js';

//Modulos Firebase:
const { fire_db } = modulesFirebase;

export const createBranch = (branchData) => {
  let { branchNumber } = branchData;

  //Enviar Datos a BD:
  //   ref(fire_db, `branchOffices/${branchNumber}/branchInformation/`)
  set(ref(fire_db, `branchOffices/${branchNumber}/`), {
    branchInformation: {
      address: branchData.address,
      attentionSchedule: branchData.attentionSchedule,
      branchNumber: branchData.branchNumber,
      department: branchData.department,
      branchContactNumbers: branchData.branchContactNumbers,
      emailsWithAccess: '', //IMPORTANTE: este dato debe ser llenado con el gmail con el que se crea un usuario(dependiendo el cargo y la sucursal)
      location: branchData.locality,
      name: branchData.branchName,
      terminal: branchData.terminal,
    },
  });
};
