import EventFirebase from "../firebase-config";
//import Note from "../views/Notes/Note";
const { app } = EventFirebase;

export const Auth = async (email, password) => {
  try {
    const userCredential = await app
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log("userCredential:", userCredential);
    const accessToken = await userCredential.user.getIdToken();
    console.log("accessToken:", accessToken);
    // return userCredential;
    return accessToken;
  } catch (error) {
    console.error("Error", error.message);
    return null;
  }
};

export const saveNote = (noteId, title, bodyNote) => {
  app
    .database()
    .ref("notes/" + noteId)
    .set(
      {
        id: noteId,
        title: title,
        bodyNote: bodyNote,
      },
      (error) => {
        if (error) {
          console.log("Error. Datos no guardados!!!", error);
        } else {
          console.log("Datos guardados exitosamente");
        }
      }
    );
};

// export const readAllNotes = () => {
//   try {
//     const note = app.database().ref("notes/");
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

export const readAllNotes2 = (noteId) => {
  try {
    const note = app.database().ref();
    note
      .child("notes")
      .child(noteId)
      .get()
      .then((element) => {
        if (element.exists()) {
          console.log(element.val());
          // <Note element={element.val()} />;
        } else {
          console.log("Datos no dispinobles!!");
        }
      });
  } catch (error) {
    console.log("Lectura erronea!!!", error);
  }
};

export const readSpecificNote = (noteId) => {
  try {
    const note = app.database().ref("notes/" + noteId);
    note.on("value", (element) => {
      const data = element.val();
      console.log("La nota es:", data);
    });
  } catch (error) {
    console.log("Lectura erronea!!!", error);
  }

  const note = app.database().ref();
  note
    .child("notes")
    .child(noteId)
    .get()
    .then((element) => {
      if (element.exists()) {
        console.log(element.val());
        // <Note element={element.val()} />;
      } else {
        console.log("Datos no dispinobles!!");
      }
    });
};

export const updateNote = (noteId, title, bodyNote) => {
  const noteData = {
    noteId: noteId,
    title: title,
    bodyNote: bodyNote,
  };
  // const newNote = app.database().ref().child("notes").push().key;
  const updates = {};
  updates["notes/" + noteId] = noteData;
  app
    .database()
    .ref()
    .update(updates, (error) => {
      if (error) {
        console.log("Datos no actulizados!!!. ", error);
      } else {
        console.log("Datos actualizados exitosamente");
      }
    });
};

export const deleteNote = (noteId) => {
  app
    .database()
    .ref("notes/" + noteId)
    .remove();
  console.log("Datos eliminados");
};
