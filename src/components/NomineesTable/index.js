export const NomineesTable = ({ nominees }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Relationship</th>
          <th>Address</th>
          <th>Percentage of benefits</th>
          <th>Edit</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {nominees.map(
          (
            {
              title,
              forename,
              surname,
              relationship,
              addressLines,
              city,
              province,
              country,
              postcode,
              percentage,
            },
            index
          ) => (
            <tr key={`row-${forename}-${surname}-${index}`}>
              <td>{[title, forename, surname].join(" ")}</td>
              <td>{relationship}</td>
              <td>
                {[...addressLines, city, province, country, postcode].join(
                  ", "
                )}
              </td>
              <td>{percentage}%</td>
              <td>
                <button>Edit</button>
              </td>
              <td>
                <button>Remove</button>
              </td>
            </tr>
          )
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>Total Percentage Allocated</td>
          <td>100%</td>
        </tr>
      </tfoot>
    </table>
  );
};
