import React, { Suspense } from "react";
import ReactDOM from "react-dom";
//Archivo de rutas
import App from "./App";
//Firebase
import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "./firebase-config";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={"Cargamdo datos..."}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <App />
      </FirebaseAppProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
