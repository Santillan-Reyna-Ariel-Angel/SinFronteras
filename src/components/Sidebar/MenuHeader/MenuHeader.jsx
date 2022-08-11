import React from 'react';
//MUI:
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  //   IconButton,
  //   Tooltip,
} from '@mui/material/';
//MUI icons-material:
import {
  // ArrowRight,
  Home,
  //   Settings,
} from '@mui/icons-material';

const MenuHeader = () => {
  return (
    <>
      {/* Cabeza Menu  */}
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
        {/* Icono de configuracion(Superior Lateral Derecho): */}
        {/* <Tooltip title="Configuraciones">
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
                bgcolor: 'divider', //Linea Vertical divisora con la con titulo del sidebar
              },
            }}
          >
            <Settings />
            <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
          </IconButton>
        </Tooltip> */}
      </ListItem>
    </>
  );
};

export { MenuHeader };
