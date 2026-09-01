const factura = require('../factura');

//Repositorio: https://github.com/dymconsult/factumovil/tree/master/javascript
//Revisar Especificacion Tecnica Codigo Control: https://siatinfo.impuestos.gob.bo/index.php/facturacion-manual/algoritmos/codigo-de-control

console.log(`***** SINPrueba1: *****`);

let NumeroAutorizacion = '79040011859';
let NumeroFactura = '152';
let NumeroNIT = '1026469026';
let NumeroFecha = '20070728'; // (Con formato yyyyMMdd)
let NumeroTotal = '135'; // (Redondeado al inmediato superior a partir de los 50 centavos)
let LlaveDosificacion = 'A3Fs4s$)2cvD(eY667A5C4A2rsdf53kw9654E2B23s24df35F5';

let codigoControl = factura.codigoControl(
  NumeroAutorizacion,
  NumeroFactura,
  NumeroNIT,
  NumeroFecha,
  NumeroTotal,
  LlaveDosificacion
);
console.log(`Resultado: 'FB-A6-E4-78' | codigoControl: ${codigoControl}`);

let NumeroLiteral = factura.importeTotalLiteral(135);
console.log(`${135} | NumeroLiteral: ${NumeroLiteral}`);
