import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CHAT_ROUTE, CALENDAR_ROUTE } from "../utils/consts";
import { setInsideTrueAction } from "./../store/navbarSlice";
//--------------------------
import { Container, Grid, Button } from "@mui/material";
//--------------------------

export const PersonalArea = () => {
  const dispatch = useDispatch();

  const handleGoInside = () => {
    dispatch(setInsideTrueAction());
  };

  return (
    <Container>
      <Grid container style={styles.wrapper} className="msgAnimation">
        <Grid container style={styles.list}>
          <NavLink to={CHAT_ROUTE} replace={true} style={styles.navlink}>
            <Button
              onClick={handleGoInside}
              fullWidth
              variant="outlined"
              color="warning"
            >
              Chat room
            </Button>
          </NavLink>
          <NavLink to={CALENDAR_ROUTE} replace={true} style={styles.navlink}>
            <Button
              onClick={handleGoInside}
              fullWidth
              variant="outlined"
              color="warning"
            >
              Calendar
            </Button>
          </NavLink>
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
  list: {
    gap: 8,
    width: 210,
    ...flexcolumnstyles,
  },
  navlink: { textDecoration: "none", width: "100%" },
  submit: { width: "60%" },
  error: { color: "red" },
};
