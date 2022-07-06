const HeadingRow = () => (
  <tr>
    <th>Fund</th>
    <th>Percentage to invest</th>
    <th>Remove</th>
  </tr>
);

const FundRow = ({ name, sedol, percentage, onChange, onRemove }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        <label htmlFor={`${sedol}-percentage`}>Percentage to invest</label>
        <input
          type="number"
          step="0.01"
          id={`${sedol}-percentage`}
          value={percentage}
          onChange={(event) => onChange(sedol, parseFloat(event.target.value))}
        />
        %
      </td>
      <td>
        <button
          onClick={(event) => {
            event.preventDefault();
            onRemove(sedol);
          }}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

const TotalRows = ({ totalPercentage }) => {
  const allocationDifference = totalPercentage - 100;

  return (
    <>
      <tr>
        <td>
          <span>Total Invested:</span>
        </td>
        <td>{totalPercentage}%</td>
      </tr>
      {!!allocationDifference && (
        <tr>
          <td>{allocationDifference > 0 ? "Over" : "Under"} allocated by:</td>
          <td>{Math.abs(allocationDifference)}%</td>
        </tr>
      )}
    </>
  );
};

export const ChangeInvestmentsTable = ({
  portfolio,
  totalPercentage,
  onChange,
  onRemove,
}) => {
  return (
    <table>
      <thead>
        <HeadingRow />
      </thead>
      <tbody>
        {portfolio.map(({ name, sedol, percentage }) => (
          <FundRow
            name={name}
            percentage={percentage}
            sedol={sedol}
            key={`${sedol}-percentage`}
            onChange={onChange}
            onRemove={onRemove}
          />
        ))}
      </tbody>
      <tfoot>
        <TotalRows totalPercentage={totalPercentage} />
      </tfoot>
    </table>
  );
};
