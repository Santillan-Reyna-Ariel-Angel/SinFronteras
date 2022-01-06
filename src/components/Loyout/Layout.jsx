import React from 'react';
import PrimarySearchAppBar from './../AppBar/AppBar.jsx';
import CustomizedList from './../Sidebar/Sidebar';
import Box from '@mui/material/Box';
//Estilos:
import { Background } from './LayoutStyles';
const Layout = (props) => {
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
          {CustomizedList()}
          {props.children}
        </Box>
      </Background>
    </>
  );
};

export default Layout;
