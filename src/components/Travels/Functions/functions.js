export const formatDate = ({ date, format = 'dd/mm/yyyy' }) => {
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

export const formatTime = (date) => {
  let hour = date.getHours();
  let minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  let formatTimeAux = `${hour}:${minute}`;
  return formatTimeAux;
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
    let selectedDate = formatDate({
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
