import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
//-----------------------------
import { useSelector, useDispatch } from "react-redux";
import {
  setRegPageTrueAction,
  setRegPageFalseAction,
  setRegPageToggleAction,
} from "./../store/navbarSlice";
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
  const dispatch = useDispatch();
  const registerPage = useSelector((state) => state.navigation.isregpage);
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  const name = user ? (user.displayName ? user.displayName : "Guest") : "Guest";

  const handleClickRegister = () => {
    dispatch(setRegPageTrueAction());
  };
  const handleClickLogin = () => {
    dispatch(setRegPageFalseAction());
  };

  const handleClickLogout = () => {
    if (registerPage) {
      dispatch(setRegPageToggleAction());
    }

    signOut(auth);
  };

  return (
    <Box style={styles.navbarbox}>
      <AppBar position="static" color={"warning"} style={styles.appbar}>
        <Toolbar variant={"dense"}>
          <Typography variant="h6" component="div" style={styles.name}>
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
            <NavLink to={LOGIN_ROUTE} style={styles.nodecoration}>
              <Button
                onClick={handleClickLogin}
                variant="contained"
                color="secondary"
              >
                Log in
              </Button>
            </NavLink>
          ) : (
            <NavLink to={REGISTER_ROUTE} style={styles.nodecoration}>
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

const styles = {
  navbarbox: { flexGrow: 1, maxWidth: 750, margin: "0 auto" },
  appbar: { borderBottomLeftRadius: 4, borderBottomRightRadius: 4 },
  name: { flexGrow: 1 },
  nodecoration: { textDecoration: "none" },
};
