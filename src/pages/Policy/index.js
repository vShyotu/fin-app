import { useState } from "react";
import { useLocation, Navigate, Link, useNavigate } from "react-router-dom";
import { FundsTable } from "../../components/FundsTable";
import { NomineesTable } from "../../components/NomineesTable";
import { PaymentsTable } from "../../components/PaymentsTable";

export const Policy = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [funds] = useState([
    {
      name: "Fund 1",
      sedol: "FUND1",
      value: 1234.56,
      percentage: 50,
      currency: "GBP",
      factsheet: "http://example-pdf.com/fund1",
    },
    {
      name: "Fund 2",
      sedol: "FUND2",
      value: 2345.67,
      percentage: 50,
      currency: "GBP",
      factsheet: "http://example-pdf.com/fund2",
    },
  ]);

  const [payments] = useState([
    {
      date: "2022-07-01T00:00:00Z",
      amount: 200.0,
      currency: "GBP",
      type: "Contribution",
      status: "Pending",
    },
    {
      date: "2022-06-02T00:00:00Z",
      amount: 300.0,
      currency: "GBP",
      type: "Contribution",
      status: "Complete",
    },
    {
      date: "2022-06-01T00:00:00Z",
      amount: 400.0,
      currency: "GBP",
      type: "Contribution",
      status: "Cancelled",
    },
  ]);

  const [nominees] = useState([
    {
      title: "Mr.",
      forename: "Joe",
      surname: "Bloggs",
      relationship: "Father",
      addressLines: ["1 Oldham Road"],
      city: "Manchester",
      province: "England",
      country: "United Kingdom",
      postcode: "M1 1AA",
      percentage: 90,
    },
    {
      title: "Ms.",
      forename: "Jane",
      surname: "Bloggs",
      relationship: "Sister",
      addressLines: ["2 Oldham Road"],
      city: "Manchester",
      province: "England",
      country: "United Kingdom",
      postcode: "M1 1AA",
      percentage: 10,
    },
  ]);

  const { policyNumber } = location.state ?? {};

  if (!policyNumber) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Link to="/">&lt; Back to my account</Link>
      <h1>Policy Overview - {policyNumber}</h1>
      <h2>Investments</h2>
      <FundsTable funds={funds} />
      <button
        onClick={() => {
          navigate("/policy/investments/available", {
            state: { policyNumber },
          });
        }}
      >
        Change my funds &gt;
      </button>
      <h2>Payments</h2>
      <button
        onClick={() => {
          navigate("/policy/make-payment", { state: { policyNumber } });
        }}
      >
        Make a payment
      </button>
      <PaymentsTable payments={payments} />
      <h2>Nominees</h2>
      <button
        onClick={() => {
          navigate("/policy/add-beneficiary", { state: { policyNumber } });
        }}
      >
        Add a beneficiary
      </button>
      <NomineesTable nominees={nominees} />
    </>
  );
};
