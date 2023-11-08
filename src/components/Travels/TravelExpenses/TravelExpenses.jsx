import React, { useState, useContext } from 'react';

//MUI:
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from '@mui/material/';

//Styles:
import {
  Background,
  HeaderContainer,
  HeaderTitle,
  BodyContainer,
  TripMadeKeyStyle,
  DieselStyle,
  TollStyle,
  ViaticosStyle,
  WashedStyle,
  LaborUnionStyle,
  OthersStyle,
  OtherDescriptionStyle,
  TextTotalExpensesStyle,
  Btn,
} from './TravelExpensesStyles';
//Contexts:
import { ContextBranchOffice } from './../../../contexts/ContextBranchOffice';
import { ContextBranchTripsMade } from './../../../contexts/ContextBranchTripsMade';

//Firebase Functions:
import { updateTravelExpenses } from '../Firebase/updateTravelExpenses';
//States:
//Components:
import { PlainModalButton } from './../../PlainModalButton/PlainModalButton';
//Others:
import { handleClose } from './../../DialogBasic/DialogBasic';
import { Css_TextField_Select } from './../../constantData';

export const TravelExpenses = ({ tripMadeKey: tripMadeKeyProp }) => {
  console.log('tripMadeKeyProp', tripMadeKeyProp);

  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  const {
    branchInformation: { branchNumber },
  } = branchOffice ? branchOffice : { branchInformation: { branchNumber: '' } };

  //ContextBranchOffice:
  const branchTripsMade = useContext(ContextBranchTripsMade);
  let {
    [tripMadeKeyProp]: { travelExpenses: travelExpensesBd },
  } = branchTripsMade
    ? branchTripsMade
    : { [tripMadeKeyProp]: { travelExpenses: {} } };

  console.log('travelExpensesBd', travelExpensesBd);

  const getNecessaryKeys = (tripMadeKeyProp) => {
    if (tripMadeKeyProp !== undefined) {
      let fragmentedKey = tripMadeKeyProp.split('_');

      let travelDate = fragmentedKey[1];
      let departureTime = fragmentedKey[2].replace('-', ':');
      let busEnrollment = fragmentedKey[3];

      let selectableOption = `bus ${busEnrollment} (${travelDate} -> ${departureTime})`;

      let necessaryKeys = {
        busEnrollment,
        selectableOption,
        tripMadeKey: tripMadeKeyProp,
      };

      // console.log('[necessaryKeys]', [necessaryKeys]);

      return [necessaryKeys]; //Es necesario devolverlo como un array por que el return(renderizado) del compoenete lo necesita asi
    } else {
      return [];
    }
  };

  let necessaryKeys = getNecessaryKeys(tripMadeKeyProp);
  console.log('necessaryKeys', necessaryKeys);

  //dataDefault debe venir de la BD:
  const dataDefault = travelExpensesBd
    ? travelExpensesBd
    : {
        busEnrollment: '',
        tripMadeKey: '',
        expenses: {
          diesel: '',
          toll: '',
          viaticos: '',
          washed: '',
          laborUnion: '',
          others: '',
          otherDescription: '',
        },
        totalExpenses: 0, //Por default numerico
      };

  const [travelExpenses, setTravelExpenses] = useState(dataDefault);
  let selectableOptionDefault = necessaryKeys[0]
    ? necessaryKeys[0].selectableOption
    : '';
  const [enrollmentSelectableOption, setEnrollmentSelectableOption] = useState(
    selectableOptionDefault
  );

  const getBusEnrollmentAndTripMadeKey = (selectableOption) => {
    let selectableOptionKeys = necessaryKeys.filter(
      (enrollment) => enrollment.selectableOption === selectableOption
    );
    // console.log('selectableOptionKeys:', selectableOptionKeys);

    return selectableOptionKeys;
  };
  const getBusEnrollment = (selectableOption) => {
    let keys = getBusEnrollmentAndTripMadeKey(selectableOption);
    // console.log('busEnrollment:', keys[0].busEnrollment);
    return keys[0].busEnrollment;
  };
  const getTripMadeKey = (selectableOption) => {
    let keys = getBusEnrollmentAndTripMadeKey(selectableOption);
    // console.log('tripMadeKey:', keys[0].tripMadeKey);
    return keys[0].tripMadeKey;
  };

  const getTotalExpenses = () => {
    let { diesel, toll, viaticos, washed, laborUnion, others } =
      travelExpenses.expenses;

    let expensesArray = [diesel, toll, viaticos, washed, laborUnion, others];

    let expensesArrayAux = expensesArray
      .map((expense) => (expense === '' ? 0 : parseFloat(expense).toFixed(2))) //toFixed() nos regresa un string
      .map((amount) => parseFloat(amount)); //del array de string a array de floats
    // console.log('expensesArrayAux', expensesArrayAux);

    //Sumar gastos:
    let initialValue = 0;
    let totalExpenses = expensesArrayAux.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );

    let totalExpensesFloat = parseFloat(totalExpenses.toFixed(2));
    console.log('totalExpensesFloat', totalExpensesFloat);

    return totalExpensesFloat;
  };

  //Data para enviar a FireFunc
  let travelExpensesData = {
    ...travelExpenses,
    totalExpenses: getTotalExpenses(),
  };
  console.log('travelExpensesData', travelExpensesData);

  // componentDefaultData
  const componentDefaultData = () => {
    setTravelExpenses(dataDefault);
    setEnrollmentSelectableOption(undefined);

    //Func que cierra(change state) <DialogBasic>
    handleClose();
  };

  return (
    <>
      <Background>
        <HeaderContainer>
          <HeaderTitle>
            <span>EGRESOS DE VIAJE</span>
          </HeaderTitle>
        </HeaderContainer>

        <BodyContainer>
          <TripMadeKeyStyle>
            <FormControl className="input">
              <InputLabel>Seleccionar viaje</InputLabel>
              <Select
                value={enrollmentSelectableOption} //travelExpenses.busEnrollment
                name="tripMadeKey" // busEnrollment
                onChange={(event) => [
                  setTravelExpenses({
                    ...travelExpenses,
                    [event.target.name]: getTripMadeKey(event.target.value),
                    busEnrollment: getBusEnrollment(event.target.value),
                  }),
                  setEnrollmentSelectableOption(event.target.value),
                ]}
                sx={{
                  '.MuiSelect-select': {
                    // fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768, // o 500
                    color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                    backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                  },
                }}
              >
                {necessaryKeys.map((key, index) => (
                  <MenuItem key={index} value={key.selectableOption}>
                    {key.selectableOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </TripMadeKeyStyle>

          <DieselStyle>
            <TextField
              className="input"
              name="diesel"
              label="Diesel"
              variant="outlined"
              value={travelExpenses.expenses.diesel}
              type="number"
              // InputProps={{ inputProps: { style: { color: 'red' } } }}
              inputProps={{ style: { color: 'black' } }}
              onChange={(event) => [
                setTravelExpenses((prevState) => ({
                  ...prevState,
                  expenses: {
                    ...prevState.expenses,
                    [event.target.name]: event.target.value,
                  },
                })),
              ]}
              sx={{
                '.MuiInputBase-root': {
                  // fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768, // o 500
                  color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                  backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                },
              }}
            />
          </DieselStyle>

          <TollStyle>
            <TextField
              className="input"
              name="toll"
              label="Peaje"
              variant="outlined"
              value={travelExpenses.expenses.toll}
              type="number"
              inputProps={{ style: { color: 'black' } }}
              onChange={(event) => [
                setTravelExpenses({
                  ...travelExpenses,
                  expenses: {
                    ...travelExpenses.expenses,
                    [event.target.name]: event.target.value,
                  },
                }),
              ]}
              sx={{
                '.MuiInputBase-root': {
                  // fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768, // o 500
                  color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                  backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                },
              }}
            />
          </TollStyle>

          <ViaticosStyle>
            <TextField
              className="input"
              name="viaticos"
              label="Viaticos"
              variant="outlined"
              value={travelExpenses.expenses.viaticos}
              type="number"
              inputProps={{ style: { color: 'black' } }}
              onChange={(event) => [
                setTravelExpenses({
                  ...travelExpenses,
                  expenses: {
                    ...travelExpenses.expenses,
                    [event.target.name]: event.target.value,
                  },
                }),
              ]}
              sx={{
                '.MuiInputBase-root': {
                  // fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768, // o 500
                  color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                  backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                },
              }}
            />
          </ViaticosStyle>

          <WashedStyle>
            <TextField
              className="input"
              name="washed"
              label="Lavado"
              variant="outlined"
              value={travelExpenses.expenses.washed}
              type="number"
              inputProps={{ style: { color: 'black' } }}
              onChange={(event) => [
                setTravelExpenses({
                  ...travelExpenses,
                  expenses: {
                    ...travelExpenses.expenses,
                    [event.target.name]: event.target.value,
                  },
                }),
              ]}
              sx={{
                '.MuiInputBase-root': {
                  // fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768, // o 500
                  color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                  backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                },
              }}
            />
          </WashedStyle>

          <LaborUnionStyle>
            <TextField
              className="input"
              name="laborUnion"
              label="Sindicato"
              variant="outlined"
              value={travelExpenses.expenses.laborUnion}
              type="number"
              inputProps={{ style: { color: 'black' } }}
              onChange={(event) => [
                setTravelExpenses({
                  ...travelExpenses,
                  expenses: {
                    ...travelExpenses.expenses,
                    [event.target.name]: event.target.value,
                  },
                }),
              ]}
              sx={{
                '.MuiInputBase-root': {
                  // fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768, // o 500
                  color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                  backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                },
              }}
            />
          </LaborUnionStyle>

          <OthersStyle>
            <TextField
              className="input"
              name="others"
              label="Otros"
              variant="outlined"
              value={travelExpenses.expenses.others}
              type="number"
              inputProps={{ style: { color: 'black' } }}
              onChange={(event) => [
                setTravelExpenses({
                  ...travelExpenses,
                  expenses: {
                    ...travelExpenses.expenses,
                    [event.target.name]: event.target.value,
                  },
                }),
              ]}
              sx={{
                '.MuiInputBase-root': {
                  // fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768, // o 500
                  color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                  backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                },
              }}
            />
          </OthersStyle>

          <OtherDescriptionStyle>
            <TextField
              placeholder="Descripcion de otros gastos..."
              multiline
              maxRows={4}
              className="input"
              type="text"
              variant="outlined"
              label="Descripcion "
              name="otherDescription"
              value={travelExpenses.expenses.otherDescription}
              // inputProps={{ style: { color: 'black' } }}
              onChange={(event) =>
                setTravelExpenses((prevState) => ({
                  ...prevState,
                  expenses: {
                    ...prevState.expenses,
                    [event.target.name]: event.target.value,
                  },
                }))
              }
              sx={{
                '.MuiInputBase-root': {
                  // fontWeight: Css_TextField_Select.fontWeighScreenUpperW_768, // o 500
                  color: Css_TextField_Select.color, // Cambia el color del texto que se escribe en el TextField
                  backgroundColor: Css_TextField_Select.backgroundColor, // Cambia el color de fondo del TextField
                },
              }}
            />
          </OtherDescriptionStyle>

          <TextTotalExpensesStyle>
            {/* El boton guardar debera actualizar: totalExpenses:getTotalExpenses()  */}
            <span>{`Total Egresos (Bs): ${getTotalExpenses()}`}</span>
          </TextTotalExpensesStyle>

          <Btn>
            <PlainModalButton
              primaryBtnText="registrar egreso del viaje"
              dialogTitle="Gatos de viaje"
              dialogText="Esta seguro de registrar este egreso?"
              closeBtnText="cancelar"
              continueBtnText="si"
              functionToExecute={updateTravelExpenses}
              functionParameters={{
                travelExpensesData,
                branchNumber,
              }}
              thirdFunctionToExecute={componentDefaultData}
            />
          </Btn>
        </BodyContainer>
      </Background>
    </>
  );
};
