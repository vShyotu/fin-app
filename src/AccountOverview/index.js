import { Link } from "react-router-dom";

export const AccountOverview = () => {
  return (
    <>
      <h1>Account overview</h1>
      <Link to="/login">Log out</Link>
    </>
  );
};
