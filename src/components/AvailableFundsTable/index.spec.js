import { render, screen, within, fireEvent } from "@testing-library/react";
import { AvailableFundsTable } from ".";

const mockProps = {
  onAdd: jest.fn(),
  availableFunds: [
    {
      name: "Fund 1",
      sedol: "FUND1",
      factsheet: "http://example-pdf.com/fund1",
      currentlyInvested: true,
    },
    {
      name: "Fund 2",
      sedol: "FUND2",
      factsheet: "http://example-pdf.com/fund2",
      currentlyInvested: false,
    },
  ],
};

describe("Available Funds table", () => {
  it("should display table headings of fund and add fund", () => {
    render(<AvailableFundsTable {...mockProps} />);

    expect(
      screen.getByRole("columnheader", { name: "Fund" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /add fund/i })
    ).toBeInTheDocument();
  });

  it("should show all the funds in a table with links to their factsheets that open in a new window", () => {
    render(<AvailableFundsTable {...mockProps} />);

    mockProps.availableFunds.forEach(({ name, factsheet }) => {
      const link = screen.getByRole("link", { name: name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", factsheet);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer noopener");
    });
  });

  it('should display "In portfolio" for a fund that is currently invested', () => {
    render(<AvailableFundsTable {...mockProps} />);
    const row = screen.getAllByRole("row")[1];

    expect(
      within(row).getByRole("cell", { name: /fund 1/i })
    ).toBeInTheDocument();
    expect(
      within(row).getByRole("cell", { name: /in portfolio/i })
    ).toBeInTheDocument();
  });

  it("should display an add fund button that calls onAddFund for a fund that isn't currently invested", () => {
    render(<AvailableFundsTable {...mockProps} />);
    const row = screen.getAllByRole("row")[2];

    expect(
      within(row).getByRole("cell", { name: /fund 2/i })
    ).toBeInTheDocument();

    const button = within(row).getByRole("button", { name: /add fund/i });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockProps.onAdd).toHaveBeenCalledWith("FUND2");
  });
});
