import React, { useRef, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

//--------------------------
import { Container, Grid, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
//import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
//--------------------------

export const Register = () => {
  const [validError, setValidError] = useState("");
  const nameInputWindow = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    nameInputWindow.current.select();
  }, []);

  const errorInsert = (errMsg) => {
    setValidError(errMsg);
    const timer = setTimeout(() => {
      setValidError("");
      clearTimeout(timer);
    }, 3000);
  };

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
        errorInsert(errorCode);
      });
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();
    if (validError) return;

    //check name + email
    const nameValid = name.length > 0 ? true : false;
    if (!nameValid) {
      errorInsert("invalid Name");
      return;
    }

    const emailValid =
      email.length >= 10 && email.includes("@") && email.includes(".")
        ? true
        : false;
    if (!emailValid) {
      errorInsert("invalid Email");
      return;
    }

    //check passwords
    const passValid =
      pass && pass.length <= 20 && pass.length >= 6 ? true : false;
    if (!passValid) {
      errorInsert("invalid Password");
      return;
    }

    const confirmValid = confirm === pass ? true : false;
    if (!confirmValid) {
      errorInsert("invalid Confirm");
      return;
    }

    registerAuth();
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
      <Grid container style={styles.wrapper}>
        <Box component="form" noValidate autoComplete="off" style={styles.form}>
          <Grid container style={styles.formwrapper}>
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
              style={styles.submit}
            >
              Register
            </Button>
            {validError && (
              <Typography variant="h6" component="span" style={styles.error}>
                {validError}
              </Typography>
            )}
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
};

const flexcolumnstyles = {
  flexDirection: "column",
  alignItems: "center",
  justifySelf: "center",
};

const styles = {
  wrapper: {
    paddingTop: 32,
    ...flexcolumnstyles,
  },
  form: {
    padding: 8,
    width: 210,
  },
  formwrapper: {
    gap: 8,
    ...flexcolumnstyles,
  },
  submit: { width: "60%" },
  error: { color: "red" },
};
