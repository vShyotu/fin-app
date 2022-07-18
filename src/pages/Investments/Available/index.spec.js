import { render, screen, fireEvent, within } from "@testing-library/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Available } from ".";
import { AuthContext } from "../../../contexts/AuthContext";
import { withMemoryRouter } from "../../../test/helpers";

const mockPolicyNumber = "P1234567";

const Providers = ({ children }) => (
  <AuthContext.Provider
    value={{ login: jest.fn(), logout: jest.fn(), user: { name: "Grant" } }}
  >
    {children}
  </AuthContext.Provider>
);

const wrapper = withMemoryRouter(Providers, [
  {
    pathname: "/policy/investments/available",
    state: { policyNumber: mockPolicyNumber },
  },
]);

describe("Available page", () => {
  it("should navigate to the account overview page if the user got to this page without a policy number", () => {
    const MockAccountOverview = () => <h1>Account Overview</h1>;
    const MockApp = () => (
      <Routes>
        <Route path="/" element={<MockAccountOverview />} />
        <Route path="/policy/investments/available" element={<Available />} />
      </Routes>
    );
    const wrapper = withMemoryRouter(Providers, [
      "/policy/investments/available",
    ]);

    render(<MockApp />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /account overview/i })
    ).toBeInTheDocument();
  });

  it("should display a title of change funds", () => {
    render(<Available />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /change funds/i })
    ).toBeInTheDocument();
  });

  it("should display a step counter", () => {
    render(<Available />, { wrapper });

    expect(screen.getByText(/step 1 of 3/i)).toBeInTheDocument();
  });

  describe("Your funds section", () => {
    it("should display a your funds heading", () => {
      render(<Available />, { wrapper });

      expect(
        screen.getByRole("heading", { name: /your funds/i })
      ).toBeInTheDocument();
    });

    describe("Undo button", () => {
      it("should render an undo button", () => {
        render(<Available />, { wrapper });

        expect(
          screen.getByRole("button", { name: /undo changes/i })
        ).toBeInTheDocument();
      });

      it("should undo changes to the portfolio, reverting it to the original set of funds", () => {
        render(<Available />, { wrapper });

        const fund1PercentageField =
          screen.getByLabelText(/percentage to invest/i);
        fireEvent.change(fund1PercentageField, { target: { value: 90 } });
        fireEvent.click(
          screen.getAllByRole("button", { name: /add fund/i })[0]
        );

        expect(
          screen.getByRole("cell", { name: "Fund 2" })
        ).toBeInTheDocument();
        expect(fund1PercentageField).toHaveValue(90);

        const undoButton = screen.getByRole("button", {
          name: /undo changes/i,
        });
        expect(undoButton).toBeEnabled();

        fireEvent.click(undoButton);

        expect(fund1PercentageField).toHaveValue(100);
        expect(
          screen.queryByRole("cell", { name: "Fund 2" })
        ).not.toBeInTheDocument();
      });
    });

    describe("Add a fund button", () => {
      it("should smooth scroll to the available funds section", () => {
        render(<Available />, { wrapper });
        window.HTMLElement.prototype.scrollIntoView = jest.fn();

        fireEvent.click(screen.getByRole("button", { name: /add a fund/i }));

        expect(
          window.HTMLElement.prototype.scrollIntoView
        ).toHaveBeenCalledWith({
          behavior: "smooth",
        });
      });
    });

    describe("Remove button", () => {
      it("should remove the fund from the portfolio", () => {
        render(<Available />, { wrapper });

        expect(
          screen.getByRole("cell", { name: "Fund 1" })
        ).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: /remove/i }));

        expect(
          screen.queryByRole("cell", { name: "Fund 1" })
        ).not.toBeInTheDocument();
      });
    });

    describe("Cancel button", () => {
      it("should return the user back to the policy overview", () => {
        const MockPolicyOverview = () => {
          const { state } = useLocation();

          return <h1>Policy Overview - {state.policyNumber}</h1>;
        };

        const MockApp = () => (
          <Routes>
            <Route path="/policy" element={<MockPolicyOverview />} />
            <Route
              path="/policy/investments/available"
              element={<Available />}
            />
          </Routes>
        );

        render(<MockApp />, { wrapper });

        fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

        expect(
          screen.getByRole("heading", { name: "Policy Overview - P1234567" })
        ).toBeInTheDocument();
      });
    });

    describe("Submit button", () => {
      it("should be disabled if the user has not made changes", () => {
        render(<Available />, { wrapper });

        expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
      });

      it("should be disabled if the total percentage in the portfolio does not add to 100", () => {
        render(<Available />, { wrapper });

        const fund1PercentageField =
          screen.getByLabelText(/percentage to invest/i);
        fireEvent.change(fund1PercentageField, { target: { value: 90 } });

        expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
      });

      it("should be enabled if the total percentage in the portfolio adds to 100 and it has changed from current funds", () => {
        render(<Available />, { wrapper });

        fireEvent.click(screen.getByRole("button", { name: /add fund/i }));

        const fundPercentageFields =
          screen.getAllByLabelText(/percentage to invest/i);
        fireEvent.change(fundPercentageFields[0], { target: { value: 90 } });
        fireEvent.change(fundPercentageFields[1], { target: { value: 10 } });

        expect(screen.getByRole("button", { name: /submit/i })).toBeEnabled();
      });

      it("should navigate to the review page with correct state", () => {
        const MockReview = () => {
          const { state } = useLocation();

          return (
            <>
              <h1>Review page</h1>
              <h2>{state.policyNumber}</h2>
              <p>{JSON.stringify(state.portfolio)}</p>
            </>
          );
        };

        const MockApp = () => (
          <Routes>
            <Route
              path="/policy/investments/available"
              element={<Available />}
            />
            <Route path="/policy/investments/review" element={<MockReview />} />
          </Routes>
        );

        render(<MockApp />, { wrapper });

        fireEvent.click(screen.getByRole("button", { name: /add fund/i }));

        const fundPercentageFields =
          screen.getAllByLabelText(/percentage to invest/i);
        fireEvent.change(fundPercentageFields[0], { target: { value: 90 } });
        fireEvent.change(fundPercentageFields[1], { target: { value: 10 } });

        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        expect(
          screen.getByRole("heading", { name: /review page/i })
        ).toBeInTheDocument();

        expect(
          screen.getByRole("heading", { name: mockPolicyNumber })
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            JSON.stringify([
              {
                name: "Fund 1",
                sedol: "FUND1",
                factsheet: "http://example-pdf.com/fund1",
                percentage: 90,
              },
              {
                name: "Fund 2",
                sedol: "FUND2",
                factsheet: "http://example-pdf.com/fund2",
                percentage: 10,
              },
            ])
          )
        ).toBeInTheDocument();
      });
    });
  });

  describe("Available Funds Section", () => {
    it("should display an available funds heading", () => {
      render(<Available />, { wrapper });

      expect(
        screen.getByRole("heading", { name: /available funds/i })
      ).toBeInTheDocument();
    });

    describe("Filter funds", () => {
      it("should correctly filter the list of available funds", () => {
        render(<Available />, { wrapper });

        const availableFundsTable = screen.getAllByRole("table")[1];
        expect(within(availableFundsTable).getAllByRole("row")).toHaveLength(3);

        const filterField = screen.getByLabelText(/search for a fund/i);
        fireEvent.change(filterField, { target: { value: "FUND2" } });

        const filteredRows = within(availableFundsTable).getAllByRole("row");

        expect(filteredRows).toHaveLength(2);
        expect(
          within(filteredRows[1]).getByRole("cell", { name: /fund 2/i })
        ).toBeInTheDocument();
      });
    });

    describe("Add fund (Available funds)", () => {
      it("should add the fund to the portfolio", () => {
        render(<Available />, { wrapper });

        expect(
          screen.queryByRole("cell", { name: "Fund 2" })
        ).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: /add fund/i }));

        expect(
          screen.getByRole("cell", { name: "Fund 2" })
        ).toBeInTheDocument();
      });
    });
  });
});
