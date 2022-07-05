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
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material/';

//icons-material
import {
  ArrowRight,
  KeyboardArrowDown,
  Home,
  Settings,
} from '@mui/icons-material';

// Estilos propios
import { LinksStyles } from './SidebarStyles';

//Menu del sidebar:
import { sidebarMenuList } from './SidebarMenu/SidebarMenu';
const SidebarMenu = sidebarMenuList ? sidebarMenuList : [];

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

  // Este comentario es una prueba para verificar la creacion exitosa de un anueva rama
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
          <Paper elevation={0} sx={{ maxWidth: 225 }}>
            <FireNav component="nav" disablePadding>
              {/* Cabeza Menu */}
              <ListItem component="div" disablePadding>
                <ListItemButton sx={{ height: '100%' }}>
                  <ListItemIcon>
                    <Home color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Menu"
                    primaryTypographyProps={{
                      color: 'primary',
                      fontWeight: 'medium',
                      variant: 'body2',
                    }}
                  />
                </ListItemButton>
                <Tooltip title="Configuraciones">
                  <IconButton
                    size="large"
                    sx={{
                      '& svg': {
                        color: 'rgba(255,255,255,0.8)',
                        transition: '0.2s',
                        transform: 'translateX(0) rotate(0)',
                      },
                      '&:hover, &:focus': {
                        bgcolor: 'unset',
                        '& svg:first-of-type': {
                          transform: 'translateX(-4px) rotate(-20deg)',
                        },
                        '& svg:last-of-type': {
                          right: 0,
                          opacity: 1,
                        },
                      },
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        height: '80%',
                        display: 'block',
                        left: 0,
                        width: '1px',
                        bgcolor: 'divider',
                      },
                    }}
                  >
                    <Settings />
                    <ArrowRight
                      sx={{ position: 'absolute', right: 4, opacity: 0 }}
                    />
                  </IconButton>
                </Tooltip>
              </ListItem>
              <Divider />
              {/* Caja de elementos:  */}
              <Box
                sx={{
                  bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                  // py podemos ponerle 0 para que nuestros elementos esten mas cercanos entre si
                  py: open ? 2 : 0,
                }}
              >
                {SidebarMenu.map((dad) => {
                  return (
                    <>
                      <ListItemButton
                        alignItems="flex-start"
                        onClick={() => setOpen(!open)}
                        sx={{
                          // Estilos de la caja que contiene al padre
                          px: 3,
                          pt: 1.5,
                          pb: open ? 0 : 1.5,
                          '&:hover, &:focus': {
                            color: 'primary.main',
                            '& svg': {
                              opacity: 1,
                            },
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
                            color: open
                              ? 'rgba(0,0,0,0)'
                              : 'rgba(255,255,255,0.5)',
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
                              // primary={child.title}
                              primaryTypographyProps={{
                                fontSize: 13,
                                fontWeight: 'medium',
                              }}
                            >
                              <LinksStyles>
                                <Link to={child.path} className="linksStyles">
                                  {child.title}
                                </Link>
                              </LinksStyles>
                            </ListItemText>
                          </ListItemButton>
                        ))}
                    </>
                  );
                })}
              </Box>
            </FireNav>
          </Paper>
        </ThemeProvider>
      </Box>
    </>
  );
}
