import React, { useContext } from "react";
import { ContextListarNotas } from "./../../contexts/ContextListarNotas";

const Home = () => {
  const notes = useContext(ContextListarNotas);
  const { id, title, body_note } = notes ? notes : { title: "" };

  return (
    <div>
      <h2>Bienvenido</h2>
      <p>{title || ""}</p>
      <p>{id || ""}</p>
      <p>{body_note || ""}</p>
    </div>
  );
};

export default Home;
