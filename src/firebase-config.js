import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
// Antes: authDomain: "pruebasf-cbdd1.firebaseapp.com",
const firebaseConfig = {
  apiKey: "AIzaSyCcz8n1QlSY3pPEUFE6xfg3Uj57s1IUou0",
  authDomain: "pruebasf-cbdd1.firebaseapp.com",
  databaseURL: "https://pruebasf-cbdd1-default-rtdb.firebaseio.com",
  projectId: "pruebasf-cbdd1",
  storageBucket: "pruebasf-cbdd1.appspot.com",
  messagingSenderId: "714613680681",
  appId: "1:714613680681:web:b4f148232bcd7ac7944a38",
};
const fire = firebase.initializeApp(firebaseConfig);
// const auth = fire.auth();
// var database = firebase.database();
const modulesFirebase = {
  fire,
  firebase,
};
export default modulesFirebase;
