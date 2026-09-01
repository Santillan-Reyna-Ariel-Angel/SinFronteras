function importeTotalLiteral(number) {
  if (number <= 9) {
    literal = [
      '',
      'UNO',
      'DOS',
      'TRES',
      'CUATRO',
      'CINCO',
      'SEIS',
      'SIETE',
      'OCHO',
      'NUEVE',
    ];
    return literal[number];
  }
  if (number <= 15) {
    teens = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE'];
    return teens[number - 10];
  }
  if (number < 100) {
    tens = [
      'VEINTE',
      'TREINTA',
      'CUARENTA',
      'CINCUENTA',
      'SESENTA',
      'SETENTA',
      'OCHENTA',
      'NOVENTA',
    ];
    if (number <= 19) return 'DIECI' + importeTotalLiteral(number % 10);
    else if (number <= 29 && number != 20)
      return 'VEINTI' + importeTotalLiteral(number % 10);
    else
      return (
        tens[Math.floor(number / 10) - 2] +
        (number % 10 == 0 ? '' : ' Y ' + importeTotalLiteral(number % 10))
      );
  }
  if (number < 1000) {
    hundreds = [
      'CIENTO',
      'DOSCIENTOS',
      'TRESCIENTOS',
      'CUATROCIENTOS',
      'QUINIENTOS',
      'SEISCIENTOS',
      'SETECIENTOS',
      'OCHOCIENTOS',
      'NOVECIENTOS',
    ];
    if (number == 100) return 'CIEN';
    return (
      hundreds[Math.floor(number / 100) - 1] +
      ' ' +
      importeTotalLiteral(number % 100)
    );
  }
  if (number < 1000000) {
    if (Math.floor(number / 1000) == 1)
      return 'MIL ' + importeTotalLiteral(number % 1000);
    return (
      importeTotalLiteral(Math.floor(number / 1000)) +
      ' MIL ' +
      importeTotalLiteral(number % 1000)
    );
  }
  if (number < 1000000000000) {
    if (Math.floor(number / 1000000) == 1)
      return 'UN MILLON ' + importeTotalLiteral(number % 1000000);
    return (
      importeTotalLiteral(Math.floor(number / 1000000)) +
      ' MILLONES ' +
      importeTotalLiteral(number % 1000000)
    );
  }
  return '';
}
