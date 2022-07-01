import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { AccountOverviewCard } from "../../components/AccountOverviewCard";
import { PolicyCard } from "../../components/PolicyCard";

export const AccountOverview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [policies] = useState([
    {
      schemeName: "Group Pensions Scheme A",
      policyNumber: "P1234567",
      policyValue: 12345.67,
    },
    {
      schemeName: "Group Pensions Scheme B",
      policyNumber: "P2345678",
      policyValue: 23456.78,
    },
    {
      schemeName: "Group Pensions Scheme C",
      policyNumber: "P3456789",
      policyValue: 34567.89,
    },
  ]);

  const totalValue = useMemo(
    () => policies.reduce((pre, curr) => pre + curr.policyValue, 0),
    [policies]
  );

  return (
    <>
      <h1>Account overview</h1>
      <AccountOverviewCard
        name={user.name}
        totalValue={totalValue}
        onEstimateClick={() => {
          navigate("/plan");
        }}
      />
      {policies.map((policy) => (
        <PolicyCard
          {...policy}
          key={policy.policyNumber}
          onClick={() => {
            navigate("/policy", {
              state: { policyNumber: policy.policyNumber },
            });
          }}
        />
      ))}
      <p>Hi {user.name}</p>
    </>
  );
};
