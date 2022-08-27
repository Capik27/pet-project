import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//===============================================
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};
const app = initializeApp(firebaseConfig);
//===============================================
export const Context = createContext(null);

const auth = getAuth();
const firestore = getFirestore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider value={{ app, auth, firestore }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);
