vm = require('vm');
fs = require('fs');

vm.runInThisContext(fs.readFileSync(__dirname + '/algoritmos.js'));
vm.runInThisContext(fs.readFileSync(__dirname + '/importeTotalLiteral.js'));

module.exports = {
  controlCode: controlCode,
  toLiteral: toLiteral,
};
