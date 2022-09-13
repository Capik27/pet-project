import { configureStore, combineReducers } from "@reduxjs/toolkit";
//import navReducer from "./navReducer";
//import { composeWithDevTools } from "redux-devtools-extension";
import navbarSlice from "./navbarSlice";

const rootReducer = combineReducers({
  navigation: navbarSlice,
  //
});

export const store = configureStore({ reducer: rootReducer });
