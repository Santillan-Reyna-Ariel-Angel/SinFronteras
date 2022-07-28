import { set, ref } from 'firebase/database';
import { modulesFirebase } from './../../../../firebase-config.js';
import { travelKey } from './../Functions/TripsMadeGenerateKeys.js';

export const addOccupiedSeat = ({ branchNumber, dataBusTravel, seatId }) => {
  const { fire_db } = modulesFirebase;
  let {
    travelDate,
    departureTime,
    bus: { enrollment: busEnrollment },
  } = dataBusTravel;

  // travelKeyAux = 'travel_31-7-2022_21-30_bus-006';
  let travelKeyAux = travelKey({ travelDate, departureTime, busEnrollment });

  //Enviar Datos a BD:
  set(
    ref(
      fire_db,
      `tripsMade/branch_${branchNumber}/${travelKeyAux}/occupiedSeat/${seatId}/`
    ),
    'ocupado' //el valor que tendra cada asiento al crearse
  );
};

//addOccupiedSeat({});
