import React from "react";
import { Container, Grid, Box, CircularProgress } from "@mui/material";

export const AppLoader = () => {
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight }}
        alignItems={"center"}
        justifySelf={"center"}
      >
        <Grid container direction={"column"} alignItems={"center"}>
          <Box sx={{ display: "flex" }}>
            <CircularProgress style={{ width: 50, height: 50 }} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export const ChatLoader = ({ ...props }) => {
  return (
    <Box
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    >
      <CircularProgress style={{ height: 50, width: 50 }} />
    </Box>
  );
};

//width: 50
