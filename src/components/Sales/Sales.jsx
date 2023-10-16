import React from 'react';
//MUI:
import Stack from '@mui/material/Stack';
//Styles:
import { Background } from './SalesStyles';
//Components:
import { TravelSearch } from './TravelSearch/TravelSearch';

const Sales = () => {
  return (
    <>
      <Background>
        <Stack
          direction="column"
          spacing={1} // or 1.25
          alignItems="center" // Organiza  a lo vertical
          justifyContent="flex-start" // Organiza  a lo horizontal
        >
          <TravelSearch />
        </Stack>
      </Background>
    </>
  );
};

export { Sales };
