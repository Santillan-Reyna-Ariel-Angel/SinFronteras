import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextListarNotas } from "./../../contexts/ContextListarNotas";
import CustomizedList from "./../Sidebar/Sidebar";
const Home = () => {
  const notes = useContext(ContextListarNotas);
  const { id, title, body_note } = notes ? notes : { title: "" };

  return (
    <>
      {/* <h2>Bienvenido</h2>
      <p>{title || ""}</p>
      <p>{id || ""}</p>
      <p>{body_note || ""}</p>
      <Link to="/registro-usuarios">Registro de ususarios</Link> */}
      {CustomizedList()}
    </>
  );
};

export default Home;
