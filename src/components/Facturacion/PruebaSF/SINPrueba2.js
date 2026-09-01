const factura = require('../factura');

//Repositorio: https://github.com/dymconsult/factumovil/tree/master/javascript
//Revisar Especificacion Tecnica Codigo Control: https://siatinfo.impuestos.gob.bo/index.php/facturacion-manual/algoritmos/codigo-de-control

console.log(`***** SINPrueba2: *****`);

let NumeroAutorizacion = '20040010113';
let NumeroFactura = '665';
let NumeroNIT = '1004141023';
let NumeroFecha = '20070108'; // (Con formato yyyyMMdd)
let NumeroTotal = '905'; // Para efectos del Código de Control, este monto deberá expresarse sin centavos (Redondeado al inmediato superior a partir de los 50 centavos)
let LlaveDosificacion = '442F3w5AggG7644D737asd4BH5677sasdL4%44643(3C3674F4';

let codigoControl = factura.codigoControl(
  NumeroAutorizacion,
  NumeroFactura,
  NumeroNIT,
  NumeroFecha,
  NumeroTotal,
  LlaveDosificacion
);
console.log(`Resultado: '71-D5-61-C8' | codigoControl: ${codigoControl}`);

let NumeroLiteral = factura.importeTotalLiteral(905);
console.log(`${905} | NumeroLiteral: ${NumeroLiteral}`);
