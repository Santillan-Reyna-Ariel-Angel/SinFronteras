import React, { useState } from 'react';
//MUI:
import {
  InputLabel,
  MenuItem,
  ListSubheader,
  FormControl,
  Select,
} from '@mui/material/';

const destinitys = [
  {
    departament: 'Chuquisaca',
    locations: [
      {
        number: 1,
        location: 'Sucre',
      },
      {
        number: 2,
        location: 'Zudañez',
      },
    ],
  },
  {
    departament: 'Santa Cruz',
    locations: [
      {
        number: 3,
        location: 'City Santa cruz',
      },
      {
        number: 4,
        location: 'Plan 3mil',
      },
    ],
  },
  {
    departament: 'Tarija',
    locations: [
      {
        number: 5,
        location: 'City 1 Tarija',
      },
      {
        number: 6,
        location: 'City 2 Tarija',
      },
    ],
  },
];

export const BranchRegistration = () => {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">Grouping 2: </InputLabel>
        <Select defaultValue="" id="grouped-select" label="Grouping">
          <ListSubheader>Chuquisaca</ListSubheader>
          <MenuItem value={'Sucre'}>Sucre</MenuItem>
          <MenuItem value={'Zudañez'}>Zudañez</MenuItem>

          <ListSubheader>Santa Cruz</ListSubheader>
          <MenuItem value={3}>City santa cruz</MenuItem>
          <MenuItem value={4}>plan 3mil</MenuItem>

          <ListSubheader>Tarija</ListSubheader>
          <MenuItem value={'City 1 tarija'}>City 1 tarija</MenuItem>
          <MenuItem value={'City 2 tarija'}>City 2 tarija</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">Grouping Test: </InputLabel>
        <Select defaultValue="" id="grouped-select-test" label="GroupingTest">
          {destinitys.map((destinity) => {
            return (
              <>
                <ListSubheader>{destinity.departament}</ListSubheader>
                {destinity.locations.map((locality) => (
                  <MenuItem key={locality.number} value={locality.number}>
                    {locality.location}
                  </MenuItem>
                ))}
              </>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};
