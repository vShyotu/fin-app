import { fireEvent, render, screen } from "@testing-library/react";
import { AccountOverviewCard } from ".";

const mockProps = {
  name: "Grant",
  totalValue: 123456.78,
  onEstimateClick: jest.fn(),
};

describe("AccountOverviewCard", () => {
  it("should display a personalised greeting", () => {
    render(<AccountOverviewCard {...mockProps} />);

    expect(screen.getByText(`Hi, ${mockProps.name}`)).toBeInTheDocument();
  });

  it("should display a total valuation for the customer", () => {
    render(<AccountOverviewCard {...mockProps} />);
    expect(
      screen.getByText(`Pension total: £${mockProps.totalValue}`)
    ).toBeInTheDocument();
  });

  it("should display a button that calls the onEstimateClick function on click", () => {
    render(<AccountOverviewCard {...mockProps} />);

    fireEvent.click(
      screen.getByRole("button", { name: "Estimate my pension" })
    );

    expect(mockProps.onEstimateClick).toHaveBeenCalled();
  });
});
