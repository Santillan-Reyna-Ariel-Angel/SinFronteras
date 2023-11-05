import React from 'react';
import PrimarySearchAppBar from './../AppBar/AppBar.jsx';
import { Sidebar } from './../Sidebar/Sidebar';
import Box from '@mui/material/Box';
//Estilos:
import { Background } from './LayoutStyles';
//Others:
// import { programarTarea } from './functions.js';

export const Layout = (props) => {
  // const fechaDeseada = '05/11/2023'; // Formato "dd/MM/yyyy"
  // const horaDeseada = Number('08'); // Hora
  // const minutosDeseados = Number('55'); // Minutos
  // const segundosDeseados = 0; // Segundos

  // programarTarea(fechaDeseada, horaDeseada, minutosDeseados, segundosDeseados);

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
