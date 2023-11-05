import React, { useContext } from 'react';
import PrimarySearchAppBar from './../AppBar/AppBar.jsx';
import { Sidebar } from './../Sidebar/Sidebar';
import Box from '@mui/material/Box';
//Estilos:
import { Background } from './LayoutStyles';
//Contexts:
import { ContextBranchOffice } from './../../contexts/ContextBranchOffice.js';
import { ContextBranchTripsMade } from './../../contexts/ContextBranchTripsMade.js';
//Others:
import { getDataForRemoveReservations } from './functions.js';

export const Layout = (props) => {
  //ContextBranchOffice:
  const branchOffice = useContext(ContextBranchOffice);
  const {
    branchInformation: { branchNumber },
  } = branchOffice ? branchOffice : { branchInformation: { branchNumber: '' } };
  console.log('branchNumber', branchNumber);

  // ContextBranchTripsMade:
  const branchTripsMade = useContext(ContextBranchTripsMade);
  // console.log('branchTripsMade', branchTripsMade);

  let tripMadeKeyList =
    branchTripsMade !== undefined && branchTripsMade !== null
      ? Object.keys(branchTripsMade)
      : [];
  // console.log('tripMadeKeyList', tripMadeKeyList);

  let reserveSeatsList = tripMadeKeyList
    .map((tripMadeKey) =>
      branchTripsMade[tripMadeKey].reserveSeats
        ? branchTripsMade[tripMadeKey].reserveSeats
        : 'emptyReserveSeats'
    )
    .filter((reserveSeats) => reserveSeats !== 'emptyReserveSeats');
  // console.log('reserveSeatsList', reserveSeatsList);

  const dataForRemoveReservations = getDataForRemoveReservations({
    reserveSeatsList,
    branchNumber,
  });
  console.log('dataForRemoveReservations:', dataForRemoveReservations);

  return (
    <>
      <Background>
        {PrimarySearchAppBar()}

        <Box
          sx={{
            display: 'flex',
            // flexWrap: "no-wrap",
            // display: "inline-block",
            // justifyContent: "center",
            // alignItems: "center",
            // bgcolor: "background.paper",
          }}
        >
          {Sidebar()}
          {props.children}
        </Box>
      </Background>
    </>
  );
};
