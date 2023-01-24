export const saveDataSessionStorage = ({ dataName, newDataValue }) => {
  let currentValue = sessionStorage.getItem(dataName);
  if (currentValue === null) {
    // No exite en sessionStorage, crearla:
    console.log(`Create Obj: "${dataName}" - newDataValue:`, newDataValue);
    sessionStorage.setItem(`${dataName}`, JSON.stringify(newDataValue));
  } else {
    if (currentValue === JSON.stringify(newDataValue)) {
      // No realizar acciones
      console.log(`El Obj "${dataName}" ya existe en sessionStorage`);
    } else {
      //Actualizar el valor:
      console.log(`Update Obj: "${dataName}" - newDataValue:`, newDataValue);
      sessionStorage.setItem(`${dataName}`, JSON.stringify(newDataValue));
    }
  }
};
