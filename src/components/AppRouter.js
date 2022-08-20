import React from "react";
import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
//import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";

export const AppRouter = () => {
  const user = true;
  // <Navigate to={CHAT_ROUTE} />
  return user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
    </Routes>
  );
};
