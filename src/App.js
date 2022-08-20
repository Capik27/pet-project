import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/NavBar";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );
}
