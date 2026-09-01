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

export const isEmptyObject = (obj) => {
  // example: obj = { name: '' } or {};
  let isEmptyObject = Object.keys(obj).length === 0;
  console.log('isEmptyObject:', isEmptyObject);
  return isEmptyObject;
};
// isEmptyObject({ name: 'ariel' });
