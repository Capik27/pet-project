import React, { useContext, useState, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
//--------------------------
import { Container, Grid, Box, Typography } from "@mui/material";
//import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
//--------------------------
import { Context } from "../index.js";

export const Login = () => {
  const { auth } = useContext(Context);
  const [email, setEmail] = useState(
    localStorage.getItem("cpp/email") ? localStorage.getItem("cpp/email") : ""
  );
  const [pass, setPass] = useState(
    localStorage.getItem("cpp/pass") ? localStorage.getItem("cpp/pass") : ""
  );
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [gBtnLoad, setGBtnLoad] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    if (email) {
      localStorage.removeItem("cpp/email");
      localStorage.removeItem("cpp/pass");
      loginDefault();
    }
  }, []);

  const loginGoogle = async () => {
    setGBtnLoad(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        // The signed-in user info.
        //const user = result.user;
      })
      .catch((error) => {
        setGBtnLoad(false);
      });
  };

  const loginDefault = async () => {
    setBtnLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        setBtnLoading(false);
        //const user = userCredential.user;
      })
      .catch((error) => {
        setBtnLoading(false);
        const errorCode = error.code;
        //const errorMessage = error.message;
        //
        setIsError(true);
        setErrMessage(errorCode.slice(5));
        const timer = setTimeout(() => {
          setIsError(false);
          setErrMessage("");
          clearTimeout(timer);
        }, 3000);
        //console.log(errorCode);
      });
  };

  const getInputError = (type, ...args) => {
    const errors = [type, ...args];
    for (let i = 0; i < errors.length; i++) {
      if (errMessage === errors[i]) return true;
    }
    return false;
  };

  return (
    <Container>
      <Grid container style={styles.wrapper}>
        <Grid container style={styles.mainbox}>
          <LoadingButton
            onClick={loginGoogle}
            style={styles.googlebutton}
            variant="outlined"
            color="warning"
            size="large"
            loadingPosition="center"
            loading={gBtnLoad}
          >
            Log in: GOOGLE
          </LoadingButton>

          <hr style={styles.hr} />
          <Box component="form" noValidate autoComplete="off">
            <Grid container style={styles.formbox}>
              <TextField
                fullWidth
                label="Email"
                error={
                  isError && getInputError("invalid-email", "user-not-found")
                }
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
                label="Password"
                error={isError && getInputError("wrong-password")}
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
              <LoadingButton
                onClick={loginDefault}
                variant="contained"
                color="warning"
                style={styles.logindefault}
                loadingPosition="center"
                loading={btnLoading}
                disabled={!email || !pass}
              >
                Log in
              </LoadingButton>
              {isError && (
                <Typography variant="h6" component="span" style={styles.error}>
                  {errMessage === "too-many-requests"
                    ? "Try later"
                    : errMessage}
                </Typography>
              )}
            </Grid>
          </Box>
        </Grid>
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
  mainbox: {
    gap: 8,
    padding: 8,
    width: 210,
    ...flexcolumnstyles,
  },
  formbox: {
    gap: 8,
    ...flexcolumnstyles,
  },
  googlebutton: { width: "100%" },
  logindefault: { width: "60%" },
  hr: { width: "50%" },
  error: { color: "red" },
};
