import { modulesFirebase } from './../firebase-config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
const { fire_auth } = modulesFirebase;

export const Auth = (email, password) => {
  signInWithEmailAndPassword(fire_auth, email, password)
    .then(async (userCredential) => {
      let accessToken = await userCredential.user.getIdToken();
      // console.log('accessToken:', accessToken);
      return accessToken;
    })
    .catch((error) => {
      console.error('Error', error.message);
      return null;
    });
};

/*Codigo antiguo:*/
/*export const saveNote = (noteId, title, bodyNote) => {
  firebase
    .database()
    .ref('notes/' + noteId)
    .set(
      {
        id: noteId,
        title: title,
        bodyNote: bodyNote,
      },
      (error) => {
        if (error) {
          console.log('Error. Datos no guardados!!!', error);
        } else {
          console.log('Datos guardados exitosamente');
        }
      }
    );
};*/

//readAllNotes estaba comentado:
// export const readAllNotes = () => {
//   try {
//     const note = firebase.database().ref("notes/");
//     console.log("Las notas son: ");
//     note.on("value", (element) => {
//       console.log(element.val());
//       // window.AllNotes = element.val();
//       callback(element.val());
//     });
//   } catch (error) {
//     console.log("Lectura erronea!!!", error);
//   }
// };

/*
export const readAllNotes2 = (noteId) => {
  try {
    const note = firebase.database().ref();
    note
      .child('notes')
      .child(noteId)
      .get()
      .then((element) => {
        if (element.exists()) {
          console.log(element.val());
          // <NoteJsx element={element.val()} />;
        } else {
          console.log('Datos no dispinobles!!');
        }
      });
  } catch (error) {
    console.log('Lectura erronea!!!', error);
  }
};

export const readSpecificNote = (noteId) => {
  try {
    const note = firebase.database().ref('notes/' + noteId);
    note.on('value', (element) => {
      const data = element.val();
      console.log('La nota es:', data);
    });
  } catch (error) {
    console.log('Lectura erronea!!!', error);
  }

  const note = firebase.database().ref();
  note
    .child('notes')
    .child(noteId)
    .get()
    .then((element) => {
      if (element.exists()) {
        console.log(element.val());
        // <NoteJsx element={element.val()} />;
      } else {
        console.log('Datos no dispinobles!!');
      }
    });
};

export const updateNote = (noteId, title, bodyNote) => {
  const noteData = {
    noteId: noteId,
    title: title,
    bodyNote: bodyNote,
  };
  // const newNote = firebase.database().ref().child("notes").push().key;
  const updates = {};
  updates['notes/' + noteId] = noteData;
  firebase
    .database()
    .ref()
    .update(updates, (error) => {
      if (error) {
        console.log('Datos no actulizados!!!. ', error);
      } else {
        console.log('Datos actualizados exitosamente');
      }
    });
};

export const deleteNote = (noteId) => {
  firebase
    .database()
    .ref('notes/' + noteId)
    .remove();
  console.log('Datos eliminados');
};
*/
