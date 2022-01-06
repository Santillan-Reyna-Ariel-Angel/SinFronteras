const frutas = [
  { nombre: 'naranja', forma: 'redonda' },
  { nombre: 'manzana', forma: 'redonda' },
  { nombre: 'platano', forma: 'alargada' },
];

const indice = frutas.findIndex((elemento, indice) => {
  if (elemento.nombre === 'naranja') {
    return indice;
  }
});

console.log(indice);
