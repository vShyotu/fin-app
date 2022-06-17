import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

const LogoLink = () => (
  <div>
    <Link to="/">Logo</Link>
  </div>
);

export const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav>
      <LogoLink />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/plan">Plan</Link>
        </li>
        <li>
          <Link to="/learn">Learn</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <button onClick={() => logout()}>Log out</button>
        </li>
      </ul>
    </nav>
  );
};
