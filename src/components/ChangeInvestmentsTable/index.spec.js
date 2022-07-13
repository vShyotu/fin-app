import { render, screen, within, fireEvent } from "@testing-library/react";
import { ChangeInvestmentsTable } from ".";

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
  totalPercentage: 100,
  onChange: jest.fn(),
  onRemove: jest.fn(),
};

describe("Change Investments Table", () => {
  it("should display a set of table headings", () => {
    render(<ChangeInvestmentsTable {...mockProps} />);

    expect(
      screen.getByRole("columnheader", { name: /fund/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /percentage to invest/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /remove/i })
    ).toBeInTheDocument();
  });

  it("should display the portfolio correctly", () => {
    render(<ChangeInvestmentsTable {...mockProps} />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4);

    mockProps.portfolio.forEach(({ name, percentage }, index) => {
      const currentRow = rows[index + 1];

      expect(
        within(currentRow).getByRole("cell", { name })
      ).toBeInTheDocument();

      const percentageToInvestField =
        within(currentRow).getByLabelText(/percentage to invest/i);
      expect(percentageToInvestField).toBeInTheDocument();
      expect(percentageToInvestField).toHaveValue(percentage);
    });
  });

  it("should update the fund sedol and value when an input is changed on a fund row", () => {
    render(<ChangeInvestmentsTable {...mockProps} />);

    const rows = screen.getAllByRole("row");
    const percentageFieldInFirstFundRow = within(rows[1]).getByLabelText(
      /percentage to invest/i
    );

    fireEvent.change(percentageFieldInFirstFundRow, { target: { value: 20 } });

    expect(mockProps.onChange).toHaveBeenCalledWith(
      mockProps.portfolio[0].sedol,
      20
    );
  });

  it("should display a remove button for each fund that removes the fund from the portfolio", () => {
    render(<ChangeInvestmentsTable {...mockProps} />);

    const rows = screen.getAllByRole("row");
    const buttonInFirstFundRow = within(rows[1]).getByRole("button", {
      name: /remove/i,
    });

    fireEvent.click(buttonInFirstFundRow);

    expect(mockProps.onRemove).toHaveBeenCalledWith(
      mockProps.portfolio[0].sedol
    );
  });

  it("should display a totals row", () => {
    render(<ChangeInvestmentsTable {...mockProps} />);

    const rows = screen.getAllByRole("row");
    const totalRow = rows[rows.length - 1];

    expect(
      within(totalRow).getByRole("cell", { name: /total invested:/i })
    ).toBeInTheDocument();
    expect(
      within(totalRow).getByRole("cell", { name: "100%" })
    ).toBeInTheDocument();
  });

  it("should display under allocated and the difference when the total percentage is less than 100%", () => {
    render(<ChangeInvestmentsTable {...mockProps} totalPercentage={95} />);

    const rows = screen.getAllByRole("row");
    const allocationRow = rows[rows.length - 1];

    expect(
      within(allocationRow).getByRole("cell", { name: /under allocated by:/i })
    ).toBeInTheDocument();
    expect(
      within(allocationRow).getByRole("cell", { name: "5%" })
    ).toBeInTheDocument();
  });

  it("should display over allocated and the difference when the total percentage is more than 100%", () => {
    render(<ChangeInvestmentsTable {...mockProps} totalPercentage={110} />);

    const rows = screen.getAllByRole("row");
    const allocationRow = rows[rows.length - 1];

    expect(
      within(allocationRow).getByRole("cell", { name: /over allocated by:/i })
    ).toBeInTheDocument();
    expect(
      within(allocationRow).getByRole("cell", { name: "10%" })
    ).toBeInTheDocument();
  });
});
