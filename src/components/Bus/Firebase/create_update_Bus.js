import { ref, update } from 'firebase/database';
import { modulesFirebase } from '../../../firebase-config.js';

//Modulos Firebase:
const { fire_db } = modulesFirebase;

export const create_update_Bus = (busData) => {
  let { enrollment, filing } = busData;

  //Lo siguiente nos sacara la letra correspondiente de la Matricula que esta en la radicatoria. filing puede ser: "(H) chuquisaca" o "H"
  let filingAux = filing.length > 1 ? filing.slice(1, 2) : filing;
  //   console.log('filingAux: ', filingAux);

  //Enviar Datos a BD: update envez de set, por que podemos crear y actualizar datos.
  update(ref(fire_db, `companyBuses/${[enrollment]}/`), {
    ...busData,
    designatedBranch: busData.designatedBranch, //Actualizamos la branch designada
    filing: filingAux, //en caso de querer actualizar la radicatoria

    // Posteriormente considerar asietos de 1er y 2do piso (revisar estroctura de bus-008):
    // numberOfFloors: 2,
    // numberOfSeats: 40,
    // numberOfSeatsFirstFloor: 20,
    // numberOfSeatsSecondFloor: 20,
  });
};
