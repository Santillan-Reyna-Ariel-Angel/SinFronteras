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
//Contexts:
import { ContextBranchTripsMade } from './../../../contexts/ContextBranchTripsMade.js';
//Firebase Functions:
//States:
//Components:
//Others:

export const TravelExpenses = () => {
  //ContextUserData
  const branchTripsMade = useContext(ContextBranchTripsMade);
  // console.log('branchTripsMade', branchTripsMade);

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

  console.log('travelExpenses', travelExpenses);
  return (
    <>
      <FormControl className="input">
        <InputLabel>Seleccionar viaje</InputLabel>
        <Select
          value={enrollmentSelectableOption} //travelExpenses.busEnrollment
          name="busEnrollment"
          onChange={(event) => [
            setTravelExpenses({
              ...travelExpenses,
              [event.target.name]: getBusEnrollment(event.target.value),
              tripMadeKey: getTripMadeKey(event.target.value),
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

      <TextField
        className="input"
        name="diesel"
        label="Diesel"
        variant="outlined"
        value={travelExpenses.expenses.diesel}
        type="number"
        onChange={(event) =>
          setTravelExpenses({
            ...travelExpenses,
            expenses: {
              ...travelExpenses.expenses,
              [event.target.name]: event.target.value,
            },
          })
        }
      />

      <TextField
        className="input"
        name="toll"
        label="Peaje"
        variant="outlined"
        value={travelExpenses.expenses.toll}
        type="number"
        onChange={(event) =>
          setTravelExpenses({
            ...travelExpenses,
            expenses: {
              ...travelExpenses.expenses,
              [event.target.name]: event.target.value,
            },
          })
        }
      />

      <TextField
        className="input"
        name="viaticos"
        label="Viaticos"
        variant="outlined"
        value={travelExpenses.expenses.viaticos}
        type="number"
        onChange={(event) =>
          setTravelExpenses({
            ...travelExpenses,
            expenses: {
              ...travelExpenses.expenses,
              [event.target.name]: event.target.value,
            },
          })
        }
      />

      <TextField
        className="input"
        name="washed"
        label="Lavado"
        variant="outlined"
        value={travelExpenses.expenses.washed}
        type="number"
        onChange={(event) =>
          setTravelExpenses({
            ...travelExpenses,
            expenses: {
              ...travelExpenses.expenses,
              [event.target.name]: event.target.value,
            },
          })
        }
      />

      <TextField
        className="input"
        name="laborUnion"
        label="Sindicato"
        variant="outlined"
        value={travelExpenses.expenses.laborUnion}
        type="number"
        onChange={(event) =>
          setTravelExpenses({
            ...travelExpenses,
            expenses: {
              ...travelExpenses.expenses,
              [event.target.name]: event.target.value,
            },
          })
        }
      />

      <TextField
        className="input"
        name="others"
        label="Otros"
        variant="outlined"
        value={travelExpenses.expenses.others}
        type="number"
        onChange={(event) =>
          setTravelExpenses({
            ...travelExpenses,
            expenses: {
              ...travelExpenses.expenses,
              [event.target.name]: event.target.value,
            },
          })
        }
      />
    </>
  );
};
