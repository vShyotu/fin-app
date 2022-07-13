export const ReviewTable = ({ portfolio, onEdit }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Fund</th>
          <th>Percentage to invest</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map(({ name, sedol, factsheet, percentage }) => (
          <tr>
            <td>
              <a target="_blank" href={factsheet} rel="noreferrer">
                {name}
              </a>
              <span>SEDOL:</span> {sedol}
            </td>
            <td>{percentage}%</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total:</td>
          <td>100%</td>
        </tr>
      </tfoot>
    </table>
  );
};
