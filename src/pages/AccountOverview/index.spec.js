import { AccountOverview } from ".";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";

const Providers = ({ children }) => (
  <AuthContext.Provider value={{ user: { name: "Grant" } }}>
    {children}
  </AuthContext.Provider>
);

describe("Account Overview Page", () => {
  it("should render a page title", () => {
    render(<AccountOverview />, { wrapper: Providers });

    expect(
      screen.getByRole("heading", { name: /account overview/i })
    ).toBeInTheDocument();
  });

  it("should render a personalised greeting", () => {
    render(<AccountOverview />, { wrapper: Providers });

    expect(screen.getByText("Hi Grant")).toBeInTheDocument();
  });
});
