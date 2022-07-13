import { render, screen, within } from "@testing-library/react";
import { ReviewTable } from ".";

const mockProps = {
  portfolio: [
    {
      name: "Fund 1",
      sedol: "FUND1",
      percentage: 50,
      factsheet: "http://example-pdf.com/fund1",
    },
    {
      name: "Fund 2",
      sedol: "FUND2",
      percentage: 50,
      factsheet: "http://example-pdf.com/fund2",
    },
  ],
};

describe("Review Table", () => {
  it("should display a set of table headings", () => {
    render(<ReviewTable {...mockProps} />);

    expect(
      screen.getByRole("columnheader", { name: /fund/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /percentage to invest/i })
    ).toBeInTheDocument();
  });

  it("should render the set of funds, sedol code and percentage from the given portfolio", () => {
    render(<ReviewTable {...mockProps} />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4);

    mockProps.portfolio.forEach(({ name, sedol, percentage }, index) => {
      const currentRow = rows[index + 1];

      expect(
        within(currentRow).getByRole("cell", {
          name: `${name} SEDOL: ${sedol}`,
        })
      ).toBeInTheDocument();
      expect(
        within(currentRow).getByRole("cell", { name: `${percentage}%` })
      ).toBeInTheDocument();
    });
  });

  it("should render a link for each fund that opens a factsheet in a new tab", () => {
    render(<ReviewTable {...mockProps} />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4);

    mockProps.portfolio.forEach(({ name, factsheet }, index) => {
      const currentRow = rows[index + 1];
      const link = within(currentRow).getByRole("link", { name });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", factsheet);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer noopener");
    });
  });

  it("should render a total row", () => {
    render(<ReviewTable {...mockProps} />);

    const rows = screen.getAllByRole("row");
    const totalRow = rows[rows.length - 1];

    expect(within(totalRow).getByText(/total/i)).toBeInTheDocument();
    expect(within(totalRow).getByText("100%")).toBeInTheDocument();
  });
});
