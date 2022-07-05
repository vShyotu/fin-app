import { render, screen, within } from "@testing-library/react";
import { PaymentsTable } from ".";

const mockPayments = [
  {
    date: "2022-07-01T00:00:00Z",
    amount: 200.0,
    currency: "GBP",
    type: "Contribution",
    status: "Pending",
  },
  {
    date: "2022-06-02T00:00:00Z",
    amount: 300.0,
    currency: "GBP",
    type: "Contribution",
    status: "Complete",
  },
  {
    date: "2022-06-01T00:00:00Z",
    amount: 400.0,
    currency: "GBP",
    type: "Contribution",
    status: "Cancelled",
  },
];

describe("Payments Table", () => {
  it("should have correct table headings", () => {
    render(<PaymentsTable payments={mockPayments} />);

    expect(
      screen.getByRole("columnheader", { name: /date/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /amount/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /type/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /status/i })
    ).toBeInTheDocument();
  });

  it("should display the list of payments correctly", () => {
    render(<PaymentsTable payments={mockPayments} />);

    const rows = screen.getAllByRole("row");

    expect(rows).toHaveLength(mockPayments.length + 1);

    mockPayments.forEach(({ date, amount, type, status }, index) => {
      const currentRow = rows[index + 1];

      const expectedDate = new Date(date).toLocaleString("en-gb", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      expect(
        within(currentRow).getByRole("cell", { name: expectedDate })
      ).toBeInTheDocument();
      expect(
        within(currentRow).getByRole("cell", { name: `£${amount}` })
      ).toBeInTheDocument();
      expect(
        within(currentRow).getByRole("cell", { name: type })
      ).toBeInTheDocument();
      expect(
        within(currentRow).getByRole("cell", { name: status })
      ).toBeInTheDocument();
    });
  });
});
