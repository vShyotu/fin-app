import { AuthenticatedApp } from "../../../App/AuthenticatedApp";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../../contexts/AuthContext";
import { withMemoryRouter } from "../../../test/helpers";

const mockLogout = jest.fn();
const Providers = ({ children }) => (
  <AuthContext.Provider
    value={{ user: { name: "Grant" }, login: jest.fn(), logout: mockLogout }}
  >
    {children}
  </AuthContext.Provider>
);

describe("AuthedNavbar", () => {
  it("should render a logo link", () => {
    const wrapper = withMemoryRouter(Providers);

    render(<AuthenticatedApp />, { wrapper });

    expect(screen.getByRole("link", { name: /logo/i })).toBeInTheDocument();
  });

  it('should render a home link that routes to the "/" page', () => {
    const wrapper = withMemoryRouter(Providers);

    render(<AuthenticatedApp />, { wrapper });

    fireEvent.click(screen.getByRole("link", { name: /home/i }));

    expect(
      screen.getByRole("heading", { name: /account overview/i })
    ).toBeInTheDocument();
  });

  it('should render a plan link that routes to the "/plan" page', () => {
    const wrapper = withMemoryRouter(Providers);

    render(<AuthenticatedApp />, { wrapper });

    fireEvent.click(screen.getByRole("link", { name: /plan/i }));

    expect(
      screen.getByRole("heading", { name: /404 not found/i })
    ).toBeInTheDocument();
  });

  it('should render a learn link that routes to the "/learn" page', () => {
    const wrapper = withMemoryRouter(Providers);

    render(<AuthenticatedApp />, { wrapper });

    fireEvent.click(screen.getByRole("link", { name: /learn/i }));

    expect(
      screen.getByRole("heading", { name: /404 not found/i })
    ).toBeInTheDocument();
  });

  it('should render a profile link that routes to the "/profile" page', () => {
    const wrapper = withMemoryRouter(Providers);

    render(<AuthenticatedApp />, { wrapper });

    fireEvent.click(screen.getByRole("link", { name: /profile/i }));

    expect(
      screen.getByRole("heading", { name: /404 not found/i })
    ).toBeInTheDocument();
  });

  it("should render a logout button that logs a user out", () => {
    const wrapper = withMemoryRouter(Providers);

    render(<AuthenticatedApp />, { wrapper });

    fireEvent.click(screen.getByRole("button", { name: /log out/i }));

    expect(mockLogout).toHaveBeenCalled();
  });
});
