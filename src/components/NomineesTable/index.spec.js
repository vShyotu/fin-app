import { render, screen, within } from "@testing-library/react";
import { NomineesTable } from ".";

const mockNominees = [
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
];

describe("Nominees Table", () => {
  it("should have correct table headings", () => {
    render(<NomineesTable nominees={mockNominees} />);

    expect(
      screen.getByRole("columnheader", { name: /name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /relationship/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /address/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /percentage of benefits/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /edit/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /remove/i })
    ).toBeInTheDocument();
  });

  it("should display a total percentage row", () => {
    render(<NomineesTable nominees={mockNominees} />);

    const lastRow = screen.getAllByRole("row").at(-1);

    expect(
      within(lastRow).getByRole("cell", { name: /total percentage allocated/i })
    ).toBeInTheDocument();
    expect(
      within(lastRow).getByRole("cell", { name: "100%" })
    ).toBeInTheDocument();
  });

  it("should display the list of beneficiaries correctly", () => {
    render(<NomineesTable nominees={mockNominees} />);

    const rows = screen.getAllByRole("row");

    expect(rows).toHaveLength(mockNominees.length + 2);

    mockNominees.forEach(
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
      ) => {
        const currentRow = rows[index + 1];

        expect(
          within(currentRow).getByRole("cell", {
            name: [title, forename, surname].join(" "),
          })
        ).toBeInTheDocument();
        expect(
          within(currentRow).getByRole("cell", { name: relationship })
        ).toBeInTheDocument();
        expect(
          within(currentRow).getByRole("cell", {
            name: [...addressLines, city, province, country, postcode].join(
              ", "
            ),
          })
        ).toBeInTheDocument();
        expect(
          within(currentRow).getByRole("cell", { name: `${percentage}%` })
        ).toBeInTheDocument();
      }
    );
  });
});
