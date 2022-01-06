import React from 'react';
import TravelSearch from './TravelSearch/TravelSearch';

//iconos
import Stack from '@mui/material/Stack';

const Sales = () => {
  return (
    <>
      <Stack direction="column" spacing={2}>
        <TravelSearch />
      </Stack>
    </>
  );
};

export default Sales;
