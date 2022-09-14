import "./App.css";
import React, { useContext } from "react";
import { Context } from "./index.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavBar } from "./components/NavBar";
import { AppLoader } from "./components/Loader";
import { AppRouter } from "./components/AppRouter";

export default function App() {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <AppLoader />;

  return (
    <>
      <NavBar />
      <AppRouter />
    </>
  );
}
