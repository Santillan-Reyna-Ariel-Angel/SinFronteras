import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCcz8n1QlSY3pPEUFE6xfg3Uj57s1IUou0',
  authDomain: 'pruebasf-cbdd1.firebaseapp.com',
  databaseURL: 'https://pruebasf-cbdd1-default-rtdb.firebaseio.com',
  projectId: 'pruebasf-cbdd1',
  storageBucket: 'pruebasf-cbdd1.appspot.com',
  messagingSenderId: '714613680681',
  appId: '1:714613680681:web:b4f148232bcd7ac7944a38',
};

const app = initializeApp(firebaseConfig);

const fire_db = getDatabase(app);
const fire_auth = getAuth(app);

export const modulesFirebase = {
  fire_db,
  fire_auth,
};
