import { useLocation, Navigate, Link } from "react-router-dom";

export const Policy = () => {
  const location = useLocation();

  const { policyNumber } = location.state ?? {};

  if (!policyNumber) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Link to="/">&lt; Back to my account</Link>
      <h1>Policy Overview</h1>
      <h2>{policyNumber}</h2>
    </>
  );
};
