import { Link } from "react-router-dom";

const TableRow = ({ name, sedol, factsheet, currentlyInvested, onAdd }) => {
  return (
    <tr>
      <td>
        <Link to={factsheet}>{name}</Link>
        <span>SEDOL: </span>
        {sedol}
      </td>
      <td>
        {currentlyInvested ? (
          "In portfolio"
        ) : (
          <button
            onClick={(event) => {
              event.preventDefault();
              onAdd(sedol);
            }}
          >
            Add fund
          </button>
        )}
      </td>
    </tr>
  );
};

export const AvailableFundsTable = ({ availableFunds, onAdd }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Fund</th>
          <th>Add fund</th>
        </tr>
      </thead>
      <tbody>
        {availableFunds.map(({ name, sedol, factsheet, currentlyInvested }) => (
          <TableRow
            key={`available-fund-${sedol}`}
            name={name}
            sedol={sedol}
            factsheet={factsheet}
            currentlyInvested={currentlyInvested}
            onAdd={onAdd}
          />
        ))}
      </tbody>
    </table>
  );
};
