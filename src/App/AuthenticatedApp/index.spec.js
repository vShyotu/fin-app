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

  it("should display the Not found page any undefined route", () => {
    const wrapper = withMemoryRouter(Providers, ["/test"]);

    render(<AuthenticatedApp />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /404 not found/i })
    ).toBeInTheDocument();
  });
});
