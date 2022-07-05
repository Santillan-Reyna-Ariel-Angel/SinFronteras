import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// material-styles
import './SidebarStyles.css';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
//material
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material/';

//icons-material
import { KeyboardArrowDown } from '@mui/icons-material';

// Estilos propios
import { LinksStyles } from './SidebarStyles';

// Cabecera del menu:
import { MenuHeader } from './MenuHeader/MenuHeader';
//Menu del sidebar:
import { menuBodyItemList } from './MenuBodyItemList/MenuBodyItemList';

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
  // averiguar para que sirve este estado:
  const [open, setOpen] = useState(true);
  console.log('open:', open);

  const sidebarMenuBodyItemList = menuBodyItemList ? menuBodyItemList : [];

  const menuBody = () => {
    return (
      <>
        {/* Cuerpo del menu:  */}
        <Box
          sx={{
            bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
            // py podemos ponerle 0 para que nuestros elementos esten mas cercanos entre si
            py: open ? 2 : 0,
          }}
        >
          {sidebarMenuBodyItemList.map((dad, index) => {
            return (
              <>
                <ListItemButton
                  alignItems="flex-start"
                  // onClick={
                  //   () => isSelectItem(index, dad.title)
                  //   //   [
                  //   //   setOpen(!open),
                  //   //   console.log(sidebarMenuBodyItemList[index].title),
                  //   // ]
                  // }
                  sx={{
                    // Estilos de la caja que contiene al padre
                    px: 3,
                    pt: 1.5,
                    pb: open ? 0 : 1.5,
                    '&:hover, &:focus': {
                      color: 'primary.main',
                      // '& svg': {
                      //   opacity: 1,
                      // },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: 'inherit',
                      mt: '-7px',
                      ml: '-14px',
                    }}
                  >
                    {dad.icon}
                  </ListItemIcon>
                  <ListItemText
                    // Item padre
                    primary={dad.title}
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: 'medium',
                      lineHeight: '10px',
                      mb: '5px',
                    }}
                    secondary={dad.children.map((child) => {
                      return '*' + child.title + ' ';
                    })}
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: 12,
                      lineHeight: '12px',
                      color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    //   Estilos del texto padre(titulo)
                    sx={{
                      my: 0,
                      '&:hover, &:focus': {
                        color: 'primary.main',
                      },
                    }}
                  />
                  <KeyboardArrowDown
                    sx={{
                      mr: -1,
                      opacity: 0,
                      transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                      transition: '0.2s',
                    }}
                  />
                </ListItemButton>
                {/* Items */}
                {open &&
                  dad.children.map((child) => (
                    // Los Items hijos se envuelven en <Link to={child.path} ...> para que cuando se precione en cualquier area(texto,icono o misma seccion), este nos pueda redireccionar.
                    <LinksStyles>
                      <Link to={child.path} className="linksStyles">
                        <ListItemButton
                          key={child.title}
                          sx={{
                            py: 0,
                            minHeight: 32,
                            color: 'rgba(255,255,255,.8)',
                            '&:hover, &:focus': {
                              color: 'primary.main',
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: 'inherit',
                              pl: '12px',
                            }}
                          >
                            {child.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={child.title}
                            primaryTypographyProps={{
                              fontSize: 13,
                              fontWeight: 'medium',
                            }}
                          >
                            {child.title}
                          </ListItemText>
                        </ListItemButton>
                      </Link>
                    </LinksStyles>
                  ))}
              </>
            );
          })}
        </Box>
      </>
    );
  };

  const isSelectItem = (index, itemTitle) => {
    sidebarMenuBodyItemList[index].title === itemTitle
      ? setOpen(!open)
      : setOpen(open);
  };

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
              {/* Cabeza Menu: */}
              <MenuHeader />
              <Divider />
              {/* Cuerpo del menu:  */}
              {menuBody()}
            </FireNav>
          </Paper>
        </ThemeProvider>
      </Box>
    </>
  );
}
