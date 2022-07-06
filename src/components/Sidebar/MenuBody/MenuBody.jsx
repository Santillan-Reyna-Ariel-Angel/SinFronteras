import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

//material
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material/';

//icons-material
import { KeyboardArrowDown } from '@mui/icons-material';

// Estilos propios
import { LinksStyles } from './MenuBodyStyles';

//Menu del sidebar:
import { menuBodyItemList } from './MenuBodyItemList';

const MenuBody = () => {
  // averiguar para que sirve este estado:
  const [open, setOpen] = useState(true);
  console.log('open:', open);

  const sidebarMenuBodyItemList = menuBodyItemList ? menuBodyItemList : [];

  const isSelectItem = (index, itemTitle) => {
    sidebarMenuBodyItemList[index].title === itemTitle
      ? setOpen(!open)
      : setOpen(open);
  };

  const urlPath = window.location.pathname;
  console.log('urlPath', urlPath);
  // O tambien:
  const sampleLocation = useLocation();
  console.log('url2', sampleLocation.pathname);

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
              {/* Items Padres: */}
              <ListItemButton
                alignItems="flex-start"
                // onClick={
                //   () => isSelectItem(index, dad.title)
                //   //   [
                //   //   setOpen(!open),
                //   //   console.log(sidebarMenuBodyItemList[index].title),
                //   // ]
                // }

                // Estilos de la caja que contiene al padre:
                sx={{
                  px: 3,
                  pt: 1.5,
                  pb: open ? 0 : 1.5,
                  '&:hover, &:focus': {
                    // color: 'primary.main',
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
                    color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
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
                    transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                  }}
                />
              </ListItemButton>

              {/* Items Hijos: */}
              {open &&
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
