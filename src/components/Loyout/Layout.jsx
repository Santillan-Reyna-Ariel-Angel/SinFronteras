import React from "react";
import PrimarySearchAppBar from "./../AppBar/AppBar.jsx";
import CustomizedList from "./../Sidebar/Sidebar";
import Box from "@mui/material/Box";
const Layout = (props) => {
  return (
    <>
      {PrimarySearchAppBar()}

      <Box
        sx={{
          display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          bgcolor: "background.paper",
        }}
      >
        {CustomizedList()}
        {props.children}
      </Box>
    </>
  );
};

export default Layout;
