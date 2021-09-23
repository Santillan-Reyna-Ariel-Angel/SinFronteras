import { createContext } from "react";

//Hook
export const users = [
  {
    id: 1,
    firtsname: "Ariel Angel",
    lastname: "Santillan Reyna",
    correo: "santillan@r3r3qrq.com",
    celular: 78963214,
    edad: 50,
    direccion: "Nataniel aguirre 50",
  },
  {
    id: 1,
    firtsname: "Ariel Angel",
    lastname: "Santillan Reyna",
    correo: "santillan@r3r3qrq.com",
    celular: 78963214,
    edad: 50,
    direccion: "Nataniel aguirre 50",
  },
  {
    id: 1,
    firtsname: "Ariel Angel",
    lastname: "Santillan Reyna",
    correo: "santillan@r3r3qrq.com",
    celular: 78963214,
    edad: 50,
    direccion: "Nataniel aguirre 50",
  },
  {
    id: 1,
    firtsname: "Ariel Angel",
    lastname: "Santillan Reyna",
    correo: "santillan@r3r3qrq.com",
    celular: 78963214,
    edad: 50,
    direccion: "Nataniel aguirre 50",
  },
];

//Contexto
export const ContextoUsuario = createContext(users);
