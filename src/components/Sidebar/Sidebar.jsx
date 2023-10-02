import React, { useState } from 'react';
//MUI-styles:
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
//MUI:
import { Box, Divider, List, Paper } from '@mui/material/';
//Components:
import { MenuHeader } from './MenuHeader/MenuHeader'; // Cabecera del menu
import { MenuBody } from './MenuBody/MenuBody'; // Cuerpo del menu

const FireNav = styled(List)({
  '& .MuiListItem-root': {
    //margin de House menu
    marginLeft: -15,
  },

  //Cambia a tdos los botones de la lista 1er y 2do orden:
  // '.MuiButtonBase-root': {
  //   paddingTop: 10,
  // },

  '& .MuiListItemButton-root': {
    //   Padding la caja general del sidebar
    paddingLeft: 24,
    paddingRight: 24,
    //breakpoint:
    [`@media screen and (max-width: 768px)`]: {
      // Aplica el ancho de 160px en pantallas <= 768px
      paddingLeft: 20,
      paddingRight: 10,
    },
  },

  //modifica el padding de todos los iconos:
  // '.MuiSvgIcon-root': {
  //   paddingLeft: 0,
  //   paddingRight: 0,
  // },

  '& .MuiListItemIcon-root': {
    //   padding de todos los iconos
    minWidth: 0, //necesario
    paddingRight: 8,
    paddingLeft: 0,
  },

  '& .MuiSvgIcon-root': {
    // tamaño de todos los iconos
    fontSize: 20,
    //breakpoint:
    [`@media screen and (max-width: 768px)`]: {
      // Aplica el ancho de 160px en pantallas <= 768px
      fontSize: 17,
    },
  },

  '.MuiTypography-root': {
    fontSize: 12,
    // fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    //breakpoint:
    [`@media screen and (max-width: 768px)`]: {
      // Aplica el ancho de 160px en pantallas <= 768px
      fontSize: 11,
    },
  },
});

export let showMenu, setShowMenu;

export const Sidebar = () => {
  [showMenu, setShowMenu] = useState(true);
  console.log('showMenu', showMenu);

  return (
    <>
      {showMenu && (
        <Box sx={{ display: 'flex' }}>
          <ThemeProvider
            theme={createTheme({
              components: {
                MuiListItemButton: {
                  defaultProps: {
                    disableTouchRipple: true,
                  },
                },
              },
              palette: {
                mode: 'dark',
                primary: {
                  main: 'rgb(102, 157, 246)',
                },
                background: { paper: 'rgb(5, 30, 52)' },
              },
            })}
          >
            {/*<Paper> Es el contenedor al cual podemos aplicar estilos al sidebar(borderRadius,etc): */}
            <Paper
              elevation={0}
              sx={{
                // width: 155, //215,
                maxWidth: 155, // 215
                borderRadius: '0px',
                //breakpoint:
                [`@media screen and (max-width: 768px)`]: {
                  width: '115px', // Aplica el ancho de 115px en pantallas <= 768px
                },
              }}
            >
              <FireNav component="nav" disablePadding>
                <Divider />
                {/* Cabeza Menu: */}
                <MenuHeader />
                <Divider />
                {/* Cuerpo del menu:  */}
                <MenuBody />
              </FireNav>
            </Paper>
          </ThemeProvider>
        </Box>
      )}
    </>
  );
};
