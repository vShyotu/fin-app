import { render, screen } from "@testing-library/react";
import { UnauthenticatedApp } from ".";
import { AuthContext } from "../../contexts/AuthContext";
import { withMemoryRouter } from "../../test/helpers";

const Providers = ({ children }) => (
  <AuthContext.Provider
    value={{
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

    render(<UnauthenticatedApp />, { wrapper });

    expect(screen.getByRole("link", { name: /secure/i })).toBeInTheDocument();
  });

  it('should display the login page at route "/login"', () => {
    const wrapper = withMemoryRouter(Providers, ["/"]);

    render(<UnauthenticatedApp />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /log in/i })
    ).toBeInTheDocument();
  });

  it("should redirect to the not found page at any undefined route", () => {
    const wrapper = withMemoryRouter(Providers, ["/test"]);

    render(<UnauthenticatedApp />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /404 not found/i })
    ).toBeInTheDocument();
  });

  it("should redirect to the login page for '/' route", () => {
    const wrapper = withMemoryRouter(Providers, ["/"]);

    render(<UnauthenticatedApp />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /log in/i })
    ).toBeInTheDocument();
  });
});
