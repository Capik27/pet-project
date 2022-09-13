import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//===============================================
import { auth, firestore } from "./firebase/init_firebase";
//===============================================
import { store } from "./store/init_store";
import { Provider } from "react-redux";
//===============================================

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider value={{ auth, firestore }}>
      <Provider store={store}>
        <App />
      </Provider>
    </Context.Provider>
  </React.StrictMode>
);
