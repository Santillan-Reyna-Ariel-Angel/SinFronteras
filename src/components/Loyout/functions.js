import { removeReservation } from './../Reservations/events/Firebase/removeReservation';

const ejecutarTarea = (reservationData) => {
  console.log('***reservationData: ', reservationData);
  let { branchNumber, travelKey, seatsList, buyerId } = reservationData;

  removeReservation({
    branchNumber,
    travelKey,
    seatsList,
    buyerId,
  });
};

export const programarTarea = ({ fecha, hora, reservationData }) => {
  const currentDateTime = new Date();

  // Parsea la fecha deseada en formato "dd/MM/yyyy"
  const [dia, mes, anio] = fecha.split('/').map(Number);

  // Parsea la hora en formato "HH:mm"
  const [hr, min] = hora.split(':').map(Number);

  const reserveDateTime = new Date(anio, mes - 1, dia, hr, min);

  const tiempoEspera = reserveDateTime - currentDateTime;

  console.log('tiempoEspera: ', tiempoEspera);
  if (tiempoEspera >= 0) {
    // Programa la ejecución de la función a la fecha y hora deseada. tiempoEspera debe estar en milisegundos
    setTimeout(ejecutarTarea, tiempoEspera, reservationData);
  } else {
    console.log('La fecha y hora de la reserva ya han pasado.');
  }
};

export const getDataForRemoveReservations = ({
  reserveSeatsList,
  branchNumber,
}) => {
  let data = reserveSeatsList.map((reserveSeats) => {
    let buyerIdList = Object.keys(reserveSeats);

    let dataAux = buyerIdList.map((buyerId) => {
      let {
        tripMadeKey,
        seats,
        buyerData: {
          ciOrNit,
          reservationCreationDateTime,
          reservationTimeLimitDateTime,
        },
      } = reserveSeats[buyerId];

      return {
        branchNumber,
        travelKey: tripMadeKey,
        seatsList: seats,
        buyerId: ciOrNit,
        reservationCreationDateTime,
        reservationTimeLimitDateTime,
      };
    });

    return dataAux;
  });

  // data sale como array de arrays, por lo que se debe aplanar:
  let dataFlat = data.flat(1);
  // console.log(' dataFlat', dataFlat);

  return dataFlat;
};
