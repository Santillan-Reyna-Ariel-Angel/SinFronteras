import app from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcz8n1QlSY3pPEUFE6xfg3Uj57s1IUou0",
  authDomain: "pruebasf-cbdd1.firebaseapp.com",
  projectId: "pruebasf-cbdd1",
  storageBucket: "pruebasf-cbdd1.appspot.com",
  messagingSenderId: "714613680681",
  appId: "1:714613680681:web:b4f148232bcd7ac7944a38",
};

const fire = app.initializeApp(firebaseConfig);
// const auth = fire.auth();
const modulesFirebase = {
  fire,
  app,
};
export default modulesFirebase;
