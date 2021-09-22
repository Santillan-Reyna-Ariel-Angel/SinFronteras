import React, { useState } from "react";
import { ContextUser } from "./ContextUsers";

const users = [
  {
    id: 1,
    firtsname: "Ariel Angel",
    lastname: "Santillan Reyna",
  },
];

const UsersProvaider = (props) => {
  const [userData, setUserData] = useState(users);

  return (
    <>
      <ContextUser.Provider value={userData}>
        {props.children}
      </ContextUser.Provider>
    </>
  );
};

export default UsersProvaider;
