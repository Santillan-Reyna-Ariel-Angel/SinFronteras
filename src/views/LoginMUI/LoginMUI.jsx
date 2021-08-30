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
} from "./LoginMUIStyles";
import { TextField, Button } from "@material-ui/core";

//firebase;
// import { useFirebaseApp, useUser } from "reactfire";
import { firebase } from "firebase/app";
// import "firebase/auth";
import fire from "./../../firebase-config";

const LoginMUI = () => {
  // const firebase = useFirebaseApp();
  // const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendLogin = async () => {
    console.log(email, password);
    // await firebase.auth().createUserWithEmailAndPassword(email, password);
    // history.push("/home");

    // await firebase.auth().createUserWithEmailAndPassword(email, password);
    // fire.auth().signInWithEmailAndPassword(email, password);
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
            {/* <Link className="link" to="/home"> */}
            <Button
              className="buttonEnter"
              variant="contained"
              size="medium"
              color="primary"
              onClick={() => sendLogin()}
            >
              ingresar
            </Button>
            {/* </Link> */}
          </ButtonEnter>
        </Container>
      </Background>
    </>
  );
};

export default LoginMUI;
