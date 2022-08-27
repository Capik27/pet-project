import { LOGIN_ROUTE, REGISTER_ROUTE, CHAT_ROUTE } from "../utils/consts";
import { Login } from "./Login";
import { Register } from "./Register";
import { Chat } from "./Chat";

export const publicRoutes = [
  {
    path: REGISTER_ROUTE,
    Component: <Register />,
  },
  {
    path: LOGIN_ROUTE,
    Component: <Login />,
  },
];

export const privateRoutes = [
  {
    path: CHAT_ROUTE,
    Component: <Chat />,
  },
];
