//Algoritmo para generar filas del bus(4-5)
export let createSeats = (typeOfBus, numSeat) => {
  let seats = [];
  for (let i = 1; i <= numSeat; i++) {
    if (typeOfBus === 'normal') {
      if (i % 4 === 0) {
        seats.push([i - 3, i - 2, i - 1, i]);
      }
    }
    if (typeOfBus === 'leito') {
      if (i % 3 === 0) {
        seats.push([i - 2, i - 1, i]);
      }
    }
  }

  if (typeOfBus === 'normal') {
    if (numSeat % 4 === 0) {
      return [
        seats.map((x) => x[0]),
        seats.map((x) => x[1]),
        seats.map((x) => x[2]),
        seats.map((x) => x[3]),
      ];
    } else {
      let f = numSeat - seats.length * 4;
      seats.push(
        f === 1
          ? [numSeat, null, null, null]
          : f === 2
          ? [numSeat - 1, numSeat, null, null]
          : [numSeat - 2, numSeat - 1, numSeat, null]
      );
      return [
        seats.map((x) => x[0]),
        seats.map((x) => x[1]),
        seats.map((x) => x[2]),
        seats.map((x) => x[3]),
      ];
    }
  }

  if (typeOfBus === 'leito') {
    if (numSeat % 3 === 0) {
      return [
        seats.map((x) => x[0]),
        seats.map((x) => x[1]),
        seats.map((x) => x[2]),
      ];
    } else {
      let f = numSeat - seats.length * 3;
      seats.push(f < 2 ? [numSeat, null, null] : [numSeat - 1, numSeat, null]);
      return [
        seats.map((x) => x[0]),
        seats.map((x) => x[1]),
        seats.map((x) => x[2]),
      ];
    }
  }
};
