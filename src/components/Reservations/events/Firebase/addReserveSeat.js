import {
  set,
  // update,
  ref,
} from 'firebase/database';
import { modulesFirebase } from './../../../../firebase-config.js';

export const addReserveSeat = ({
  branchNumber,
  travelKey,
  seatId,
  seatState,
  userData,
}) => {
  const { fire_db } = modulesFirebase;

  //Enviar Datos a BD:
  set(
    ref(
      fire_db,
      `tripsMade/branch_${branchNumber}/${travelKey}/occupiedSeat/${seatId}/`
    ),
    `${seatState}-${userData.identificationNumber}` //el valor que tendra cada asiento al crearse
  );

  //Actualiza el estado del asiento a "vendido" en la BD segun "seatId":
  // update(
  //   ref(fire_db, `tripsMade/branch_${branchNumber}/${travelKey}/occupiedSeat/`),
  //   { [seatId]: `${seatState}-${userData.identificationNumber}` } //el valor al actualizar cada asiento
  // );
};
