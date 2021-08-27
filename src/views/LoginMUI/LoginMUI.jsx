import React from "react";
import "rmwc/dist/styles";
import { Link } from "react-router-dom";
import {
  Background,
  ButtonEnter,
  Container,
  ContainerLogo,
  InputPassword,
  InputUser,
  TextRecoverPassword,
} from "./LoginMUIStyles";
import { TextField, Button } from "@material-ui/core";

const LoginMUI = () => {
  return (
    <>
      <Background>
        <Container>
          <ContainerLogo />
          <InputUser>
            <TextField
              className="input"
              required
              label="Usuario..."
              variant="outlined"
            />
          </InputUser>
          <InputPassword>
            <TextField
              type="password"
              className="input"
              required
              label="Contraseña..."
              variant="outlined"
            />
          </InputPassword>
          <TextRecoverPassword>
            <Link className="link" to="/recover-password">
              Olvidaste tu contraseña?
            </Link>
          </TextRecoverPassword>
          <ButtonEnter>
            <Link className="link" to="/home">
              <Button
                className="buttonEnter"
                variant="contained"
                size="medium"
                color="primary"
              >
                ingresar
              </Button>
            </Link>
          </ButtonEnter>
        </Container>
      </Background>
    </>
  );
};

export default LoginMUI;
