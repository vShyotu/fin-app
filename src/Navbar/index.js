import { Link } from "react-router-dom";

const LogoLink = () => (
  <div>
    <Link to="/">Logo</Link>
  </div>
);

export const Navbar = () => {
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
          <Link to="/login">Log out</Link>
        </li>
      </ul>
    </nav>
  );
};
