import React, { useContext } from "react";
import { useListarConOn } from "../../contexts/hooks/useListarNotas";
import { ContextListarNotas } from "./../../contexts/ContextListarNotas";

const Home = () => {
  const { notes } = useListarConOn();
  const { id, title, body_note } = notes ? notes : { title: "" };
  const { notes: Notes } = useContext(ContextListarNotas);
  const {
    id: idN,
    title: titleN,
    body_note: body_noteN,
  } = Notes ? Notes : { titleN: "" };

  return (
    <div>
      <h2>Bienvenido</h2>
      <p>{title || ""}</p>
      <p>{id || ""}</p>
      <p>{body_note || ""}</p>
      {console.log("Hola", idN || "as")}
    </div>
  );
};

export default Home;
