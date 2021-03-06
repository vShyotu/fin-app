import { Outlet } from "react-router-dom";
import { UnauthedNavbar } from "../UnauthedNavbar";

export const UnauthedLayout = () => (
  <>
    <header>
      <UnauthedNavbar />
    </header>
    <main>
      <Outlet />
    </main>
    <footer>&copy; 2022</footer>
  </>
);
