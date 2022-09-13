import { createReducer, createAction } from "@reduxjs/toolkit";

export const initialState = {
  isregpage: false,
};

export const setRegPageTrueAction = createAction("TO_REGPAGE_TRUE");
export const setRegPageFalseAction = createAction("TO_REGPAGE_FALSE");
export const setRegPageToggleAction = createAction("TO_REGPAGE_TOGGLE");

export default createReducer(initialState, {
  [setRegPageTrueAction]: function (state) {
    //console.log("TO_REGPAGE_TRUE", !state.isregpage);
    state.isregpage = true;
  },
  [setRegPageFalseAction]: function (state) {
    //console.log("TO_REGPAGE_FALSE", !state.isregpage);
    state.isregpage = false;
  },
  [setRegPageToggleAction]: function (state) {
    state.isregpage = !state.isregpage;
  },
});
