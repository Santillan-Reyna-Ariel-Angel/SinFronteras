import { ref, set } from 'firebase/database';
import { modulesFirebase } from './../../../firebase-config.js';
//funtions:
import { travelKey } from './../Functions/functions';
//Modulos Firebase:
const { fire_db } = modulesFirebase;

export const createTripSchedule = ({ travelData, branchNumber }) => {
  let { travelDate, departureTime, busEnrollment } = travelData;

  let travelKeyAux = travelKey({
    travelDate,
    departureTime,
    busEnrollment,
  });

  //Enviar Datos a BD:
  set(ref(fire_db, `branchOffices/${branchNumber}/travels/${travelKeyAux}/`), {
    ...travelData, // se hace una copia de todos los datos
    // numberOfSeats: travelData.bus.numberOfSeats, // Posteriormente considerar asietos de 1er y 2do piso
  });

  //Crear viaje en tripsMade, para poder buscar viaje y selecionar sus asientos:
  set(ref(fire_db, `tripsMade/branch_${branchNumber}/${travelKeyAux}/`), {
    occupiedSeat: { 0: 'vendido-74747472' },
    passengers: {},
  });
};
