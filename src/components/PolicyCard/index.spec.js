import { render, screen, fireEvent } from "@testing-library/react";
import { PolicyCard } from ".";

const mockProps = {
  policyNumber: "T123456",
  schemeName: "Test Pension 1",
  policyValue: 12345.67,
  onClick: jest.fn(),
};

describe("Policy Card", () => {
  it("should display the scheme name of the policy as a heading", () => {
    render(<PolicyCard {...mockProps} />);

    expect(
      screen.getByRole("heading", { name: mockProps.schemeName })
    ).toBeInTheDocument();
  });

  it("should display the policy number", () => {
    render(<PolicyCard {...mockProps} />);

    expect(
      screen.getByText(`Policy Number: ${mockProps.policyNumber}`)
    ).toBeInTheDocument();
  });

  it("should show the valuation of the policy", () => {
    render(<PolicyCard {...mockProps} />);

    expect(
      screen.getByText(`Value: £${mockProps.policyValue}`)
    ).toBeInTheDocument();
  });

  it('should render a "View this policy" button that calls the onClick function on click', () => {
    render(<PolicyCard {...mockProps} />);

    fireEvent.click(screen.getByRole("button", { name: "View this policy >" }));

    expect(mockProps.onClick).toHaveBeenCalled();
  });
});
