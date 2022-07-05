import { Outlet } from "react-router-dom";
import { AuthedNavbar } from "../AuthedNavbar";

export const AuthedLayout = () => (
  <>
    <header>
      <AuthedNavbar />
    </header>
    <main>
      <Outlet />
    </main>
    <footer>&copy; 2022</footer>
  </>
);
