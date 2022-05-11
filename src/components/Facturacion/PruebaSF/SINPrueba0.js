const factura = require('../factura');

//Repositorio: https://github.com/dymconsult/factumovil/tree/master/javascript
//Revisar Especificacion Tecnica Codigo Control: https://siatinfo.impuestos.gob.bo/index.php/facturacion-manual/algoritmos/codigo-de-control

console.log(`***** SINPrueba0: *****`);

let NumeroAutorizacion = '29040011007';
let NumeroFactura = '1503';
let NumeroNIT = '4189179011';
let NumeroFecha = '20070702'; // (Con formato yyyyMMdd)
let NumeroTotal = '2500'; // (Redondeado al inmediato superior a partir de los 50 centavos)
let LlaveDosificacion = '9rCB7Sv4X29d)5k7N%3ab89p-3(5[A';

let codigoControl = factura.codigoControl(
  NumeroAutorizacion,
  NumeroFactura,
  NumeroNIT,
  NumeroFecha,
  NumeroTotal,
  LlaveDosificacion
);
console.log(`Resultado: '6A-DC-53-05-14' | codigoControl: ${codigoControl}`);

let NumeroLiteral = factura.importeTotalLiteral(2500);
console.log(`${2500} | NumeroLiteral: ${NumeroLiteral}`);
