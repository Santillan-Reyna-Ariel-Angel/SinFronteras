const factura = require('./Facturacion/factura');

console.log(`***** Probando Componente Factura: *****`);

let NumeroAutorizacion = '30040010595';
let NumeroFactura = '10015';
let NumeroNIT = '953387014';
let NumeroFecha = '20070825'; // (Con formato yyyyMMdd)
let NumeroTotal = '5726'; // Para efectos del Código de Control, este monto deberá expresarse sin centavos (Redondeado al inmediato superior a partir de los 50 centavos)
let LlaveDosificacion =
  '33E265B43C4435sdTuyBVssD355FC4A6F46sdQWasdA)d56666fDsmp9846636B3';

let codigoControl = factura.codigoControl(
  NumeroAutorizacion,
  NumeroFactura,
  NumeroNIT,
  NumeroFecha,
  NumeroTotal,
  LlaveDosificacion
);
console.log(`Resultado: 'A8-6B-FD-82-16' | codigoControl: ${codigoControl}`);

let NumeroLiteral = factura.importeTotalLiteral(5726);
console.log(`${5726} | NumeroLiteral: ${NumeroLiteral}`);
