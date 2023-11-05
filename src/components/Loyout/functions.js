const ejecutarTarea = () => {
  console.log('La función se ha ejecutado a la hora y fecha determinada.');
};

export const programarTarea = (fecha, hora, minutos, segundos) => {
  const ahora = new Date();

  // Parsea la fecha deseada y establece la hora, minutos y segundos
  const [dia, mes, anio] = fecha.split('/').map(Number);
  const fechaDeseada = new Date(anio, mes - 1, dia, hora, minutos, segundos);

  const tiempoEspera = fechaDeseada - ahora;

  console.log('tiempoEspera: ', tiempoEspera);

  // Programa la ejecución de la función a la fecha y hora deseada. tiempoEspera debe estar en milisegundos
  setTimeout(ejecutarTarea, tiempoEspera);
};

// const fechaDeseada = '01/01/2023'; // Formato "dd/MM/yyyy"
// const horaDeseada = Number('14'); // Hora
// const minutosDeseados = Number('30'); // Minutos
// const segundosDeseados = 0; // Segundos

// programarTarea(fechaDeseada, horaDeseada, minutosDeseados, segundosDeseados);
