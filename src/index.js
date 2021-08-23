import React from "react";
import ReactDOM from "react-dom";

//////
import { Login } from "./views/Login";
import LoginV2 from "./views/LoginV2/LoginV2";
import LoginV3 from "./views/LoginV3/LoginV3";
//////

ReactDOM.render(
  <React.StrictMode>
    {/* <Login /> */}
    <LoginV3 />
  </React.StrictMode>,
  document.getElementById("root")
);
