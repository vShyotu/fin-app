import { AuthenticatedApp } from "../../App/AuthenticatedApp";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { withMemoryRouter } from "../../test/helpers";

const mockLogout = jest.fn();
const Providers = ({ children }) => (
  <AuthContext.Provider
    value={{ user: { name: "Grant" }, login: jest.fn(), logout: mockLogout }}
  >
    {children}
  </AuthContext.Provider>
);
const wrapper = withMemoryRouter(Providers);

describe("AuthedNavbar", () => {
  it("should render a logo link", () => {
    render(<AuthenticatedApp />, { wrapper });

    expect(screen.getByRole("link", { name: /logo/i })).toBeInTheDocument();
  });

  it('should render a home link that routes to the "/" page', () => {
    render(<AuthenticatedApp />, { wrapper });

    fireEvent.click(screen.getByRole("button", { name: /open/i }));
    fireEvent.click(screen.getByRole("link", { name: /home/i }));

    expect(
      screen.getByRole("heading", { name: /account overview/i })
    ).toBeInTheDocument();
  });

  it('should render a plan link that routes to the "/plan" page', () => {
    render(<AuthenticatedApp />, { wrapper });

    fireEvent.click(screen.getByRole("button", { name: /open/i }));
    fireEvent.click(screen.getByRole("link", { name: /plan/i }));

    expect(
      screen.getByRole("heading", { name: /404 not found/i })
    ).toBeInTheDocument();
  });

  it('should render a learn link that routes to the "/learn" page', () => {
    render(<AuthenticatedApp />, { wrapper });

    fireEvent.click(screen.getByRole("button", { name: /open/i }));
    fireEvent.click(screen.getByRole("link", { name: /learn/i }));

    expect(
      screen.getByRole("heading", { name: /404 not found/i })
    ).toBeInTheDocument();
  });

  it('should render a profile link that routes to the "/profile" page', () => {
    render(<AuthenticatedApp />, { wrapper });

    fireEvent.click(screen.getByRole("button", { name: /open/i }));
    fireEvent.click(screen.getByRole("link", { name: /profile/i }));

    expect(
      screen.getByRole("heading", { name: /404 not found/i })
    ).toBeInTheDocument();
  });

  it("should render a logout button that logs a user out", () => {
    render(<AuthenticatedApp />, { wrapper });

    fireEvent.click(screen.getByRole("button", { name: /open/i }));
    fireEvent.click(screen.getByRole("button", { name: /log out/i }));

    expect(mockLogout).toHaveBeenCalled();
  });

  describe("Hamburger menu - Mobile View", () => {
    describe("when the hamburger menu is closed", () => {
      it("should NOT display the nav menu", () => {
        render(<AuthenticatedApp />, { wrapper });

        expect(
          screen.queryByRole("link", { name: /home/i, hidden: true })
        ).not.toBeVisible();
        expect(
          screen.queryByRole("link", { name: /plan/i, hidden: true })
        ).not.toBeVisible();
        expect(
          screen.queryByRole("link", { name: /learn/i, hidden: true })
        ).not.toBeVisible();
        expect(
          screen.queryByRole("link", { name: /profile/i, hidden: true })
        ).not.toBeVisible();
        expect(
          screen.queryByRole("button", { name: /log out/i, hidden: true })
        ).not.toBeVisible();
      });

      it("should display an open button that opens the nav menu", () => {
        render(<AuthenticatedApp />, { wrapper });

        fireEvent.click(screen.getByRole("button", { name: /open/i }));

        expect(screen.getByRole("link", { name: /home/i })).toBeVisible();
        expect(screen.getByRole("link", { name: /plan/i })).toBeVisible();
        expect(screen.getByRole("link", { name: /learn/i })).toBeVisible();
        expect(screen.getByRole("link", { name: /profile/i })).toBeVisible();
        expect(screen.getByRole("button", { name: /log out/i })).toBeVisible();
      });
    });

    describe("when the nav menu is open", () => {
      it("should change the label of the open button to close", () => {
        render(<AuthenticatedApp />, { wrapper });

        fireEvent.click(screen.getByRole("button", { name: /open/i }));

        expect(
          screen.getByRole("button", { name: /close/i })
        ).toBeInTheDocument();
      });

      it("should close the nav menu on close click", () => {
        render(<AuthenticatedApp />, { wrapper });

        fireEvent.click(screen.getByRole("button", { name: /open/i }));

        expect(screen.getByRole("link", { name: /home/i })).toBeVisible();
        expect(screen.getByRole("link", { name: /plan/i })).toBeVisible();
        expect(screen.getByRole("link", { name: /learn/i })).toBeVisible();
        expect(screen.getByRole("link", { name: /profile/i })).toBeVisible();
        expect(screen.getByRole("button", { name: /log out/i })).toBeVisible();

        fireEvent.click(screen.getByRole("button", { name: /close/i }));

        expect(
          screen.queryByRole("link", { name: /home/i, hidden: true })
        ).not.toBeVisible();
        expect(
          screen.queryByRole("link", { name: /plan/i, hidden: true })
        ).not.toBeVisible();
        expect(
          screen.queryByRole("link", { name: /learn/i, hidden: true })
        ).not.toBeVisible();
        expect(
          screen.queryByRole("link", { name: /profile/i, hidden: true })
        ).not.toBeVisible();
        expect(
          screen.queryByRole("button", { name: /log out/i, hidden: true })
        ).not.toBeVisible();
      });
    });
  });

  describe("Full Navigation - Desktop View", () => {
    it("should NOT display the hamburger menu button", () => {
      render(<AuthenticatedApp />, { wrapper });

      expect(screen.getByRole("button", { name: /open/i })).toHaveStyleRule(
        "display",
        "none",
        { media: "screen and (min-width: 768px)" }
      );
    });

    it("should display the main nav menu", () => {
      render(<AuthenticatedApp />, { wrapper });

      expect(screen.getAllByRole("list", { hidden: true })[0]).toHaveStyleRule(
        "display",
        "flex",
        {
          media: "screen and (min-width: 768px)",
        }
      );
    });
  });
});
