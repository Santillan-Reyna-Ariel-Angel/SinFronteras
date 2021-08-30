import { Bd } from "./../../firebase-config";

const users = {
  nombres: "Ariel Angel",
  apellidos: "Santillan Reyna",
  telefono: 67616016,
  estado: true,
};

Bd.collection("users").add(users);
