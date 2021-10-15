import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
//Estilos:
import {
  Background,
  ButtonEnter,
  Container,
  ContainerLogo,
  InputPassword,
  InputUser,
  TextRecoverPassword,
} from "./loginStyles";
import { TextField, Button } from "@mui/material";

//EventosFirebase;
import { Auth } from "../../events/firebaseEvents";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialError, setCredentialError] = useState(false);

  const sendLogin = async () => {
    console.log("sendLogin:", email, password);
    const accessToken = await Auth(email, password);
    if (accessToken !== null) {
      history.push("/principal");
      sessionStorage.setItem("userEmail", email);
      setCredentialError(false);
    } else {
      setCredentialError(true);
    }
  };
  return (
    <>
      <Background>
        <Container>
          <ContainerLogo />
          <InputUser>
            <TextField
              error={credentialError}
              type="email"
              id="user"
              className="input"
              required
              label="Corrreo..."
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
            />
          </InputUser>
          <InputPassword>
            <TextField
              error={credentialError}
              type="password"
              className="input"
              id="password"
              required
              label="Contraseña..."
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
            />
          </InputPassword>
          <TextRecoverPassword>
            <Link className="link" to="/recuperar-contraseña">
              {credentialError ? "Olvidaste tu contraseña?" : ""}
            </Link>
          </TextRecoverPassword>
          <ButtonEnter>
            <Button
              className="buttonEnter"
              variant="contained"
              size="medium"
              color="success"
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

export default Login;
