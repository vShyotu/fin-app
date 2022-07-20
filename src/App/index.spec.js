import { render, screen } from "@testing-library/react";
import { App } from ".";
import { AuthContext } from "../contexts/AuthContext";
import { withMemoryRouter } from "../test/helpers";

describe("App", () => {
  describe("when a user is logged in", () => {
    it("should display the authenticated app", () => {
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

      const wrapper = withMemoryRouter(Providers);

      render(<App />, { wrapper });

      expect(
        screen.getByRole("link", { name: /home/i, hidden: true })
      ).toBeInTheDocument();
    });
  });

  describe("when a user is logged out", () => {
    it("should display the unauthenticated app", () => {
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

      const wrapper = withMemoryRouter(Providers);

      render(<App />, { wrapper });

      expect(screen.getByRole("link", { name: /secure/i })).toBeInTheDocument();
    });
  });
});
