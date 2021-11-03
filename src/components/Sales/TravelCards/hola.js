const travelCardList = [];
travelCardList.push({ name: "ariel", lastname: "santillan" });
travelCardList.push({});
travelCardList.push({ name: "javier", lastname: "santillan" });
travelCardList.push({});
travelCardList.push({});
travelCardList.push({ name: "cristian", lastname: "santillan" });
travelCardList.push({});
travelCardList.push({});

const arrayAux = [];
travelCardList.forEach(function (elemento, indice, array) {
  if (Object.keys(elemento).length !== 0) {
    arrayAux.push(elemento);
  }
});
