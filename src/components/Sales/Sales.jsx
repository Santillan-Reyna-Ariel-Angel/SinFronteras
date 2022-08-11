import React from 'react';
//MUI:
import Stack from '@mui/material/Stack';
//Components:
import { TravelSearch } from './TravelSearch/TravelSearch';

const Sales = () => {
  return (
    <>
      <Stack direction="column" spacing={2}>
        <TravelSearch />
      </Stack>
    </>
  );
};

export { Sales };
