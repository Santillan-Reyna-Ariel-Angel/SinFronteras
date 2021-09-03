import React, { Suspense } from "react";
import ReactDOM from "react-dom";
//Archivo de rutas
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={"Cargando datos..."}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
