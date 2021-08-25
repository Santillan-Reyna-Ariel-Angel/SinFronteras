import React from "react";
import "rmwc/dist/styles";
import "../LoginV3/Login3.css";
import { Button, TextField } from "rmwc";
import Logo from "../../sources/img/LogoSF.png";
import { Link } from "react-router-dom";

const LoginV3 = () => {
  return (
    <>
      <div className="background">
        <div className="container">
          {/* <img className="element1" src={Logo} alt="Logo" /> */}
          <div className="element1" />
          <div className="element2">
            <TextField className="input" required outlined label="Usuario..." />
          </div>
          <div className="element3">
            <TextField
              type="password"
              className="input"
              required
              outlined
              label="Contraseña..."
            />
          </div>
          <div className="element4">
            <Link className="link" to="/recover-password">
              Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="element5">
            <Link className="link" to="/home">
              <Button className="boton" label="ingresar" raised />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginV3;
