import { fireEvent, render, screen, within } from "@testing-library/react";
import { Review } from ".";
import { AuthContext } from "../../../contexts/AuthContext";
import { withMemoryRouter } from "../../../test/helpers";
import { Route, Routes, useLocation } from "react-router-dom";

const Providers = ({ children }) => (
  <AuthContext.Provider
    value={{ login: jest.fn(), logout: jest.fn(), user: { name: "Grant" } }}
  >
    {children}
  </AuthContext.Provider>
);

const mockPortfolio = [
  {
    name: "Fund 1",
    sedol: "FUND1",
    factsheet: "http://example-pdf.com/fund1",
    percentage: 100,
  },
];

const mockPolicyNumber = "P1234567";

const wrapper = withMemoryRouter(Providers, [
  {
    pathname: "/policy/investments/review",
    state: {
      policyNumber: mockPolicyNumber,
      portfolio: mockPortfolio,
    },
  },
]);

describe("Review Page", () => {
  it("should navigate to account overview if the user lands on this page without a portfolio", () => {
    const MockAccountOverview = () => <h1>Account Overview</h1>;

    const MockApp = () => (
      <Routes>
        <Route path="/policy/investments/review" element={<Review />} />
        <Route path="/" element={<MockAccountOverview />} />
      </Routes>
    );

    const wrapper = withMemoryRouter(Providers, [
      {
        pathname: "/policy/investments/review",
        state: { policyNumber: mockPolicyNumber },
      },
    ]);

    render(<MockApp />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /account overview/i })
    ).toBeInTheDocument();
  });

  it("should navigate to account overview if the user lands on this page without a policy number", () => {
    const MockAccountOverview = () => <h1>Account Overview</h1>;

    const MockApp = () => (
      <Routes>
        <Route path="/policy/investments/review" element={<Review />} />
        <Route path="/" element={<MockAccountOverview />} />
      </Routes>
    );

    const wrapper = withMemoryRouter(Providers, [
      {
        pathname: "/policy/investments/review",
        state: { portfolio: mockPortfolio },
      },
    ]);

    render(<MockApp />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /account overview/i })
    ).toBeInTheDocument();
  });

  it("should display a title", () => {
    render(<Review />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /review your changes/i })
    ).toBeInTheDocument();
  });

  it("should display a step counter", () => {
    render(<Review />, { wrapper });

    expect(screen.getByText(/step 2 of 3/i)).toBeInTheDocument();
  });

  describe("Your choices section", () => {
    it("should display a section heading", () => {
      render(<Review />, { wrapper });

      expect(
        screen.getByRole("heading", { name: /your choices/i })
      ).toBeInTheDocument();
    });

    it("should have an edit button that returns you back to the previous page to edit your funds", () => {
      const MockAvailable = () => {
        const { state } = useLocation();

        return (
          <>
            <h1>Change your funds</h1>
            <p>{state.policyNumber}</p>
            <p>{JSON.stringify(state.portfolio)}</p>
          </>
        );
      };

      const MockApp = () => (
        <Routes>
          <Route path="/policy/investments/review" element={<Review />} />
          <Route
            path="/policy/investments/available"
            element={<MockAvailable />}
          />
        </Routes>
      );

      render(<MockApp />, { wrapper });

      fireEvent.click(screen.getByRole("button", { name: /edit/i }));

      expect(
        screen.getByRole("heading", { name: /change your funds/i })
      ).toBeInTheDocument();
      expect(screen.getByText(mockPolicyNumber)).toBeInTheDocument();
      expect(
        screen.getByText(JSON.stringify(mockPortfolio))
      ).toBeInTheDocument();
    });

    it("should display your changed portfolio", () => {
      render(<Review />, { wrapper });

      const reviewTable = screen.getByRole("table");
      expect(reviewTable).toBeInTheDocument();

      const rows = within(reviewTable).getAllByRole("row");
      expect(rows).toHaveLength(3);

      mockPortfolio.forEach(({ name, sedol, factsheet, percentage }, index) => {
        const currentRow = rows[index + 1];

        const link = within(currentRow).getByRole("link", { name });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", factsheet);
        expect(link).toHaveAttribute("target", "_blank");

        expect(within(currentRow).getByText(sedol)).toBeInTheDocument();
        expect(
          within(currentRow).getByText(`${percentage}%`)
        ).toBeInTheDocument();
      });
    });
  });

  describe("Confirmation section", () => {
    it("should display a section heading", () => {
      render(<Review />, { wrapper });

      expect(
        screen.getByRole("heading", { name: /confirmation/i })
      ).toBeInTheDocument();
    });

    it("should display a consent checkbox", () => {
      render(<Review />, { wrapper });

      expect(
        screen.getByRole("checkbox", {
          name: "I confirm that this is how I wish to invest my funds and that my future contributions to this pension policy will be allocated in this way",
        })
      ).toBeInTheDocument();
    });
  });

  describe("Submit button", () => {
    it("should be disabled when consent has not been given", () => {
      render(<Review />, { wrapper });

      expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
    });

    it("should be enabled when consent has been given", () => {
      render(<Review />, { wrapper });

      const checkbox = screen.getByRole("checkbox", {
        name: "I confirm that this is how I wish to invest my funds and that my future contributions to this pension policy will be allocated in this way",
      });

      fireEvent.click(checkbox);

      expect(screen.getByRole("button", { name: /submit/i })).toBeEnabled();
    });

    it("should navigate to the confirmation page when clicked", () => {
      const MockConfirmationPage = () => <h1>Confirmation</h1>;
      const MockApp = () => (
        <Routes>
          <Route path="/policy/investments/review" element={<Review />} />
          <Route
            path="/policy/investments/confirmation"
            element={<MockConfirmationPage />}
          />
        </Routes>
      );

      render(<MockApp />, { wrapper });

      const checkbox = screen.getByRole("checkbox", {
        name: "I confirm that this is how I wish to invest my funds and that my future contributions to this pension policy will be allocated in this way",
      });

      fireEvent.click(checkbox);
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));

      expect(
        screen.getByRole("heading", { name: /confirmation/i })
      ).toBeInTheDocument();
    });
  });

  it("should return to the corresponding policy overview page", () => {
    const MockPolicyOverview = () => {
      const { state } = useLocation();

      return (
        <>
          <h1>Policy Overview</h1>
          <p>{state.policyNumber}</p>
        </>
      );
    };

    const MockApp = () => (
      <Routes>
        <Route path="/policy/investments/review" element={<Review />} />
        <Route path="/policy" element={<MockPolicyOverview />} />
      </Routes>
    );

    render(<MockApp />, { wrapper });

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(
      screen.getByRole("heading", { name: /policy overview/i })
    ).toBeInTheDocument();
    expect(screen.getByText(mockPolicyNumber)).toBeInTheDocument();
  });
});
