import React from "react";
import "rmwc/dist/styles";
import { Button, TextField } from "rmwc";
import { Link } from "react-router-dom";
import { Styles } from "./LoginStyles";

const LoginV3 = () => {
  return (
    <>
      <Styles>
        <div className="background">
          <div className="container">
            <div className="element1" />
            <div className="element2">
              <TextField
                className="input"
                required
                outlined
                label="Usuario..."
              />
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
      </Styles>
    </>
  );
};

export default LoginV3;
