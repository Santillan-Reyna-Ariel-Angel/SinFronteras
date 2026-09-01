const factura = require('../factura');

//Repositorio: https://github.com/dymconsult/factumovil/tree/master/javascript
//Revisar Especificacion Tecnica Codigo Control: https://siatinfo.impuestos.gob.bo/index.php/facturacion-manual/algoritmos/codigo-de-control

console.log(`***** SINPrueba4: *****`);

let NumeroAutorizacion = '10040010640';
let NumeroFactura = '9901';
let NumeroNIT = '1035012010';
let NumeroFecha = '20070813'; // (Con formato yyyyMMdd)
let NumeroTotal = '451'; // Para efectos del Código de Control, este monto deberá expresarse sin centavos (Redondeado al inmediato superior a partir de los 50 centavos)
let LlaveDosificacion = 'DSrCB7Ssdfv4X29d)5k7N%3ab8p3S(asFG5YU8477SWW)FDAQA';

let codigoControl = factura.codigoControl(
  NumeroAutorizacion,
  NumeroFactura,
  NumeroNIT,
  NumeroFecha,
  NumeroTotal,
  LlaveDosificacion
);
console.log(`Resultado: '6A-50-31-01-32' | codigoControl: ${codigoControl}`);

let NumeroLiteral = factura.importeTotalLiteral(451);
console.log(`${451} | NumeroLiteral: ${NumeroLiteral}`);
