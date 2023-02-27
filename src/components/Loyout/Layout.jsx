import React from 'react';
import PrimarySearchAppBar from './../AppBar/AppBar.jsx';
import { Sidebar } from './../Sidebar/Sidebar';
import Box from '@mui/material/Box';
//Estilos:
import { Background } from './LayoutStyles';

export const Layout = (props) => {
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
