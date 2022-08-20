import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { AppRouter } from "./components/AppRouter";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}
