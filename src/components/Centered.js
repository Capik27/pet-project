import { Grid, Container } from "@mui/material";

export const Centered = ({ children }) => {
  return (
    <Container>
      <Grid container style={styles.wrapper} className="msgAnimation">
        <Grid container style={styles.list}>
          {children}
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
};
