export const dateFormat = ({ date, format = 'dd/mm/yyyy' }) => {
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  let formatDateAux;
  if (format === 'dd/mm/yyyy' || format === '') {
    formatDateAux = `${day}/${month}/${date.getFullYear()}`;
  } else {
    // format === 'yyyy/mm/dd'
    formatDateAux = `${date.getFullYear()}/${month}/${day}`;
  }
  return formatDateAux;
};

export const timeFormat = ({ newTime, format = ':' }) => {
  //Otra opcion con segundos seria: newTime.toLocaleTimeString()
  let hour =
    newTime.getHours() < 10 ? `0${newTime.getHours()}` : newTime.getHours();
  let minute =
    newTime.getMinutes() < 10
      ? `0${newTime.getMinutes()}`
      : newTime.getMinutes();

  let timeFormatAux;
  if (format === ':' || format === '') {
    timeFormatAux = `${hour}:${minute}`;
  } else {
    timeFormatAux = `${hour}-${minute}`;
  }

  return timeFormatAux;
};

export const isDateOutOfRange = ({ inputDate, startDate, endDate }) => {
  //isNaN(inputDate) => para que en cada change NO guarde NaN/NaN/NaN en travelDate
  let isErrorDate =
    inputDate === null || inputDate === '' || isNaN(inputDate) ? true : false;

  let dateOutOfRange;

  if (isErrorDate) {
    dateOutOfRange = true;
    console.log('dateOutOfRange', dateOutOfRange);
    return dateOutOfRange;
  } else {
    //Recuperar año, mes y dia.
    let selectedDate = dateFormat({
      date: inputDate,
      format: 'yyyy/mm/dd',
    });
    //Eliminar las "/" y convertir la fecha a un entero:
    let startDateInt = parseInt(startDate.replaceAll('/', ''));
    let selectedDateInt = parseInt(selectedDate.replaceAll('/', ''));
    let endDateInt = parseInt(endDate.replaceAll('/', ''));
    //Comparar si la fecha ingresada es menor:
    dateOutOfRange =
      selectedDateInt < startDateInt || selectedDateInt > endDateInt;
    console.log('dateOutOfRange', dateOutOfRange);
    return dateOutOfRange;
  }
};

export const travelKey = ({
  travelDate = '00/00/0000',
  departureTime = '00:00',
  busEnrollment = '0000MATRICULA',
}) => {
  //  travel_fechaViaje_horaViaje_matricula => travel_19-7-2022_15-30_2269KUN

  let travelDateAux = travelDate.replaceAll('/', '-');
  let departureTimeAux = departureTime.replaceAll(':', '-');

  let travelKey = `travel_${travelDateAux}_${departureTimeAux}_${busEnrollment}`;
  //console.log('travelKey:', travelKey);
  return travelKey;
};
