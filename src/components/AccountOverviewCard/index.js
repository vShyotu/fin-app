export const AccountOverviewCard = ({ name, totalValue, onEstimateClick }) => {
  return (
    <div>
      <p>Hi, {name}</p>
      <p>Pension total: £{totalValue}</p>
      <button onClick={onEstimateClick}>Estimate my pension</button>
    </div>
  );
};
