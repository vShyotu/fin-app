import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { Policy } from ".";
import { Routes, Route } from "react-router-dom";
import { withMemoryRouter } from "../../test/helpers";

const mockAuthValue = { user: { name: "Grant" } };

const Providers = ({ children }) => (
  <AuthContext.Provider value={mockAuthValue}>{children}</AuthContext.Provider>
);

describe("Policy Page", () => {
  describe("when there is no policy number in location state", () => {
    it("should navigate back to the account overview page", () => {
      const wrapper = withMemoryRouter(Providers, ["/policy"]);

      const MockRoutes = () => (
        <Routes>
          <Route path="/policy" element={<Policy />} />
          <Route path="/" element={<h1>Account Overview</h1>} />
        </Routes>
      );

      render(<MockRoutes />, { wrapper });

      expect(
        screen.getByRole("heading", { name: /account overview/i })
      ).toBeInTheDocument();
    });
  });

  describe("when there is a policy number in location state", () => {
    it("should display a back to my account link that goes back to account overview", () => {
      const wrapper = withMemoryRouter(Providers, [
        { pathname: "/policy", state: { policyNumber: "T123456" } },
      ]);

      const MockRoutes = () => (
        <Routes>
          <Route path="/policy" element={<Policy />} />
          <Route path="/" element={<h1>Account Overview</h1>} />
        </Routes>
      );

      render(<MockRoutes />, { wrapper });

      fireEvent.click(
        screen.getByRole("link", { name: /< back to my account/i })
      );

      expect(
        screen.getByRole("heading", { name: /account overview/i })
      ).toBeInTheDocument();
    });

    it('should display a "Policy Overview" heading', () => {
      const wrapper = withMemoryRouter(Providers, [
        { pathname: "/policy", state: { policyNumber: "T123456" } },
      ]);

      const MockRoutes = () => (
        <Routes>
          <Route path="/policy" element={<Policy />} />
        </Routes>
      );

      render(<MockRoutes />, { wrapper });

      expect(
        screen.getByRole("heading", { name: /policy overview/i })
      ).toBeInTheDocument();
    });

    it("should display the policy number", () => {
      const mockPolicyNumber = "T123456";
      const wrapper = withMemoryRouter(Providers, [
        { pathname: "/policy", state: { policyNumber: mockPolicyNumber } },
      ]);

      const MockRoutes = () => (
        <Routes>
          <Route path="/policy" element={<Policy />} />
        </Routes>
      );

      render(<MockRoutes />, { wrapper });

      expect(
        screen.getByRole("heading", { name: mockPolicyNumber })
      ).toBeInTheDocument();
    });

    it("should display a table of invested funds for the policy", () => {
      const mockPolicyNumber = "T123456";
      const wrapper = withMemoryRouter(Providers, [
        { pathname: "/policy", state: { policyNumber: mockPolicyNumber } },
      ]);

      const MockRoutes = () => (
        <Routes>
          <Route path="/policy" element={<Policy />} />
        </Routes>
      );

      render(<MockRoutes />, { wrapper });

      expect(
        screen.getByRole("columnheader", { name: /fund/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("columnheader", { name: /percentage invested/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("columnheader", { name: /value/i })
      ).toBeInTheDocument();
    });
  });
});
