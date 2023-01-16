export const saveDataSessionStorage = ({ dataName, dataValue }) => {
  console.log(`dataName: ${dataName} - dataValue:`, dataValue);
  sessionStorage.setItem(`${dataName}`, JSON.stringify(dataValue));
};
