import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Button } from "@material-ui/core";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  //theme.mixins.toolbar: calculara de manera auto,atica el alto
  // offset:theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1, //Hara que ocupe todo e espacio disponible
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}));
const NavBar = ({ accionAbrir }) => {
  const clases = useStyles();
  return (
    <>
      <AppBar className={clases.appBar}>
        <Toolbar>
          <IconButton
            className={clases.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => accionAbrir()}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={clases.title} variant="h6">
            Sin Fronteras.jpg
          </Typography>
          <Button variant="text" color="inherit">
            Cerrar sesion
          </Button>
        </Toolbar>
      </AppBar>
      {/* <div className={clases.offset}></div> */}
    </>
  );
};

export default NavBar;
