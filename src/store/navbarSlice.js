import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isregpage: false,
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
  },
});

export default navbarSlice.reducer;
export const {
  setRegPageTrueAction,
  setRegPageFalseAction,
  setRegPageToggleAction,
} = navbarSlice.actions;
