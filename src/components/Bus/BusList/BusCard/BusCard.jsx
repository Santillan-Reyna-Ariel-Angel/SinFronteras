import React from 'react';

//MUI:
import { Box, Button, Checkbox } from '@mui/material/';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
// import NoTransferRoundedIcon from '@mui/icons-material/NoTransferRounded';

//Styles:
//Contexts:
//Firebase Functions:
//States:
//Components:
//Others:

export const BusCard = () => {
  let designatedBranch = 'Sucursal X',
    matricula = '2009-kum';

  return (
    <>
      <Box sx={{ width: 100 }}>
        <Checkbox
          icon={<DirectionsBusRoundedIcon sx={{ color: 'black' }} />} //Modificar para cambiar el color
          checkedIcon={<DirectionsBusRoundedIcon />}
          disableRipple //Anula el hover y efecto de ondas al hacer el check
          // size="medium"
          sx={{
            '& .MuiSvgIcon-root': { fontSize: 50 },
            //   '&:hover': { bgcolor: 'transparent' }, //hover transratente (innecesario se se usa la propiedad disableRipple)
          }}
        />

        <pan>{`${matricula}`}</pan>
        <span>{`${
          designatedBranch !== '' ? designatedBranch : 'DISPONIBLE'
        }`}</span>
        <Button variant="contained" color="success" size="small">
          Data
        </Button>
      </Box>
    </>
  );
};
