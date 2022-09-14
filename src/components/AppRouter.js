import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import { LOGIN_ROUTE, PERSONALAREA_ROUTE } from "../utils/consts";
import { Context } from "../index.js";
import { useAuthState } from "react-firebase-hooks/auth";

export const AppRouter = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  //console.log(user);

  return user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
      <Route path={"*"} element={<Navigate to={PERSONALAREA_ROUTE} />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
      <Route path={"*"} element={<Navigate to={LOGIN_ROUTE} />} />
    </Routes>
  );
};
