const seats = {
  minimumSeatRange: 1,
  maximumSeatRange: 29,
  seatType: 'cama',
};

const imprimir = () => {
  let esp = 3;
  for (let i = 1; i <= seats.maximumSeatRange; i++) {
    if (esp === i) {
      console.log('x');
      console.log('Asiento: ' + i + ' ' + seats.seatType);
      esp = esp + 3;
    } else {
      console.log('Asiento: ' + i + ' ' + seats.seatType);
    }
    if (i % 3 === 0) {
      console.log();
    }
  }
};

imprimir();
