export const PolicyCard = ({
  policyNumber,
  policyValue,
  schemeName,
  onClick,
}) => {
  return (
    <div>
      <h2>{schemeName}</h2>
      <ul>
        <li>Policy Number: {policyNumber}</li>
        <li>Value: £{policyValue}</li>
      </ul>
      <button onClick={onClick}>View this policy &gt;</button>
    </div>
  );
};
