import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CHAT_ROUTE, CALENDAR_ROUTE } from "../utils/consts";
import { setInsideTrueAction } from "./../store/navbarSlice";
//--------------------------
import { Centered } from "./Centered";
import { Button } from "@mui/material";
//--------------------------

export const PersonalArea = () => {
  const dispatch = useDispatch();

  const handleGoInside = () => {
    dispatch(setInsideTrueAction());
  };

  return (
    <Centered>
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
    </Centered>
  );
};

const styles = {
  navlink: { textDecoration: "none", width: "100%" },
};
