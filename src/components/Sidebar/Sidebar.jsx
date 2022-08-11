import React from 'react';
//MUI-styles:
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
//MUI:
import { Box, Divider, List, Paper } from '@mui/material/';
//Components:
import { MenuHeader } from './MenuHeader/MenuHeader'; // Cabecera del menu
import { MenuBody } from './MenuBody/MenuBody'; // Cuerpo del menu

const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    //   Padding la caja general del sidebar
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    //   padding de todos los iconos
    minWidth: 0,
    marginRight: 8,
  },
  '& .MuiSvgIcon-root': {
    // tamaño de todos los iconos
    fontSize: 20,
  },
});

export default function CustomizedList() {
  return (
    <>
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
          <Paper elevation={0} sx={{ maxWidth: 225, borderRadius: '0px' }}>
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
    </>
  );
}
