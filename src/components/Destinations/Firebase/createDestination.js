import { ref, update } from 'firebase/database';
import { modulesFirebase } from './../../../firebase-config.js';
// funtions:

// Modulos Firebase:
const { fire_db } = modulesFirebase;

export const createDestination = ({ destinationData, branchNumber, llave }) => {
  let destinationDataAux = destinationData.destinations[llave];
  console.log('destinationDataAux: ', destinationDataAux);
  // console.log('branchNumber: ', branchNumber);
  // console.log('llave: ', llave);

  //Enviar Datos a BD:
  // update(si no existe la ruta, la crea)
  update(
    ref(
      fire_db,
      `branchOffices/${branchNumber}/branchInformation/destinations/${llave}/`
    ),
    {
      ...destinationDataAux, // se hace una copia de todos los datos
    }
  );
};
