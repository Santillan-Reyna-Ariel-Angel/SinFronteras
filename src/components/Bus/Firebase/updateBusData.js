import { ref, update } from 'firebase/database';
import { modulesFirebase } from '../../../firebase-config.js';

//Modulos Firebase:
const { fire_db } = modulesFirebase;

export const updateBusData = (busData) => {
  let { enrollment, filing } = busData;
  let filingAux = filing.length > 1 ? filing.slice(1, 2) : filing; //Nos sacara la letra correspondiente de la Matricula que esta en la radicatoria. filing puede ser: "(H) chuquisaca" o "H"
  //   console.log('filingAux: ', filingAux);

  //Actualizar Datos en BD:
  update(ref(fire_db, `companyBuses/${[enrollment]}/`), {
    ...busData,
    designatedBranch: busData.designatedBranch, //Actualizamos la branch designada
    // enrollment: enrollment,
    filing: filingAux, //en caso de querer actualizar la radicatoria
    // identificationNumberDriver: busData.identificationNumberDriver,
    // numberOfFloors: busData.numberOfFloors,
    // numberOfSeats: busData.numberOfSeats, // Posteriormente considerar asietos de 1er y 2do piso
    // services: busData.services,
    // status: busData.status,
    // typeOfBus: busData.typeOfBus,
    // typeOfSeats: busData.typeOfSeats,
  });
};
