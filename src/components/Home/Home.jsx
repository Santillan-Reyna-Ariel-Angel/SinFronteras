import React from "react";
import { ListarConOn2 } from "../../contexts/hooks/ListarNotas";
const Home = () => {
  const { notes } = ListarConOn2();
  const { id, title, body_note } = notes ? notes : { title: "" };

  return (
    <div>
      <h2>Bienvenido</h2>
      <p>{title || ""}</p>
    </div>
  );
};

export default Home;
