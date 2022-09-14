import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isregpage: false,
  isinside: false,
};

const navbarSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setRegPageTrueAction(state) {
      state.isregpage = true;
    },
    setRegPageFalseAction(state) {
      state.isregpage = false;
    },
    setRegPageToggleAction(state) {
      state.isregpage = !state.isregpage;
    },
    //////
    setInsideTrueAction(state) {
      state.isinside = true;
    },
    setInsideFalseAction(state) {
      state.isinside = false;
    },
  },
});

export default navbarSlice.reducer;
export const {
  setRegPageTrueAction,
  setRegPageFalseAction,
  setRegPageToggleAction,
  setInsideTrueAction,
  setInsideFalseAction,
} = navbarSlice.actions;
