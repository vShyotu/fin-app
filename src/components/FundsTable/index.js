import { useMemo } from "react";
import { Link } from "react-router-dom";

export const FundsTable = ({ funds }) => {
  const { totalValue, totalPercentage } = useMemo(
    () =>
      funds.reduce(
        (prev, cur) => ({
          totalValue: prev.totalValue + cur.value,
          totalPercentage: prev.totalPercentage + cur.percentage,
        }),
        { totalValue: 0, totalPercentage: 0 }
      ),
    [funds]
  );

  const fundRows = useMemo(
    () =>
      funds.map(({ name, sedol, percentage, value, factsheet }) => (
        <tr>
          <td>
            <Link to={factsheet}>{name}</Link> <span>SEDOL:</span> {sedol}
          </td>
          <td>{percentage}%</td>
          <td>£{value}</td>
        </tr>
      )),
    [funds]
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Fund</th>
          <th>Percentage invested</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>{fundRows}</tbody>
      <tfoot>
        <tr>
          <td>Total:</td>
          <td>{totalPercentage}%</td>
          <td>£{totalValue}</td>
        </tr>
      </tfoot>
    </table>
  );
};
