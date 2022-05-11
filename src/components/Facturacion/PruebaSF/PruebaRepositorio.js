const factura = require('../factura');

//Repositorio: https://github.com/dymconsult/factumovil/tree/master/javascript

console.log(`***** Prueba Repositorio: *****`);

let NumeroAutorizacion = '7904006306693';
let NumeroFactura = '876814';
let NumeroNIT = '1665979';
let NumeroFecha = '20080519'; // (Con formato yyyyMMdd)
let NumeroTotal = '35959'; // (Redondeado al inmediato superior a partir de los 50 centavos)
let LlaveDosificacion =
  'zZ7Z]xssKqkEf_6K9uH(EcV+%x+u[Cca9T%+_$kiLjT8(zr3T9b5Fx2xG-D+_EBS';

let controlCode = factura.controlCode(
  NumeroAutorizacion,
  NumeroFactura,
  NumeroNIT,
  NumeroFecha,
  NumeroTotal,
  LlaveDosificacion
);
//Resultado: '7B-F3-48-A8'
console.log(`Resultado: '7B-F3-48-A8' | controlCode: ${controlCode}`);

let NumeroLiteral = factura.toLiteral(123);
//Resultado: 'CIENTO VEINTITRES'
console.log(`${123} | NumeroLiteral: ${NumeroLiteral}`);
