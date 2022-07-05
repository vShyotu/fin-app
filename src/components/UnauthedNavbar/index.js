import { Link } from "react-router-dom";
import { LogoLink } from "../LogoLink";

export const UnauthedNavbar = () => {
  return (
    <nav>
      <LogoLink />
      <ul>
        <li>
          <Link to="/security-policy">Secure</Link>
        </li>
      </ul>
    </nav>
  );
};
