export const PaymentsTable = ({ payments }) => {
  return (
    <>
      <fieldset>
        <legend>Show by</legend>
        <input type="radio" name="showFundsBy" id="month" />
        <label htmlFor="month">Month</label>
        <input type="radio" name="showFundsBy" id="year" />
        <label htmlFor="year">Year</label>
      </fieldset>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(({ date, amount, type, status }) => {
            const parsedDate = new Date(date);
            return (
              <tr key={`${date}-${amount}`}>
                <td>
                  {parsedDate.toLocaleDateString("en-gb", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td>£{amount}</td>
                <td>{type}</td>
                <td>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
