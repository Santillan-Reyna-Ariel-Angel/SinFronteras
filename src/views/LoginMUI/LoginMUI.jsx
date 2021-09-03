import React, { useState } from "react";
import "rmwc/dist/styles";
import { Link, useHistory } from "react-router-dom";
import {
  Background,
  ButtonEnter,
  Container,
  ContainerLogo,
  InputPassword,
  InputUser,
  TextRecoverPassword,
} from "./loginMUIStyles";
import { TextField, Button } from "@material-ui/core";

//EventosFirebase;
import { Auth } from "../../events/firebaseEvents";
const LoginMUI = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendLogin = async () => {
    console.log(email, password);
    Auth(email, password);
    history.push("/notes");
  };
  return (
    <>
      <Background>
        <Container>
          <ContainerLogo />
          <InputUser>
            <TextField
              type="email"
              className="input"
              required
              label="Corrreo..."
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
            />
          </InputUser>
          <InputPassword>
            <TextField
              type="password"
              className="input"
              required
              label="Contraseña..."
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
            />
          </InputPassword>
          <TextRecoverPassword>
            <Link className="link" to="/recover-password">
              Olvidaste tu contraseña?
            </Link>
          </TextRecoverPassword>
          <ButtonEnter>
            <Button
              className="buttonEnter"
              variant="contained"
              size="medium"
              color="primary"
              onClick={() => sendLogin()}
            >
              ingresar
            </Button>
          </ButtonEnter>
        </Container>
      </Background>
    </>
  );
};

export default LoginMUI;
