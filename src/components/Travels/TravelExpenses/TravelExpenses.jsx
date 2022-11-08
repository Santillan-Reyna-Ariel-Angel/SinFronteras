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
import { ContextBranchTripsMade } from './../../../contexts/ContextBranchTripsMade.js';
import { ContextBranchOffice } from './../../../contexts/ContextBranchOffice';

//Firebase Functions:
import { createTravelExpenses } from './../Firebase/createTravelExpenses';
//States:
//Components:
import { PlainModalButton } from './../../PlainModalButton/PlainModalButton';
//Others:

export const TravelExpenses = () => {
  //ContextUserData
  const branchTripsMade = useContext(ContextBranchTripsMade);
  // console.log('branchTripsMade', branchTripsMade);

  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  const {
    branchInformation: { branchNumber },
  } = branchOffice ? branchOffice : { branchInformation: { branchNumber: '' } };

  let branchTripsMadeKeys =
    branchTripsMade !== undefined ? Object.keys(branchTripsMade) : [];
  // console.log('branchTripsMadeKeys', branchTripsMadeKeys);

  let necessaryKeys = branchTripsMadeKeys.map((tripMadeKey) => {
    let fragmentedKey = tripMadeKey.split('_');

    let travelDate = fragmentedKey[1];
    let departureTime = fragmentedKey[2].replace('-', ':');
    let busEnrollment = fragmentedKey[3];

    let selectableOption = `bus ${busEnrollment} (${travelDate} -> ${departureTime})`;

    return { busEnrollment, selectableOption, tripMadeKey };
  });
  // console.log('necessaryKeys', necessaryKeys);

  const dataDefault = {
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
  const [enrollmentSelectableOption, setEnrollmentSelectableOption] =
    useState(undefined);

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
              onChange={(event) => [
                setTravelExpenses((prevState) => ({
                  ...prevState,
                  expenses: {
                    ...prevState.expenses,
                    [event.target.name]: event.target.value,
                  },
                })),
              ]}
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
              onChange={(event) => [
                setTravelExpenses({
                  ...travelExpenses,
                  expenses: {
                    ...travelExpenses.expenses,
                    [event.target.name]: event.target.value,
                  },
                }),
              ]}
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
              onChange={(event) => [
                setTravelExpenses({
                  ...travelExpenses,
                  expenses: {
                    ...travelExpenses.expenses,
                    [event.target.name]: event.target.value,
                  },
                }),
              ]}
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
              onChange={(event) => [
                setTravelExpenses({
                  ...travelExpenses,
                  expenses: {
                    ...travelExpenses.expenses,
                    [event.target.name]: event.target.value,
                  },
                }),
              ]}
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
              onChange={(event) => [
                setTravelExpenses({
                  ...travelExpenses,
                  expenses: {
                    ...travelExpenses.expenses,
                    [event.target.name]: event.target.value,
                  },
                }),
              ]}
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
              onChange={(event) => [
                setTravelExpenses({
                  ...travelExpenses,
                  expenses: {
                    ...travelExpenses.expenses,
                    [event.target.name]: event.target.value,
                  },
                }),
              ]}
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
              onChange={(event) =>
                setTravelExpenses((prevState) => ({
                  ...prevState,
                  expenses: {
                    ...prevState.expenses,
                    [event.target.name]: event.target.value,
                  },
                }))
              }
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
              functionToExecute={createTravelExpenses}
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
