import { parse, isBefore } from 'date-fns';

export const isPastTrip = (travelDataList) => {
  // Obtén la fecha y hora actual
  const currentDate = new Date();

  // Convierte la cadena de fecha en un objeto de fecha
  const travelDate = parse(travelDataList.travelDate, 'dd/MM/yyyy', new Date());

  // Divide la cadena de hora para obtener horas y minutos
  const [hours, minutes] = travelDataList.departureTime.split(':');
  travelDate.setHours(Number(hours), Number(minutes), 0, 0);

  // Comprueba si la fecha y hora de viaje ya han pasado
  //   isBefore(fechaAnterior, fechaPosterior);
  const isPastTrip = isBefore(travelDate, currentDate);

  if (isPastTrip) {
    // console.log('La fecha de viaje ya pasó.');
    return true;
  } else {
    // console.log('La fecha de viaje aún no ha pasado.');
    return false;
  }
};
