//includes
assert = require('assert');

//include function
require('vm').runInThisContext(
  require('fs').readFileSync(__dirname + '/../importeTotalLiteral.js')
);

//execute tests
//note: in some cases a trailing space could exist, it is ignored with the function "trim()"
describe('literal', function () {
  it('should generate a correct literal number', function () {
    //edge cases
    assert.equal('CIEN', importeTotalLiteral(100).trim());
    assert.equal('DOSCIENTOS', importeTotalLiteral(200).trim());
    assert.equal('MIL', importeTotalLiteral(1000).trim());
    assert.equal('DOS MIL', importeTotalLiteral(2000).trim());
    assert.equal('UN MILLON', importeTotalLiteral(1000000).trim());
    assert.equal('DOS MILLONES', importeTotalLiteral(2000000).trim());
    assert.equal('UN MILLON MIL CIEN', importeTotalLiteral(1001100).trim());
    assert.equal('ONCE', importeTotalLiteral(11).trim());
    assert.equal('QUINCE', importeTotalLiteral(15).trim());
    assert.equal('VEINTIUNO', importeTotalLiteral(21).trim());
    assert.equal('NOVENTA Y NUEVE', importeTotalLiteral(99).trim());
    //random
    assert.equal(
      'CUATROCIENTOS CUARENTA Y DOS MILLONES CIENTO SEIS MIL TRESCIENTOS SESENTA Y SIETE',
      importeTotalLiteral(442106367).trim()
    );
    assert.equal(
      'OCHOCIENTOS VEINTISIETE MILLONES CUATROCIENTOS SESENTA Y OCHO MIL SEISCIENTOS SETENTA Y SEIS',
      importeTotalLiteral(827468676).trim()
    );
    assert.equal(
      'CUATROCIENTOS TREINTA Y SEIS MILLONES NOVECIENTOS SESENTA Y CUATRO MIL DOSCIENTOS SESENTA Y CINCO',
      importeTotalLiteral(436964265).trim()
    );
    assert.equal(
      'SETECIENTOS DOS MILLONES VEINTISEIS MIL TRESCIENTOS CINCUENTA Y OCHO',
      importeTotalLiteral(702026358).trim()
    );
    assert.equal(
      'DOSCIENTOS SETENTA Y SEIS MILLONES OCHOCIENTOS CINCUENTA Y TRES MIL QUINIENTOS DIECISIETE',
      importeTotalLiteral(276853517).trim()
    );
    assert.equal(
      'SESENTA Y OCHO MILLONES OCHOCIENTOS OCHO MIL SETECIENTOS CUARENTA Y CINCO',
      importeTotalLiteral(68808745).trim()
    );
    assert.equal(
      'TRESCIENTOS CUARENTA Y NUEVE MILLONES CUATROCIENTOS CUARENTA Y SEIS MIL QUINIENTOS SESENTA Y SEIS',
      importeTotalLiteral(349446566).trim()
    );
    assert.equal(
      'OCHOCIENTOS UNO MILLONES TRESCIENTOS DIECISEIS MIL SEISCIENTOS CINCUENTA Y CUATRO',
      importeTotalLiteral(801316654).trim()
    );
    assert.equal(
      'NOVECIENTOS OCHENTA Y UNO MILLONES TRESCIENTOS SESENTA Y NUEVE MIL DOSCIENTOS CUARENTA Y CUATRO',
      importeTotalLiteral(981369244).trim()
    );
    assert.equal(
      'TRESCIENTOS CINCUENTA Y TRES MILLONES CINCUENTA MIL CUATROCIENTOS CATORCE',
      importeTotalLiteral(353050414).trim()
    );
  });
});
