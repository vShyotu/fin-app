import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";

export const Layout = () => (
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
