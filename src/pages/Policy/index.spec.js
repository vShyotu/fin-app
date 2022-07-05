import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { Policy } from ".";
import { Routes, Route, useLocation } from "react-router-dom";
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

    it("should display a policy overview heading", () => {
      const mockPolicyNumber = "T123456";
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
        screen.getByRole("heading", {
          name: `Policy Overview - ${mockPolicyNumber}`,
        })
      ).toBeInTheDocument();
    });

    describe("Investments", () => {
      it("should display an investments heading", () => {
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
          screen.getByRole("heading", { name: /investments/i })
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

      it("should render a change funds button that navigates to /policy/investments/available", () => {
        const mockPolicyNumber = "T123456";
        const wrapper = withMemoryRouter(Providers, [
          { pathname: "/policy", state: { policyNumber: mockPolicyNumber } },
        ]);

        const MockPolicyInvestmentsAvailable = () => {
          const { state } = useLocation();

          return (
            <>
              <h1>Investments Available</h1>
              <div>{state.policyNumber}</div>
            </>
          );
        };

        const MockRoutes = () => (
          <Routes>
            <Route path="/policy" element={<Policy />} />
            <Route
              path="/policy/investments/available"
              element={<MockPolicyInvestmentsAvailable />}
            />
          </Routes>
        );

        render(<MockRoutes />, { wrapper });

        fireEvent.click(
          screen.getByRole("button", { name: /change my funds/i })
        );

        expect(
          screen.getByRole("heading", { name: /investments available/i })
        ).toBeInTheDocument();
        expect(screen.getByText(mockPolicyNumber)).toBeInTheDocument();
      });
    });

    describe("Payments", () => {
      it("should display a payments heading", () => {
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
          screen.getByRole("heading", { name: /payments/i })
        ).toBeInTheDocument();
      });

      it("should render a make a payment button that navigates to /policy/make-payment", () => {
        const mockPolicyNumber = "T123456";
        const wrapper = withMemoryRouter(Providers, [
          { pathname: "/policy", state: { policyNumber: mockPolicyNumber } },
        ]);

        const MockMakeAPayment = () => {
          const { state } = useLocation();

          return (
            <>
              <h1>Make a payment</h1>
              <div>{state.policyNumber}</div>
            </>
          );
        };

        const MockRoutes = () => (
          <Routes>
            <Route path="/policy" element={<Policy />} />
            <Route path="/policy/make-payment" element={<MockMakeAPayment />} />
          </Routes>
        );

        render(<MockRoutes />, { wrapper });

        fireEvent.click(
          screen.getByRole("button", { name: /make a payment/i })
        );

        expect(
          screen.getByRole("heading", { name: /make a payment/i })
        ).toBeInTheDocument();
        expect(screen.getByText(mockPolicyNumber)).toBeInTheDocument();
      });

      it("should render a payments table", () => {
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
          screen.getByRole("columnheader", { name: /date/i })
        ).toBeInTheDocument();
      });
    });

    describe("Nominees", () => {
      it("should display a nominees heading", () => {
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
          screen.getByRole("heading", { name: /nominees/i })
        ).toBeInTheDocument();
      });

      it("should display a table of nominees", () => {
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
          screen.getByRole("columnheader", { name: /name/i })
        ).toBeInTheDocument();
      });

      it("should render an add a beneficiary button that navigates to /policy/add-beneficiary", () => {
        const mockPolicyNumber = "T123456";
        const wrapper = withMemoryRouter(Providers, [
          { pathname: "/policy", state: { policyNumber: mockPolicyNumber } },
        ]);

        const MockAddBeneficiary = () => {
          const { state } = useLocation();

          return (
            <>
              <h1>Add a beneficiary</h1>
              <div>{state.policyNumber}</div>
            </>
          );
        };

        const MockRoutes = () => (
          <Routes>
            <Route path="/policy" element={<Policy />} />
            <Route
              path="/policy/add-beneficiary"
              element={<MockAddBeneficiary />}
            />
          </Routes>
        );

        render(<MockRoutes />, { wrapper });

        fireEvent.click(
          screen.getByRole("button", { name: /add a beneficiary/i })
        );

        expect(
          screen.getByRole("heading", { name: /add a beneficiary/i })
        ).toBeInTheDocument();
        expect(screen.getByText(mockPolicyNumber)).toBeInTheDocument();
      });
    });
  });
});
