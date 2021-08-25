import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//////
import { Login } from "./views/Login";
//////

ReactDOM.render(
  <React.StrictMode>
    {/* <Login /> */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
