import EventFirebase from "../firebase-config";
const { app } = EventFirebase;

export const readAllNotesBD = () => {
  try {
    const note = app.database().ref();
    note
      .child("notes")
      .get()
      .then((element) => {
        if (element.exists()) {
          //   console.log(element.val());
          element.val();
        } else {
          console.log("Datos no dispinobles!!");
        }
      });
    return note;
  } catch (error) {
    console.log("Lectura erronea!!!", error);
  }
};

export const readAllNotesBD2 = () => {
  try {
    const note = app
      .database()
      .ref("notes/")
      .on("child_added", (snapshot, prevChildKey) => {
        snapshot.val();
      });
    return note;
  } catch (error) {
    console.log("Lectura erronea!!!", error);
  }
};
