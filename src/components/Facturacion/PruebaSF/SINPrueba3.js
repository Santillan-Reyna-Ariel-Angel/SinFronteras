const factura = require('../factura');

//Repositorio: https://github.com/dymconsult/factumovil/tree/master/javascript
//Revisar Especificacion Tecnica Codigo Control: https://siatinfo.impuestos.gob.bo/index.php/facturacion-manual/algoritmos/codigo-de-control

console.log(`***** SINPrueba3: *****`);

let NumeroAutorizacion = '1904008691195';
let NumeroFactura = '978256';
let NumeroNIT = '0';
let NumeroFecha = '20080201'; // (Con formato yyyyMMdd)
let NumeroTotal = '26006'; // Para efectos del Código de Control, este monto deberá expresarse sin centavos (Redondeado al inmediato superior a partir de los 50 centavos)
let LlaveDosificacion =
  'pPgiFS%)v}@N4W3aQqqXCEHVS2[aDw_n%3)pFyU%bEB9)YXt%xNBub4@PZ4S9)ct';

let codigoControl = factura.codigoControl(
  NumeroAutorizacion,
  NumeroFactura,
  NumeroNIT,
  NumeroFecha,
  NumeroTotal,
  LlaveDosificacion
);
console.log(`Resultado: '62-12-AF-1B' | codigoControl: ${codigoControl}`);

let NumeroLiteral = factura.importeTotalLiteral(26006);
console.log(`${26006} | NumeroLiteral: ${NumeroLiteral}`);
