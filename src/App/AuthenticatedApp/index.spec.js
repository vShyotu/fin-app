import { render, screen } from "@testing-library/react";
import { AuthenticatedApp } from ".";
import { AuthContext } from "../../contexts/AuthContext";
import { withMemoryRouter } from "../../test/helpers";

const Providers = ({ children }) => (
  <AuthContext.Provider
    value={{
      user: { name: "Grant" },
      login: jest.fn(),
      logout: jest.fn(),
    }}
  >
    {children}
  </AuthContext.Provider>
);

describe("Authenticated App", () => {
  it("should display the authed layout", () => {
    const wrapper = withMemoryRouter(Providers);

    render(<AuthenticatedApp />, { wrapper });

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });

  it('should display the Account Overview page at route "/"', () => {
    const wrapper = withMemoryRouter(Providers, ["/"]);

    render(<AuthenticatedApp />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /account overview/i })
    ).toBeInTheDocument();
  });

  it("should display the Policy Overview page at /policy", () => {
    const wrapper = withMemoryRouter(Providers, [
      { pathname: "/policy", state: { policyNumber: "P12345678" } },
    ]);

    render(<AuthenticatedApp />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /policy overview/i })
    ).toBeInTheDocument();
  });

  it("should display the policy investments available page at /policy/investments/available", () => {
    const wrapper = withMemoryRouter(Providers, [
      {
        pathname: "/policy/investments/available",
        state: { policyNumber: "P12345678" },
      },
    ]);

    render(<AuthenticatedApp />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /change funds/i })
    ).toBeInTheDocument();
  });

  it("should display the policy investments review page at /policy/investments/review", () => {
    const wrapper = withMemoryRouter(Providers, [
      {
        pathname: "/policy/investments/review",
        state: {
          policyNumber: "P12345678",
          portfolio: [
            {
              name: "Fund 1",
              sedol: "FUND1",
              percentage: 100,
              factsheet: "http://example-pdf.com/fund1",
            },
          ],
        },
      },
    ]);

    render(<AuthenticatedApp />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /review your changes/i })
    ).toBeInTheDocument();
  });

  it("should display the Not found page any undefined route", () => {
    const wrapper = withMemoryRouter(Providers, ["/test"]);

    render(<AuthenticatedApp />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /404 not found/i })
    ).toBeInTheDocument();
  });
});
