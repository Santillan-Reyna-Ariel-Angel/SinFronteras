import { ref, set } from 'firebase/database';
import { modulesFirebase } from './../../../firebase-config.js';

//Modulos Firebase:
const { fire_db } = modulesFirebase;

export const createBus = (busData) => {
  let { enrollment, filing } = busData;
  let filingAux = filing.slice(1, 2); //Nos sacara la letra correspondiente de la Matricula
  //   console.log('filingAux: ', filingAux);
  //Enviar Datos a BD:
  set(ref(fire_db, `companyBuses/${[enrollment]}/`), {
    designatedBranch: 'DISPONIBLE', //Necesario para listar buses por branch
    enrollment: enrollment,
    filing: filingAux,
    identificationNumberDriver: busData.identificationNumberDriver,
    numberOfFloors: busData.numberOfFloors,
    numberOfSeats: busData.numberOfSeats,
    services: busData.services,
    status: busData.status,
    typeOfBus: busData.typeOfBus,
    typeOfSeats: busData.typeOfSeats,
  });
};
