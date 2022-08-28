import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
//-----------------------------
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
//-----------------------------
import { Context } from "../index.js";
import { REGISTER_ROUTE, LOGIN_ROUTE } from "../utils/consts";

export const NavBar = () => {
  const [registerPage, setRegisterPage] = useState(false);
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  const name = user ? (user.displayName ? user.displayName : "Guest") : "Guest";

  const handleClickRegister = () => {
    setRegisterPage(true);
  };
  const handleClickLogin = () => {
    setRegisterPage(false);
  };

  const handleClickLogout = () => {
    if (registerPage) setRegisterPage((prevstate) => !prevstate);
    signOut(auth);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={"warning"}>
        <Toolbar variant={"dense"}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {name}
          </Typography>
          {user ? (
            <Button
              onClick={handleClickLogout}
              variant="contained"
              color="secondary"
            >
              Logout
            </Button>
          ) : registerPage ? (
            <NavLink to={LOGIN_ROUTE} style={{ textDecoration: "none" }}>
              <Button
                onClick={handleClickLogin}
                variant="contained"
                color="secondary"
              >
                Log in
              </Button>
            </NavLink>
          ) : (
            <NavLink to={REGISTER_ROUTE} style={{ textDecoration: "none" }}>
              <Button
                onClick={handleClickRegister}
                variant="contained"
                color="secondary"
              >
                Register
              </Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
