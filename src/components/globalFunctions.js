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

// export const getNextDate = ({ dateString, format = 'dd/mm/yyyy' }) => {
//   let day, month, year;
//   if ((format = 'dd/mm/yyyy')) {
//     [day, month, year] = dateString.split('/');
//   } else {
//     // format === 'yyyy/mm/dd'
//     [year, month, day] = dateString.split('/');
//   }

//   // const [day, month, year] = dateString.split('/');
//   const date = new Date(`${month}/${day}/${year}`);
//   date.setDate(date.getDate() + 1);
//   const nextDay = date.getDate();
//   const nextMonth = date.getMonth() + 1;
//   const nextYear = date.getFullYear();

//   // .padStart(2, "0"): significa que si la cadena es menor a 2 caracteres,
//   // se le agregará un cero al principio de la cadena hasta que la longitud sea de 2 caracteres.
//   // examples:
//   // "1".padStart(2, "0") // devuelve "01"
//   // "12".padStart(2, "0") // devuelve "12"

//   if ((format = 'dd/mm/yyyy')) {
//     return `${nextDay.toString().padStart(2, '0')}/${nextMonth
//       .toString()
//       .padStart(2, '0')}/${nextYear.toString()}`;
//   } else {
//     // format === 'yyyy/mm/dd'
//     return `${nextYear.toString()}/${nextMonth
//       .toString()
//       .padStart(2, '0')}/${nextDay.toString().padStart(2, '0')}`;
//   }
// };

// // console.log(getNextDate('17/04/2023')); // "18/04/2023"

export const getNextDate_ddMMYYYY = (dateString) => {
  const [day, month, year] = dateString.split('/');
  const date = new Date(`${month}/${day}/${year}`);
  date.setDate(date.getDate() + 1);
  const nextDay = date.getDate();
  const nextMonth = date.getMonth() + 1;
  const nextYear = date.getFullYear();
  return `${nextDay.toString().padStart(2, '0')}/${nextMonth
    .toString()
    .padStart(2, '0')}/${nextYear.toString()}`;
};
// console.log(getNextDate_ddMMYYYY('17/04/2023')); // "18/04/2023"
