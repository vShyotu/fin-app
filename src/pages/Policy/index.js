import { useLocation, Navigate } from "react-router-dom";

export const Policy = () => {
  const location = useLocation();

  const { policyNumber } = location.state ?? {};

  if (!policyNumber) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>Policy Overview</h1>
      <h2>{policyNumber}</h2>
    </>
  );
};
