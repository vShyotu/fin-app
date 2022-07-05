import { AccountOverview } from ".";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { Route, Routes, useLocation } from "react-router-dom";
import { withMemoryRouter } from "../../test/helpers";

const Providers = ({ children }) => (
  <AuthContext.Provider value={{ user: { name: "Grant" } }}>
    {children}
  </AuthContext.Provider>
);

const wrapper = withMemoryRouter(Providers);

const expectedPolicies = [
  {
    schemeName: "Group Pensions Scheme A",
    policyNumber: "P1234567",
    policyValue: 12345.67,
  },
  {
    schemeName: "Group Pensions Scheme B",
    policyNumber: "P2345678",
    policyValue: 23456.78,
  },
  {
    schemeName: "Group Pensions Scheme C",
    policyNumber: "P3456789",
    policyValue: 34567.89,
  },
];

describe("Account Overview Page", () => {
  it("should render a page title", () => {
    render(<AccountOverview />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /account overview/i })
    ).toBeInTheDocument();
  });

  it("should render a personalised greeting", () => {
    render(<AccountOverview />, { wrapper });

    expect(screen.getByText(/hi, grant/i)).toBeInTheDocument();
  });

  it("should render an estimate my pension button that navigates to /plan", () => {
    const wrapper = withMemoryRouter(Providers);

    const MockRoutes = () => (
      <Routes>
        <Route index element={<AccountOverview />} />
        <Route path="/plan" element={<h1>Plan</h1>} />
      </Routes>
    );

    render(<MockRoutes />, { wrapper });

    fireEvent.click(
      screen.getByRole("button", { name: /estimate my pension/i })
    );

    expect(screen.getByRole("heading", { name: /plan/i })).toBeInTheDocument();
  });

  describe("Policies", () => {
    it("should render a set of policies", () => {
      render(<AccountOverview />, { wrapper });

      expectedPolicies.forEach(({ schemeName, policyNumber, policyValue }) => {
        expect(
          screen.getByRole("heading", { name: schemeName })
        ).toBeInTheDocument();
        expect(
          screen.getByText(`Policy Number: ${policyNumber}`)
        ).toBeInTheDocument();
        expect(screen.getByText(`Value: £${policyValue}`)).toBeInTheDocument();
      });
    });

    it("should render a view my policy button for each policy that navigates to the corresponding policy overview page", () => {
      render(<AccountOverview />, { wrapper });

      const viewThisPolicyButtons = screen.getAllByRole("button", {
        name: /view this policy >/i,
      });

      expect(viewThisPolicyButtons).toHaveLength(3);
    });

    describe("when the view this policy button is clicked", () => {
      it("should navigate to the corresponding policy overview page", () => {
        const MockPolicyPage = () => {
          const { state } = useLocation();

          return <h1>{state.policyNumber}</h1>;
        };

        const MockRoutes = () => (
          <Routes>
            <Route index element={<AccountOverview />} />
            <Route path="/policy" element={<MockPolicyPage />} />
          </Routes>
        );

        render(<MockRoutes />, { wrapper });

        const viewThisPolicyButtons = screen.getAllByRole("button", {
          name: /view this policy >/i,
        });

        fireEvent.click(viewThisPolicyButtons[0]);

        expect(
          screen.getByRole("heading", {
            name: expectedPolicies[0].policyNumber,
          })
        ).toBeInTheDocument();
      });
    });
  });
});
