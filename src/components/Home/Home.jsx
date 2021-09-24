import React from "react";
import {
  ListarNotasBD_B1,
  ListarNotasBD_B2,
  data,
  ListarNotasBD_B3,
  ListarNotasBD_B4,
  ListarNotasBD_C1,
  ListarNotasBD_C2,
  ListarNotasBD_D1,
} from "./../../contexts/hooks/useListarNotas";
const Home = () => {
  // ListarNotasBD1,
  // ListarNotasBD2,
  // ListarNotasBD3,
  // ListarNotasBD4,

  // const Notas1 = ListarNotasBD1();
  // const Notas2 = ListarNotasBD2();
  // const Notas3 = ListarNotasBD3();
  // const Notas4 = ListarNotasBD4();

  // const Notas_B1 = ListarNotasBD_B1();
  // const Notas_B2 = ListarNotasBD_B2();
  // const Notas_B3 = ListarNotasBD_B3();
  // const Notas_B4 = ListarNotasBD_B4();
  // const Notas_C1 = ListarNotasBD_C1();
  // const Notas_C2 = ListarNotasBD_C2();

  return (
    <div>
      <h2>Bienvenido</h2>

      {/* {Object.keys(Notas1).map((key) => {
        return <p key={key}>{Notas1[key].title}</p>;
      })} */}

      {/* {Object.keys(Notas2).map((key) => {
        return <p key={key}>{Notas2[key].title}</p>;
      })} */}

      {/* {Object.keys(Notas3).map((key) => {
        return <p key={key}>{Notas3[key].title}</p>;
      })} */}

      {/* {Object.keys(Notas4).map((key) => {
        return <p key={key}>{Notas4[key].title}</p>;
      })} */}

      {/* {Object.keys(Notas_B1).map((key) => {
        return <p key={key}>{Notas_B1[key].title}</p>;
      })} */}

      {/* {Notas_B2.map((element) => {
        return <p>{element.title}</p>;
      })} */}

      {/* {Object.keys(Notas_B2).map((key) => {
        return <p key={key}>{Notas_B2[key].title}</p>;
      })} */}

      {/* {
        <ul>
          {Object.keys(data).map((key) => {
            return <p key={key}>{data[key].title}</p>;
          })}
        </ul>
      } */}

      {/* {data.map((element) => {
        return <p>{element.title}</p>;
      })} */}

      {/* {Notas_B3.map((element) => {
        return <p>{element.title}</p>;
      })} */}

      {/* {Notas_B4.map((element) => {
        return <p>{element}</p>;
      })} */}

      {/* {Object.keys(Notas_C1).map((key) => {
        return <p key={key}>{Notas_C1[key].title}</p>;
      })} */}

      {/* {Object.keys(Notas_C2).map((key) => {
        return <p key={key}>{Notas_C2[key].title}</p>;
      })} */}

      {/* {Notas_C2.map((element) => {
        return <p>{element}</p>;
      })} */}

      {/* <ul>
        {Object.keys(listAllNotes).map((key) => {
          return <li key={key}>{listAllNotes[key].title}</li>;
        })}
      </ul> */}
    </div>
  );
};

export default Home;
