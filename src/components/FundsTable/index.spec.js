import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { FundsTable } from ".";

const mockFunds = [
  {
    name: "Fund 1",
    sedol: "FUND1",
    value: 1234.56,
    percentage: 25,
    currency: "GBP",
    type: "GPP",
    factsheet: "http://example-pdf.com/fund1",
  },
  {
    name: "Fund 2",
    sedol: "FUND2",
    value: 2345.67,
    percentage: 75,
    currency: "GBP",
    type: "GSPP",
    factsheet: "http://example-pdf.com/fund2",
  },
];

describe("Funds table", () => {
  it("should render correct table headings", () => {
    render(<FundsTable funds={mockFunds} />, { wrapper: MemoryRouter });

    expect(
      screen.getByRole("columnheader", { name: /fund/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /percentage invested/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /value/i })
    ).toBeInTheDocument();
  });

  it("should render the list of provided funds in the table", () => {
    render(<FundsTable funds={mockFunds} />, { wrapper: MemoryRouter });

    mockFunds.forEach((fund) => {
      expect(
        screen.getByRole("cell", { name: `${fund.percentage}%` })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("cell", { name: `£${fund.value}` })
      ).toBeInTheDocument();
    });
  });

  it("should render a total row with correctly calculated values", () => {
    render(<FundsTable funds={mockFunds} />, { wrapper: MemoryRouter });

    expect(screen.getByRole("cell", { name: "100%" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "£3580.23" })).toBeInTheDocument();
  });
});
