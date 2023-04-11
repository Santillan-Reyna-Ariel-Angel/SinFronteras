export const uuid = () => {
  return Math.random().toString(16).slice(2);
};

export const dateFormat = ({ date, format = 'dd/mm/yyyy' }) => {
  let isErrorDate = date === null || date === '' || isNaN(date) ? true : false;

  if (isErrorDate === true) {
    let formatDateAux = '';
    return formatDateAux;
  } else {
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;

    let formatDateAux;
    if (format === 'dd/mm/yyyy' || format === '') {
      formatDateAux = `${day}/${month}/${date.getFullYear()}`;
    } else {
      // format === 'yyyy/mm/dd'
      formatDateAux = `${date.getFullYear()}/${month}/${day}`;
    }
    return formatDateAux;
  }
};

export const timeFormat = ({ newTime, format = ':' }) => {
  console.log('newTime:', newTime);
  //Otra opcion con segundos seria: newTime.toLocaleTimeString()
  // console.log('isNaN(newTime):', isNaN(newTime));

  if (newTime === null || newTime === undefined || isNaN(newTime) === true) {
    return '20:30'; //departureTime: '20:30', by default
  } else {
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
  }
};

export const travelKeyGlobal = ({
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
