import { useState, useEffect } from "react";
import EventFirebase from "../../firebase-config";
const { firebase } = EventFirebase;

let userDat, setUserDat;
const userDataAux = () => {
  let userEmail = sessionStorage.getItem("userEmail");
  console.log("sessionStorage_useUserData:", userEmail);

  if (userEmail !== null) {
    firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(userEmail)
      .on("value", (userData) => {
        // console.log("userData_useUserData", userData.val());
        let userKey = Object.keys(userData.val())[0];
        // console.log("userKey_useUserData", userKey);
        // let user = userData.child(userKey).val();
        // console.log("user_useUserData", user);
        setUserDat(userData.child(userKey).val());
        // setUserDat(user);
      });
  }
};

export const useUserData = () => {
  [userDat, setUserDat] = useState();
  useEffect(() => {
    userDataAux();
  }, []);

  return {
    userDat,
  };
};
