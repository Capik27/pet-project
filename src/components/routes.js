import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  CHAT_ROUTE,
  PERSONALAREA_ROUTE,
  CALENDAR_ROUTE,
} from "../utils/consts";
import { Login } from "./Login";
import { Register } from "./Register";
import { Chat } from "./Chat";
import { PersonalArea } from "./PersonalArea";

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
    path: PERSONALAREA_ROUTE + "*",
    Component: <PersonalArea />,
  },
  {
    path: PERSONALAREA_ROUTE + CHAT_ROUTE,
    Component: <Chat />,
  },
  {
    path: PERSONALAREA_ROUTE + CALENDAR_ROUTE,
    Component: <div>CALENDAR</div>,
  },
];
