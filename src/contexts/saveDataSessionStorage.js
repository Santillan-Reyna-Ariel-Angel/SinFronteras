export const saveDataSessionStorage = ({ dataName, newDataValue }) => {
  //new code
  let currentValue = sessionStorage.getItem(dataName);
  if (currentValue === null) {
    // No exite en sessionStorage, crearla:
    console.log(`create dataName: ${dataName} - newDataValue:`, newDataValue);
    sessionStorage.setItem(`${dataName}`, JSON.stringify(newDataValue));
  } else {
    if (currentValue === JSON.stringify(newDataValue)) {
      // No realizar acciones
      console.log(`Ya existe el obj en sessionStorage (no hacer nada)`);
    } else {
      //Actualizar el valor:
      console.log(`update dataName: ${dataName} - newDataValue:`, newDataValue);
      sessionStorage.setItem(`${dataName}`, JSON.stringify(newDataValue));
    }
  }
};
