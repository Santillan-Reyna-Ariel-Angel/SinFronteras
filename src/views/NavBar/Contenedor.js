import React, { useState } from "react";
import { Hidden, makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import theme from "./ThemeConfig";
import Cajon from "./Cajon";
import Cajita from "./Cajita";

const estilos = makeStyles({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
});

const Contenedor = () => {
  const clases = estilos();
  const [abrir, setAbrir] = useState(false);

  const accionAbrir = () => {
    setAbrir(!abrir);
  };
  return (
    <>
      <div className={clases.root}>
        <NavBar accionAbrir={accionAbrir} />
        <Hidden xsDown>
          <Cajon variant="permanent" open={true} />
        </Hidden>

        <Hidden smUp>
          <Cajon variant="temporary" open={abrir} onClose={accionAbrir} />
        </Hidden>

        <div className={clases.content}>
          <div className={clases.toolbar}></div>
          <Cajita />
        </div>
      </div>
    </>
  );
};

export default Contenedor;
