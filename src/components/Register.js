import React, { useContext, useRef, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

//--------------------------
import { Container, Grid, Box } from "@mui/material";
import Button from "@mui/material/Button";
//import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
//--------------------------
import { Login } from "./Login";
import { Context } from "../index.js";

export const Register = () => {
  //const { auth } = useContext(Context);
  const nameInputWindow = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    nameInputWindow.current.select();
  }, []);

  const registerAuth = async () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then((newUser) => {
        localStorage.setItem("cpp/email", email);
        localStorage.setItem("cpp/pass", pass);

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            //console.log("updated name:", name);
            signOut(auth);
          })
          .catch((error) => {
            // An error occurred
          });
        //
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();

    //check name + email
    const nameValid = name.length > 0 ? true : false;
    const emailValid =
      email.length > 10 && email.includes("@") && email.includes(".")
        ? true
        : false;

    //check passwords
    const passValid =
      pass && pass.length <= 20 && pass.length >= 6 ? true : false;
    const confirmValid = confirm === pass ? true : false;

    //final validation
    const validRegister = nameValid && emailValid && passValid && confirmValid;

    // console.log(nameValid, emailValid, passValid, confirmValid);
    if (validRegister) registerAuth();
  };

  const errorEmailState = (value) => {
    const invalidMainCondition = value.length > 0;
    const invalidLength = invalidMainCondition && value.length < 10;
    const invalidChars =
      invalidMainCondition &&
      (value.includes("@") === false || value.includes(".") === false);

    const invalidResult = invalidLength || invalidChars;

    return invalidResult;
  };

  return (
    <Container>
      <Grid
        container
        pt={4}
        direction={"column"}
        alignItems={"center"}
        justifySelf={"center"}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          gap={1}
          p={1}
          style={{ width: 210 }}
        >
          <Grid
            container
            gap={1}
            direction={"column"}
            alignItems={"center"}
            justifySelf={"center"}
          >
            <TextField
              fullWidth
              error={!name}
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              inputRef={nameInputWindow}
              color="warning"
              id="outlined-basic-name"
              variant="outlined"
              size="small"
            />
            <TextField
              fullWidth
              error={errorEmailState(email)}
              label="Email"
              helperText={errorEmailState(email) ? "example@gmail.com" : ""}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              color="warning"
              id="outlined-basic"
              variant="outlined"
              size="small"
            />
            <TextField
              fullWidth
              error={pass.length > 20 || (pass.length > 0 && pass.length < 6)}
              label="Password"
              helperText={
                pass.length > 20 || (pass.length > 0 && pass.length < 6)
                  ? "6 to 20 characters"
                  : ""
              }
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
              color="warning"
              id="outlined-password-input"
              type="password"
              autoComplete="current-password"
              size="small"
            />
            <TextField
              fullWidth
              error={
                confirm.length > 20 ||
                (confirm.length > 0 && confirm.length < 6)
              }
              label="Confirm password"
              helperText={
                confirm.length > 20 ||
                (confirm.length > 0 && confirm.length < 6)
                  ? "6 to 20 characters"
                  : ""
              }
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
              }}
              color="warning"
              id="outlined-password-input-confirm"
              type="password"
              autoComplete="current-password"
              size="small"
            />
            <Button
              onClick={handleClickSubmit}
              variant="contained"
              color="warning"
              style={{ width: "60%" }}
            >
              Register
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
};
