import React from "react";
import PrimarySearchAppBar from "./../AppBar/AppBar";
import CustomizedList from "./../Sidebar/Sidebar";
const Layout = (props) => {
  return (
    <>
      {PrimarySearchAppBar()}
      {CustomizedList()}
      {props.children}
    </>
  );
};

export default Layout;
