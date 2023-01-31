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
