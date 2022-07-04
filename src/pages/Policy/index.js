import { useState } from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import { FundsTable } from "../../components/FundsTable";

export const Policy = () => {
  const location = useLocation();
  const [funds] = useState([
    {
      name: "Fund 1",
      sedol: "FUND1",
      value: 1234.56,
      percentage: 50,
      currency: "GBP",
      type: "GPP",
      factsheet: "http://example-pdf.com/fund1",
    },
    {
      name: "Fund 2",
      sedol: "FUND2",
      value: 2345.67,
      percentage: 50,
      currency: "GBP",
      type: "GSPP",
      factsheet: "http://example-pdf.com/fund2",
    },
  ]);

  const { policyNumber } = location.state ?? {};

  if (!policyNumber) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Link to="/">&lt; Back to my account</Link>
      <h1>Policy Overview</h1>
      <h2>{policyNumber}</h2>
      <h2>Investments</h2>
      <FundsTable funds={funds} />
      <button>Change my funds &gt;</button>
    </>
  );
};
