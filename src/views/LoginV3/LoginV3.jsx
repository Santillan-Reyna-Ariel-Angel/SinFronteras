import React from "react";
import "rmwc/dist/styles";
import "../LoginV3/Login3.css";
import { Button, TextField } from "rmwc";
import Logo from "../../sources/img/LogoSF.png";
import { Link, Route } from "react-router-dom";

const LoginV3 = () => {
  return (
    <>
      <div className="background">
        <div className="container">
          {/* <img className="element1" src={Logo} alt="Logo" /> */}
          <div className="element1" />
          <div className="element2">
            <TextField required outlined label="Usuario..." />
          </div>
          <div className="element3">
            <TextField required outlined label="Contraseña..." />
          </div>
          <div className="element4">
            {/* <Link  to="/recueperar-cuenta"> */}
            Olvidaste tu contraseña?
            {/* </Link> */}
          </div>
          <div className="element5">
            <Button className="Boton" label="ingresar" raised />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginV3;
