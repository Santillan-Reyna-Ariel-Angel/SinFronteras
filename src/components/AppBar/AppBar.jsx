import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import MenuIcon from "@mui/icons-material/Menu";
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogSingOff from './DialogSingOff/DialogSingOff';
//Estilos propios
import { LogoAppBar } from './AppBarStyles';
//src-images
import ProfilePicture from '../../sources/img/PerfilFake.jpg';
//Context UserData
import { ContextUserData } from './../../contexts/ContextUserData';

export default function PrimarySearchAppBar() {
  const userData = useContext(ContextUserData);
  // console.log("userData", userData);
  const { names } = userData ? userData : { names: '' };
  // console.log("names", names);

  // const messagesCant = 25;
  // const notificationsCant = 35;
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const UserProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>{DialogSingOff()}</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  //   Vista Movil
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* Los <MenuItem> son como botones: */}
      {/* <MenuItem>
        <IconButton size="large" aria-label="messages" color="inherit">
          <Badge badgeContent={messagesCant} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Mensajes</p>
      </MenuItem> */}

      {/* <MenuItem>
        <IconButton size="large" aria-label="notifications" color="inherit">
          <Badge badgeContent={notificationsCant} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notificaciones</p>
      </MenuItem> */}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar
            alt="Travis Howard"
            src={ProfilePicture}
            sx={{ ml: '-10px' }}
          />
        </IconButton>
        <p>{names}</p>
      </MenuItem>
    </Menu>
  );

  return (
    // <Box sx={{ flexGrow: 1 }}> podria dar solucion a la altura del sidebar
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#051E34' }}>
        <Toolbar>
          {/* icono menu(amburguesa) */}
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}

          <LogoAppBar />

          <Box sx={{ flexGrow: 1 }} />
          {/* Botones(tentativo a eliminar) */}
          {/* <Button variant="primary" color="" size="small">
            Estadisticas
          </Button> */}
          {/* <Button variant="primary" color="" size="small">
            proveedores
          </Button> */}
          {/* <Button variant="primary" color="" size="small">
            Reportes
          </Button> */}

          {/* Notificaciones escritorio */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton size="large" aria-label="messages" color="inherit">
              <Badge badgeContent={messagesCant} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
            {/* <IconButton size="large" aria-label="notifications" color="inherit">
              <Badge badgeContent={notificationsCant} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}

            <IconButton
              size="large"
              edge="end"
              aria-label="user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Typography variant="subtitle2" sx={{ mr: '5px' }}>
                {names}
              </Typography>
              <Avatar alt="Travis Howard" src={ProfilePicture} />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {UserProfileMenu}
    </Box>
  );
}
