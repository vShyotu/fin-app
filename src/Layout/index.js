import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";

export const Layout = ({ children }) => (
  <>
    <header>
      <Navbar />
    </header>
    <main>
      <Outlet />
    </main>
    <footer>&copy; 2022</footer>
  </>
);
