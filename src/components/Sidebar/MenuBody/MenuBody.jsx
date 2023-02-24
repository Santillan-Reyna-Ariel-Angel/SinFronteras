import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
//MUI:
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material/';
//MUI icons-material:
import { KeyboardArrowDown } from '@mui/icons-material';
// Styles:
import { LinksStyles } from './MenuBodyStyles';
//Components:
import {
  // menuBodyItemList,
  getMenuBodyItemList,
} from './MenuBodyItemList'; //Menu del sidebar
// Contexts:
import { ContextUserData } from './../../../contexts/ContextUserData';

const MenuBody = () => {
  // ContextUserData:
  const userData = useContext(ContextUserData);
  console.log('userData', userData);
  let { charge } = userData ? userData : { charge: '' };

  //Antiguo:
  // const sidebarMenuBodyItemList = menuBodyItemList ? menuBodyItemList : [];

  // New:
  //(charge)
  let menuBodyItemList = getMenuBodyItemList('chofer');
  const sidebarMenuBodyItemList = menuBodyItemList ? menuBodyItemList : [];
  console.log('sidebarMenuBodyItemList', sidebarMenuBodyItemList);

  const urlPath = window.location.pathname;
  // O tambien importando "useLocation" de react-router-dom :
  // const urlPath = useLocation();
  // console.log('urlPath', urlPath);

  const States = (dad, setDad) => {
    let dadFunc = dad;
    let setDadFunc = setDad;
    [dadFunc, setDadFunc] = useState(true);

    return { dadFunc, setDadFunc };
  };

  return (
    <>
      {/* Cuerpo del menu:  */}
      <Box
        sx={{
          // bgcolor: 'rgba(71, 98, 130, 0.2)', //Cortina de color tenue solo sobre los items(no es hover)
          py: 1.25, // py: 0 para que nuestros elementos esten mas cercanos entre si
        }}
      >
        {sidebarMenuBodyItemList.map((dad, index) => {
          const s = States(dad, 'set' + dad);

          return (
            <>
              {/* Items Padres: */}
              <ListItemButton
                alignItems="flex-start"
                onClick={() => [
                  s.setDadFunc(!s.dadFunc),
                  // console.log(
                  //   `N Item: ${index + 1} | state: ${s.dadFunc} | setState: `,
                  //   s.setDadFunc
                  // ),
                ]}
                // Estilos de la caja que contiene al padre:
                sx={{
                  px: 3,
                  pt: 1.5,
                  pb: s.dadFunc ? 0 : 1.5,
                  '&:hover, &:focus': {
                    // color: 'primary.main',
                    // Estilo del icono flecha del padre(open/closed)
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
                {/* Items padres texto: */}
                <ListItemText
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
                    color: s.dadFunc
                      ? 'rgba(0,0,0,0)'
                      : 'rgba(255,255,255,0.5)',
                  }}
                  //   Estilos del texto padre(titulo):
                  sx={{
                    my: 0,
                    // El hover y focus es innecesario(Por que el sx del la caja padre afecta a este):
                    // '&:hover, &:focus': {
                    //   color: 'primary.main',
                    // },
                  }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: s.dadFunc ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                  }}
                />
              </ListItemButton>

              {/* Items Hijos (s.dadFunc &&
                dad.children.map(...) sirven para esconder o no los elementos hijos: */}
              {s.dadFunc &&
                dad.children.map((child) => (
                  // Los Items hijos se envuelven en <Link to={child.path} ...> para que cuando se presione en cualquier area(texto,icono o misma seccion), este nos pueda redireccionar.
                  <LinksStyles>
                    <Link to={child.path} className="linksStyles">
                      <ListItemButton
                        key={child.title}
                        // Estilos de la caja que contiene los Items(hijos):
                        sx={{
                          py: 0,
                          minHeight: 32,
                          color: `${
                            child.path === urlPath
                              ? 'rgb(102, 157, 246)'
                              : 'rgba(255,255,255,.8)'
                          }`,
                          '&:hover, &:focus': {
                            // color: 'primary.main',
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
                        {/* Items hijos texto: */}
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

export { MenuBody };
