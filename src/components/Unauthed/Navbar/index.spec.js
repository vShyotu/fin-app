import { UnauthenticatedApp } from "../../../App/UnauthenticatedApp";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../../contexts/AuthContext";
import { withMemoryRouter } from "../../../test/helpers";

const Providers = ({ children }) => (
  <AuthContext.Provider value={{ login: jest.fn(), logout: jest.fn() }}>
    {children}
  </AuthContext.Provider>
);

describe("AuthedNavbar", () => {
  it("should render a logo link", () => {
    const wrapper = withMemoryRouter(Providers);

    render(<UnauthenticatedApp />, { wrapper });

    expect(screen.getByRole("link", { name: /logo/i })).toBeInTheDocument();
  });

  it('should render a secure link that routes to the "/security-policy" page', () => {
    const wrapper = withMemoryRouter(Providers);

    render(<UnauthenticatedApp />, { wrapper });

    fireEvent.click(screen.getByRole("link", { name: /secure/i }));

    expect(
      screen.getByRole("heading", { name: /404 not found/i })
    ).toBeInTheDocument();
  });
});
